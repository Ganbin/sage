import { useCallback, useEffect, useState } from 'react';
import { commands, DidRecord } from '../bindings';
import { useErrors } from './useErrors';
import { NftGroupMode } from './useNftParams';
import { events } from '../bindings';

// Helper function for creating default DID records
function createDefaultDidRecord(name: string, launcherId: string): DidRecord {
    return {
        name,
        launcher_id: launcherId,
        visible: true,
        coin_id: 'No coin',
        address: 'No address',
        amount: 0,
        created_height: 0,
        create_transaction_id: 'No transaction',
        recovery_hash: '',
    };
}

interface OwnerProfilesState {
    ownerDids: DidRecord[];
    owner: DidRecord | null;
    ownerDidsTotal: number;
    isLoading: boolean;
}

interface OwnerProfilesParams {
    pageSize: number;
    page: number;
    group: NftGroupMode;
    showHidden: boolean;
    ownerDid?: string;
}

export function useNftOwnerProfiles(params: OwnerProfilesParams) {
    const { addError } = useErrors();
    const [state, setState] = useState<OwnerProfilesState>({
        ownerDids: [],
        owner: null,
        ownerDidsTotal: 0,
        isLoading: false,
    });

    const updateOwnerProfiles = useCallback(async () => {
        setState((prev) => ({ ...prev, isLoading: true }));
        try {
            if (params.ownerDid) {
                const didResponse = await commands.getDids({});
                const foundDid = didResponse.dids.find(
                    (did) => did.launcher_id === params.ownerDid,
                );
                setState((prev) => ({
                    ...prev,
                    owner: foundDid || createDefaultDidRecord('Unassigned NFTs', 'No did'),
                }));
            } else if (params.group === NftGroupMode.OwnerDid) {
                const response = await commands.getDids({});
                const ownerDids = response.dids;

                if (
                    ownerDids.length < params.pageSize &&
                    params.page === Math.ceil((ownerDids.length + 1) / params.pageSize)
                ) {
                    ownerDids.push(createDefaultDidRecord('Unassigned NFTs', 'No did'));
                }

                setState((prev) => ({
                    ...prev,
                    ownerDids,
                    ownerDidsTotal: response.dids.length + 1,
                }));
            }
        } catch (error: any) {
            console.error('Error fetching owner profiles:', error);
            addError(error);
        } finally {
            setState((prev) => ({ ...prev, isLoading: false }));
        }
    }, [params.pageSize, params.page, params.group, params.ownerDid, addError]);

    useEffect(() => {
        setState((prev) => ({
            ...prev,
            ownerDids: [],
            owner: null,
        }));
        updateOwnerProfiles();
    }, [updateOwnerProfiles]);

    // Add sync event handling
    useEffect(() => {
        const unlisten = events.syncEvent.listen((event) => {
            const type = event.payload.type;
            if (type === 'coin_state' ||
                type === 'puzzle_batch_synced' ||
                type === 'nft_data') {
                updateOwnerProfiles();
            }
        });

        return () => {
            unlisten.then((u) => u());
        };
    }, [updateOwnerProfiles]);

    return {
        ...state,
        updateOwnerProfiles,
    };
} 