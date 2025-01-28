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

interface MinterProfilesState {
    minterDids: DidRecord[];
    minter: DidRecord | null;
    minterDidsTotal: number;
    isLoading: boolean;
}

interface MinterProfilesParams {
    pageSize: number;
    page: number;
    group: NftGroupMode;
    showHidden: boolean;
    minterDid?: string;
}

export function useNftMinterProfiles(params: MinterProfilesParams) {
    const { addError } = useErrors();
    const [state, setState] = useState<MinterProfilesState>({
        minterDids: [],
        minter: null,
        minterDidsTotal: 0,
        isLoading: false,
    });

    const updateMinterProfiles = useCallback(async () => {
        setState((prev) => ({ ...prev, isLoading: true }));
        try {
            if (params.minterDid) {
                setState((prev) => ({
                    ...prev,
                    minter: createDefaultDidRecord(params.minterDid!, params.minterDid!),
                }));
            } else if (params.group === NftGroupMode.MinterDid) {
                const uniqueMinterDids = await commands.getMinterDidIds({
                    limit: params.pageSize,
                    offset: (params.page - 1) * params.pageSize,
                });

                const minterDids: DidRecord[] = uniqueMinterDids.did_ids.map((did) =>
                    createDefaultDidRecord(
                        `${did.replace('did:chia:', '').slice(0, 16)}...`,
                        did,
                    ),
                );

                if (
                    minterDids.length < params.pageSize &&
                    params.page === Math.ceil((uniqueMinterDids.total + 1) / params.pageSize)
                ) {
                    minterDids.push(createDefaultDidRecord('Unknown Minter', 'No did'));
                }

                setState((prev) => ({
                    ...prev,
                    minterDids,
                    minterDidsTotal: uniqueMinterDids.total + 1,
                }));
            }
        } catch (error: any) {
            console.error('Error fetching minter profiles:', error);
            addError(error);
        } finally {
            setState((prev) => ({ ...prev, isLoading: false }));
        }
    }, [params.pageSize, params.page, params.group, params.minterDid, addError]);

    useEffect(() => {
        setState((prev) => ({
            ...prev,
            minterDids: [],
            minter: null,
        }));
        updateMinterProfiles();
    }, [updateMinterProfiles]);

    useEffect(() => {
        const unlisten = events.syncEvent.listen((event) => {
            const type = event.payload.type;
            if (type === 'coin_state' ||
                type === 'puzzle_batch_synced' ||
                type === 'nft_data') {
                updateMinterProfiles();
            }
        });

        return () => {
            unlisten.then((u) => u());
        };
    }, [updateMinterProfiles]);

    return {
        ...state,
        updateMinterProfiles,
    };
} 