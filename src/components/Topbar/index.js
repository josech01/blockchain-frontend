import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, AppBar, Toolbar, Badge, Hidden, Typography, IconButton } from '@material-ui/core';

import { useAccount, usePublicClient } from 'wagmi';
import clsx from 'clsx';
// import config from '../../config';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import { toUSDFormat } from '../../helpers/index';
// import WalletModal from '../Base/WalletModal';
import { getBurnTokenAmount, getTyrhTokenAmount, getStakeTokenAmount } from '../../reducers/nft.slice';
import { useStyles } from './index.styles';
import axios from 'axios';

const Topbar = (props) => {
  // const address = '0xd48Dc422F43Aa8d9a7E18a5A501944344823b068';
  // const isConnected = true;
  const dispatch = useDispatch();
  const { burnTokenAmount, tyrhTokenAmount, stakeTokenAmount } = useSelector((state) => state.nft);
  const classes = useStyles();
  const [priceUsd, setPriceUsd] = useState(0);
  const [percent, setPercent] = useState(0);
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const updatePrice = async () => {
    const { data } = await axios.get(
      'https://api.dexscreener.com/latest/dex/pairs/pulsechain/0x2eff73dca3edb60019834a21758a468cbb22eb4c'
    );
    setPriceUsd(Number(data?.pair?.priceUsd || 0));
    setPercent(Number(data?.pair?.priceChange?.h24 || 0));
  };
  useEffect(() => {
    updatePrice();
    const k = setInterval(() => updatePrice(), 60 * 1000);
    return () => {
      clearInterval(k);
    };
  });

  useEffect(() => {
    if (isConnected) {
      dispatch(getBurnTokenAmount({ publicClient, address }));
      dispatch(getTyrhTokenAmount({ publicClient, address }));
      dispatch(getStakeTokenAmount({ publicClient, address }));
    }
  }, [address, isConnected]);

  const badgeContent = (
    <Box className={percent >= 0 ? classes.greenBadge : classes.redBadge}>
      <Box className={percent >= 0 ? classes.upTriangle : classes.downTriangle}></Box>
      {toUSDFormat(percent, 2)} %
    </Box>
  );

  return (
    <Box className={classes.grow}>
      <AppBar position='static' className={classes.root}>
        <Toolbar>
          <IconButton edge='start' className={classes.logo} aria-label='open drawer'>
            <img src='tyrh.png' width={50} alt='tyrh' />
          </IconButton>
          <Typography variant='h5' className={classes.siteName}>
            TYRH
          </Typography>
          <Box className={classes.status}>
            <Badge
              overlap='rectangular'
              badgeContent={badgeContent}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              className={classes.percentBadge}
            >
              <Box className={classes.greenDot}></Box>$ {toUSDFormat(priceUsd, 7)}
            </Badge>
          </Box>
          <Box className={classes.grow}></Box>
          {isConnected && (
            <Hidden smDown>
              <Box className={classes.balanceStatus}>
                <Box className={classes.token}>
                  <img src='/img/fire.png' alt='fire' width={20} />
                  {toUSDFormat(burnTokenAmount)}
                </Box>
                <Box className={classes.token}>
                  <img src='/tyrh.png' alt='tyrh' width={20} />
                  {toUSDFormat(tyrhTokenAmount)}
                </Box>
                <Box className={classes.token}>
                  <img src='/tyrh_.png' alt='tyrh' width={20} />
                  {toUSDFormat(stakeTokenAmount)}
                </Box>
              </Box>
            </Hidden>
          )}
          <Box className={classes.sectionDesktop}>
            <DesktopMenu />
          </Box>
          <Box className={classes.sectionMobile}>
            <MobileMenu />
          </Box>
        </Toolbar>
        {isConnected && (
          <Hidden mdUp>
            <Box className={clsx(classes.balanceStatus, classes.mobile)}>
              <Box className={classes.token}>
                <img src='/img/fire.png' alt='fire' width={20} />
                {toUSDFormat(burnTokenAmount)}
              </Box>
              <Box className={classes.token}>
                <img src='/tyrh.png' alt='tyrh' width={20} />
                {toUSDFormat(tyrhTokenAmount)}
              </Box>
              <Box className={classes.token}>
                <img src='/tyrh_.png' alt='tyrh' width={20} />
                {toUSDFormat(stakeTokenAmount)}
              </Box>
            </Box>
          </Hidden>
        )}
      </AppBar>
    </Box>
  );
};
export default Topbar;
