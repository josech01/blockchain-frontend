import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { walletAddressConvert } from '../../../helpers';
import { useWeb3Modal } from '@web3modal/react';
import { useDisconnect, useAccount } from 'wagmi';
const useStyles = makeStyles((theme) => ({
  walletBtn: {
    color: 'white',
    borderRadius: '20px',
    borderColor: 'white',
    background: '#2c2e31',
    textTransform: 'inherit',
    padding: '5px 20px',
    '& img': {
      marginRight: '10px',
    },
    '&:hover': {
      background: '#2c2e31',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

const WalletBtn = (props) => {
  const classes = useStyles();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open, close } = useWeb3Modal();
  return (
    <>
      {isConnected ? (
        <Button variant='contained' className={classes.walletBtn} onClick={disconnect}>
          <img src='/img/walletconnect.png' alt='walletconnect' width={20} />
          {walletAddressConvert(address)}
        </Button>
      ) : (
        <Button variant='contained' onClick={() => open()} className={classes.walletBtn}>
          <img src='/img/walletconnect.png' alt='walletconnect' width={20} />
          Wallet connect
        </Button>
      )}
    </>
  );
};

export default WalletBtn;
