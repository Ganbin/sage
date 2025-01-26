import { useCallback, useEffect, useState } from 'react';
import {
  commands,
  DidRecord,
  events,
  NftCollectionRecord,
  NftRecord,
} from '../bindings';
import { useErrors } from './useErrors';
import { NftGroupMode, NftSortMode } from './useNftParams';

interface NftDataParams {
  pageSize: number;
  sort: NftSortMode;
  group: NftGroupMode;
  showHidden: boolean;
  query: string | null;
  collectionId?: string;
  ownerDid?: string;
  minterDid?: string;
  page: number;
}

interface NftDataState {
  nfts: NftRecord[];
  collections: NftCollectionRecord[];
  collection: NftCollectionRecord | null;
  isLoading: boolean;
  nftTotal: number;
  collectionTotal: number;
}

export function useNftData(params: NftDataParams) {
  const { addError } = useErrors();
  const [state, setState] = useState<NftDataState>({
    nfts: [],
    collections: [],
    collection: null,
    isLoading: false,
    nftTotal: 0,
    collectionTotal: 0,
  });

  const updateNfts = useCallback(
    async (page: number) => {
      setState((prev) => ({ ...prev, isLoading: true }));
      try {
        if (
          params.collectionId ||
          params.ownerDid ||
          params.minterDid ||
          params.group === NftGroupMode.None
        ) {
          const queryParams = {
            name: params.query || null,
            collection_id:
              params.collectionId === 'No collection'
                ? 'none'
                : (params.collectionId ?? null),
            owner_did_id:
              params.ownerDid === 'No did' ? 'none' : (params.ownerDid ?? null),
            minter_did_id:
              params.minterDid === 'No did'
                ? 'none'
                : (params.minterDid ?? null),
            offset: (page - 1) * params.pageSize,
            limit: params.pageSize,
            sort_mode: params.sort,
            include_hidden: params.showHidden,
          };

          const response = await commands.getNfts(queryParams);

          const updates: Partial<NftDataState> = {
            nfts: response.nfts,
            nftTotal: response.total,
          };

          if (params.collectionId) {
            const collectionResponse = await commands.getNftCollection({
              collection_id:
                params.collectionId === 'No collection'
                  ? null
                  : params.collectionId,
            });
            updates.collection = collectionResponse.collection;
          }

          setState((prev) => ({ ...prev, ...updates }));
        } else if (params.group === NftGroupMode.Collection) {
          try {
            const response = await commands.getNftCollections({
              offset: (page - 1) * params.pageSize,
              limit: params.pageSize,
              include_hidden: params.showHidden,
            });

            const collections = response.collections;

            if (
              collections.length < params.pageSize &&
              page === Math.ceil((response.total + 1) / params.pageSize)
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
              collectionTotal: response.total + 1,
            }));
          } catch (error: any) {
            setState((prev) => ({
              ...prev,
              collections: [],
              collectionTotal: 0,
            }));
            addError(error);
          }
        }
      } catch (error: any) {
        console.error('Error fetching NFTs:', error);
        addError(error);
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [
      params.pageSize,
      params.showHidden,
      params.sort,
      params.group,
      params.query,
      params.collectionId,
      params.ownerDid,
      params.minterDid,
      addError,
    ],
  );

  // Clear state and fetch new data when params change
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      nfts: [],
      collections: [],
      collection: null,
    }));
    updateNfts(params.page);
  }, [
    updateNfts,
    params.collectionId,
    params.ownerDid,
    params.minterDid,
    params.page,
  ]);

  // Listen for sync events
  useEffect(() => {
    const unlisten = events.syncEvent.listen((event) => {
      const type = event.payload.type;
      if (
        type === 'coin_state' ||
        type === 'puzzle_batch_synced' ||
        type === 'nft_data'
      ) {
        updateNfts(params.page);
      }
    });

    return () => {
      unlisten.then((u) => u());
    };
  }, [updateNfts, params.page]);

  const getTotal = useCallback(() => {
    if (
      params.collectionId ||
      params.ownerDid ||
      params.minterDid ||
      params.group === NftGroupMode.None ||
      params.group === NftGroupMode.Collection
    ) {
      return state.nftTotal;
    }
    return 0;
  }, [
    params.collectionId,
    params.ownerDid,
    params.minterDid,
    params.group,
    state.nftTotal,
  ]);

  return {
    nfts: state.nfts,
    collections: state.collections,
    collection: state.collection,
    isLoading: state.isLoading,
    total: getTotal(),
    updateNfts,
  };
}
