import { Box, Button, Typography } from '@mui/material';
import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { commands, events } from '../bindings';
import AddressList from '../components/AddressList';
import { useWalletState } from '../state';
import Header from '@/components/Header';
import Container from '@/components/Container';

export default function Receive() {
  const navigate = useNavigate();
  const walletState = useWalletState();

  const [addresses, setAddresses] = useState<string[]>([]);

  const updateAddresses = () => {
    commands.getAddresses().then((res) => {
      if (res.status === 'error') return;
      setAddresses(res.data);
    });
  };

  useEffect(() => {
    updateAddresses();

    const unlisten = events.syncEvent.listen((event) => {
      if (event.payload.type === 'coin_update') {
        updateAddresses();
      }
    });

    return () => {
      unlisten.then((u) => u());
    };
  });

  return (
    <>
      <Header title={`Receive ${walletState.sync.unit.ticker}`} />

      <Container>
        <Typography variant='h4'>Receive Address</Typography>

        <Typography
          variant='body1'
          fontSize={20}
          mt={2}
          sx={{ wordBreak: 'break-all' }}
        >
          {walletState.sync.receive_address}
        </Typography>

        <Button
          fullWidth
          variant='outlined'
          sx={{ mt: 2 }}
          onClick={() => {
            writeText(walletState.sync.receive_address);
          }}
        >
          Copy
        </Button>

        <Box height={350} mt={2}>
          <AddressList addresses={addresses} />
        </Box>
      </Container>
    </>
  );
}
