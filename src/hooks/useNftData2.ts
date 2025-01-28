import { CustomError } from '../contexts/ErrorContext';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { commands, events, NftRecord } from '../bindings';
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

export function useNftData2(params: NftDataParams) {
  const { addError } = useErrors();

  const fetchNfts = async (page: number) => {
    if (
      !(
        params.collectionId ||
        params.ownerDid ||
        params.minterDid ||
        params.group === NftGroupMode.None
      )
    ) {
      return { nfts: [], total: 0 };
    }

    const queryParams = {
      name: params.query || null,
      collection_id:
        params.collectionId === 'No collection'
          ? 'none'
          : (params.collectionId ?? null),
      owner_did_id:
        params.ownerDid === 'No did' ? 'none' : (params.ownerDid ?? null),
      minter_did_id:
        params.minterDid === 'No did' ? 'none' : (params.minterDid ?? null),
      offset: (page - 1) * params.pageSize,
      limit: params.pageSize,
      sort_mode: params.sort,
      include_hidden: params.showHidden,
    };

    return commands.getNfts(queryParams);
  };

  const query = useQuery({
    staleTime: 1000 * 20,
    queryKey: [
      'nfts',
      'get',
      params.pageSize,
      params.showHidden,
      params.sort,
      params.group,
      params.query,
      params.collectionId,
      params.ownerDid,
      params.minterDid,
      params.page,
    ],
    queryFn: async () => {
      try {
        return await fetchNfts(params.page);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        addError(error as CustomError);
        throw error;
      }
    },
  });

  // Listen for sync events
  useEffect(() => {
    const unlisten = events.syncEvent.listen((event) => {
      const type = event.payload.type;
      if (
        type === 'coin_state' ||
        type === 'puzzle_batch_synced' ||
        type === 'nft_data'
      ) {
        query.refetch();
      }
    });

    return () => {
      unlisten.then((u) => u());
    };
  }, [query]);

  return {
    nfts: query.data?.nfts ?? [],
    isLoading: query.isLoading,
    total: query.data?.total ?? 0,
    updateNfts: () => {
      console.log('refetching');
      query.refetch();
    },
  };
}
