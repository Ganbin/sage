import Header from '@/components/Header';
import SafeAreaView from '@/components/SafeAreaView';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useErrors } from '@/hooks/useErrors';
import { zodResolver } from '@hookform/resolvers/zod';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { LoaderCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { commands } from '../bindings';
import Container from '../components/Container';
import { fetchState } from '../state';

export default function ImportWallet() {
  const navigate = useNavigate();

  const { addError } = useErrors();

  const [pending, setPending] = useState(false);

  const formSchema = z.object({
    name: z.string(),
    key: z.string(),
    addresses: z.string().refine((value) => {
      const num = parseInt(value);

      return (
        isFinite(num) &&
        Math.floor(num) === num &&
        !isNaN(num) &&
        num >= 0 &&
        num <= 100000
      );
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addresses: '0',
    },
  });

  const submit = (values: z.infer<typeof formSchema>) => {
    setPending(true);

    commands
      .importKey({
        name: values.name,
        key: values.key,
        derivation_index: parseInt(values.addresses),
      })
      .then(fetchState)
      .then(() => navigate('/wallet'))
      .catch(addError)
      .finally(() => setPending(false));
  };

  return (
    <SafeAreaView>
      <Header title={t`Import Wallet`} back={() => navigate('/')} />
      <Container>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className='space-y-4 max-w-xl mx-auto py-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Trans>Wallet Name</Trans>
                  </FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='key'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Trans>Wallet Key</Trans>
                  </FormLabel>
                  <FormControl>
                    <Textarea className='resize-none h-20' {...field} />
                  </FormControl>
                  <FormDescription>
                    <Trans>
                      Enter your mnemonic, private key, or public key below. If
                      it's a public key, it will be imported as a read-only cold
                      wallet.
                    </Trans>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='addresses'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Trans>Initial Addresses</Trans>
                  </FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormDescription>
                    <Trans>
                      The initial derivation index to sync to (both hardened and
                      unhardened keys). This is primarily applicable to legacy
                      wallets with either hardened keys or gaps in addresses
                      used.
                    </Trans>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' disabled={pending || !form.formState.isValid}>
              {pending && (
                <LoaderCircleIcon className='mr-2 h-4 w-4 animate-spin' />
              )}
              {pending ? <Trans>Importing</Trans> : <Trans>Import</Trans>}
            </Button>
          </form>
        </Form>
      </Container>
    </SafeAreaView>
  );
}
