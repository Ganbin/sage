import { useCallback, useEffect, useState } from 'react';
import {
  commands,
  events,
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
  isLoading: boolean;
  nftTotal: number;
}

export function useNftData(params: NftDataParams) {
  const { addError } = useErrors();
  const [state, setState] = useState<NftDataState>({
    nfts: [],
    isLoading: false,
    nftTotal: 0,
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

          setState((prev) => ({
            ...prev,
            nfts: response.nfts,
            nftTotal: response.total,
          }));
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

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      nfts: [],
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

  return {
    nfts: state.nfts,
    isLoading: state.isLoading,
    total: state.nftTotal,
    updateNfts,
  };
}
