import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { commands, WalletInfo } from '../bindings';
import Container from '../components/Container';
import { fetchState } from '../state';
import Header from '@/components/Header';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Button } from '@/components/ui/button';

export default function ImportWallet() {
  const navigate = useNavigate();

  const [_, setCurrentWallet] = useState<WalletInfo | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    commands.activeWallet().then((res) => {
      if (res.status === 'ok') {
        setCurrentWallet(res.data);
      }
    });
  }, []);

  const submit = (values: z.infer<typeof formSchema>) => {
    commands
      .importWallet(values.walletName, values.walletKey)
      .then((res) => {
        if (res.status === 'ok') {
          fetchState().then(() => {
            navigate('/wallet');
          });
        }
      })
      .catch(setError);
  };

  return (
    <>
      <Header title='Import Wallet' back={() => navigate('/')} />

      <Container>
        <ImportForm onSubmit={submit} />

        {error && (
          <Alert variant='outlined' severity='error' sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Container>
    </>
  );
}

const formSchema = z.object({
  walletName: z.string(),
  walletKey: z.string(),
});

function ImportForm(props: {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}) {
  // Insert constants here
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(props.onSubmit)}
        className='space-y-4 max-w-xl mx-auto py-4'
      >
        <FormField
          control={form.control}
          name='walletName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Name</FormLabel>
              <FormControl>
                <Input required {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='walletKey'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Key</FormLabel>
              <FormControl>
                <Textarea className='resize-none' {...field} />
              </FormControl>
              <FormDescription>
                Enter your mnemonic, private key, or public key below. If it's a
                public key, it will be imported as a read-only cold wallet.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Import Wallet</Button>
      </form>
    </Form>
  );
}
