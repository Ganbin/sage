import Container from '@/components/Container';
import Header from '@/components/Header';
import { ReceiveAddress } from '@/components/ReceiveAddress';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useErrors } from '@/hooks/useErrors';
import { zodResolver } from '@hookform/resolvers/zod';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { LoaderCircleIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { commands, events } from '../bindings';
import AddressList from '../components/AddressList';
import { useWalletState } from '../state';

export default function Addresses() {
  const { addError } = useErrors();
  const walletState = useWalletState();
  const ticker = walletState.sync.unit.ticker;

  const [hardened, setHardened] = useState(false);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [deriveOpen, setDeriveOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const updateAddresses = useCallback(() => {
    commands
      .getDerivations({ offset: 0, limit: 1000000, hardened })
      .then((data) =>
        setAddresses(data.derivations.map((derivation) => derivation.address)),
      )
      .catch(addError);
  }, [addError, hardened]);

  useEffect(() => {
    updateAddresses();

    const unlisten = events.syncEvent.listen((event) => {
      if (event.payload.type === 'derivation') {
        updateAddresses();
      }
    });

    return () => {
      unlisten.then((u) => u());
    };
  }, [updateAddresses]);

  const derivationIndex = addresses.length;

  const schema = z.object({
    index: z.string().refine((value) => {
      const num = parseInt(value);

      if (
        isNaN(num) ||
        !isFinite(num) ||
        num < derivationIndex ||
        num > 100000 ||
        Math.floor(num) != num
      )
        return false;

      return true;
    }),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      index: derivationIndex.toString(),
    },
  });

  const handler = (values: z.infer<typeof schema>) => {
    setPending(true);

    commands
      .increaseDerivationIndex({ index: parseInt(values.index), hardened })
      .then(() => {
        setDeriveOpen(false);
        updateAddresses();
      })
      .catch(addError)
      .finally(() => setPending(false));
  };

  return (
    <>
      <Header title={t`Receive ${ticker}`} />

      <Container className='flex flex-col gap-4 max-w-screen-lg'>
        <Card>
          <CardHeader>
            <CardTitle className='text-lg font-medium'>
              <Trans>Fresh Address</Trans>
            </CardTitle>
            <CardDescription>
              <Trans>
                The wallet generates a new address after each transaction. Old
                ones stay valid.
              </Trans>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReceiveAddress />
          </CardContent>
        </Card>
        <Card className='max-w-full'>
          <CardHeader>
            <CardTitle className='text-lg font-medium'>
              <Trans>All Addresses</Trans>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center gap-2'>
              <label htmlFor='viewHidden'>
                <Trans>Hardened addresses</Trans>
              </label>
              <Switch
                id='hardened'
                checked={hardened}
                onCheckedChange={(value) => setHardened(value)}
              />
            </div>

            <div className='my-4 flex items-center gap-2'>
              <Trans>Derivation index: {derivationIndex}</Trans>
              <Button
                variant='secondary'
                size='sm'
                onClick={() => setDeriveOpen(true)}
              >
                <Trans>Increase</Trans>
              </Button>
            </div>

            <AddressList addresses={addresses} />
          </CardContent>
        </Card>

        <Dialog open={deriveOpen} onOpenChange={setDeriveOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <Trans>Increase Derivation Index</Trans>
              </DialogTitle>
              <DialogDescription>
                <Trans>
                  Increase the derivation index to generate new addresses.
                  Setting this too high can cause issues, and it can't be
                  reversed without resyncing the wallet.
                </Trans>
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handler)} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='index'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Trans>Derivation Index</Trans>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t`Enter derivation index`}
                          aria-label={t`Derivation index`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className='gap-2'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setDeriveOpen(false)}
                  >
                    <Trans>Cancel</Trans>
                  </Button>
                  <Button
                    type='submit'
                    disabled={!form.formState.isValid || pending}
                  >
                    {pending && (
                      <LoaderCircleIcon className='mr-2 h-4 w-4 animate-spin' />
                    )}
                    {pending ? (
                      <Trans>Generating</Trans>
                    ) : (
                      <Trans>Generate</Trans>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}
