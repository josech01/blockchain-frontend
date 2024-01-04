import React, { useEffect } from 'react';
import {
  makeStyles,
  withStyles,
  Dialog,
  DialogTitle,
  Box,
  Typography,
  Button,
  Grid,
  DialogContent,
} from '@material-ui/core';
import { useConnect, useSwitchNetwork, useAccount } from 'wagmi';
import { connect } from '@wagmi/core';
const CustomModal = withStyles((theme) => ({
  paper: {
    background: theme.palette.project.background.secondary,
    borderRadius: '10px',
  },
}))(Dialog);
const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '1.2rem',
    color: 'white',
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    paddingBottom: theme.spacing(2),
  },
  connectBtn: {
    background: theme.palette.project.background.primary,
    color: 'white',

    margin: theme.spacing(1),
    borderRadius: theme.spacing(2),
    '&:hover': {
      background: theme.palette.project.background.primary,
    },
  },
}));

const WalletModal = (props) => {
  const { connectors, error, isLoading, pendingConnector } = useConnect();
  const { chains, pendingChainId, switchNetwork } = useSwitchNetwork();
  const { address, isConnected } = useAccount();
  // const network = useSwitchNetwork({
  //   chainId: 369,
  // });
  const classes = useStyles();
  const { handleClose, open } = props;

  const handleConnect = async ({ connector }) => {
    handleClose();
    const result = await connect({ connector });

    console.log('ss', { isConnected });
  };

  return (
    <CustomModal onClose={handleClose} className={classes.paper} aria-labelledby='wallet-dialog-title' open={open}>
      <DialogTitle className={classes.title} id='simple-dialog-title'>
        Wallet Connect
      </DialogTitle>
      <DialogContent className={classes.content}>
        {connectors.map((connector) => (
          <Button
            variant='contained'
            disabled={!connector.ready}
            key={connector.id}
            className={classes.connectBtn}
            onClick={() => handleConnect({ connector })}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
          </Button>
        ))}

        {/* {error && <div>{error.message}</div>} */}
      </DialogContent>
    </CustomModal>
  );
};

export default WalletModal;
