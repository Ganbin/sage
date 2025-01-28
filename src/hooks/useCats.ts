import { useQuery } from '@tanstack/react-query';
import { useErrors } from './useErrors';
import { commands } from '@/bindings';
import { CustomError } from '@/contexts/ErrorContext';
import { useWallet } from './useWallet';
import useInitialization from './useInitialization';

const useCats = () => {
  const { addError } = useErrors();

  const initialized = useInitialization();
  const wallet = useWallet(initialized);
  console.log('wallet', wallet);
  return useQuery({
    enabled: !!wallet?.fingerprint,
    staleTime: 1000 * 20,
    queryKey: ['cats', wallet?.fingerprint],
    queryFn: async () => {
      try {
        const data = await commands.getCats({});
        return data.cats;
      } catch (error) {
        addError(error as CustomError);
        throw error;
      }
    },
  });
};

export default useCats;
