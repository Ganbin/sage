import { useCallback, useEffect, useState } from 'react';
import { commands, NftCollectionRecord, events } from '../bindings';
import { useErrors } from './useErrors';
import { NftGroupMode } from './useNftParams';

interface CollectionProfilesState {
    collections: NftCollectionRecord[];
    collection: NftCollectionRecord | null;
    collectionsTotal: number;
    isLoading: boolean;
}

interface CollectionProfilesParams {
    pageSize: number;
    page: number;
    group: NftGroupMode;
    showHidden: boolean;
    collectionId?: string;
}

export function useNftCollectionProfiles(params: CollectionProfilesParams) {
    const { addError } = useErrors();
    const [state, setState] = useState<CollectionProfilesState>({
        collections: [],
        collection: null,
        collectionsTotal: 0,
        isLoading: false,
    });

    const updateCollectionProfiles = useCallback(async () => {
        setState((prev) => ({ ...prev, isLoading: true }));
        try {
            if (params.collectionId) {
                const response = await commands.getNftCollection({
                    collection_id:
                        params.collectionId === 'No collection' ? null : params.collectionId,
                });
                setState((prev) => ({
                    ...prev,
                    collection: response.collection,
                }));
            } else if (params.group === NftGroupMode.Collection) {
                const response = await commands.getNftCollections({
                    offset: (params.page - 1) * params.pageSize,
                    limit: params.pageSize,
                    include_hidden: params.showHidden,
                });

                const collections = response.collections;

                if (
                    collections.length < params.pageSize &&
                    params.page === Math.ceil((response.total + 1) / params.pageSize)
                ) {
                    collections.push({
                        name: 'No Collection',
                        icon: '',
                        did_id: 'Miscellaneous',
                        metadata_collection_id: 'Uncategorized NFTs',
                        collection_id: 'No collection',
                        visible: true,
                    });
                }

                setState((prev) => ({
                    ...prev,
                    collections,
                    collectionsTotal: response.total + 1,
                }));
            }
        } catch (error: any) {
            console.error('Error fetching collection profiles:', error);
            addError(error);
        } finally {
            setState((prev) => ({ ...prev, isLoading: false }));
        }
    }, [params.pageSize, params.page, params.group, params.collectionId, params.showHidden, addError]);

    useEffect(() => {
        setState((prev) => ({
            ...prev,
            collections: [],
            collection: null,
        }));
        updateCollectionProfiles();
    }, [updateCollectionProfiles]);

    useEffect(() => {
        const unlisten = events.syncEvent.listen((event) => {
            const type = event.payload.type;
            if (
                type === 'coin_state' ||
                type === 'puzzle_batch_synced' ||
                type === 'nft_data'
            ) {
                updateCollectionProfiles();
            }
        });

        return () => {
            unlisten.then((u) => u());
        };
    }, [updateCollectionProfiles]);

    return {
        ...state,
        updateCollectionProfiles,
    };
} 