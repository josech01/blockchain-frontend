import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount, usePublicClient } from 'wagmi';
import { makeStyles, Box, Badge } from '@material-ui/core';
import { toUSDFormat } from '../../helpers/index';
import clsx from 'clsx';
import { menuItems } from '../../helpers/index';
import { getBurnTokenAmount, getTyrhTokenAmount, getStakeTokenAmount } from '../../reducers/nft.slice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  sticky: {
    position: 'sticky',
    top: '0',
    background: '#ffffff21',
    zIndex: 4,
    justifyContent: 'flex-end',

    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('xl')]: {
      justifyContent: 'center',
    },
  },
  menuItem: {
    fontSize: '1rem',
    fontWeight: '600',
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    padding: theme.spacing(2),
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  socialDiv: {
    display: 'flex',
  },
  balanceStatus: {
    display: 'flex',
    color: 'white',
    marginRight: '60px',
  },
  token: {
    display: 'flex',
    alignItems: 'center',
    margin: '0px 20px',
    [theme.breakpoints.down('md')]: {
      margin: '0px 10px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0px 5px',
    },
    '& img': {
      marginRight: theme.spacing(1),
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const publicClient = usePublicClient();
  const [sticky, setSticky] = useState(false);
  const { address, isConnected } = useAccount();
  const dispatch = useDispatch();
  const { burnTokenAmount, tyrhTokenAmount, stakeTokenAmount } = useSelector((state) => state.nft);
  const addClass = () => {
    if (window.pageYOffset > 100) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    // addClass();
    window.addEventListener('scroll', addClass);

    return () => {
      window.removeEventListener('scroll', addClass);
    };
  }, []);
  useEffect(() => {
    if (isConnected) {
      dispatch(getBurnTokenAmount({ publicClient, address }));
      dispatch(getTyrhTokenAmount({ publicClient, address }));
      dispatch(getStakeTokenAmount({ publicClient, address }));
    }
  }, [address, isConnected]);
  return (
    <Box className={sticky ? clsx(classes.root, classes.sticky) : classes.root}>
      {menuItems.map((item, index) =>
        item.coming ? (
          <Badge badgeContent="COMING" color="error" key={index}>
            <Box className={classes.menuItem}>{item.title}</Box>
          </Badge>
        ) : (
          <Box className={classes.menuItem} key={index}>
            <Link to={item.to} smooth={true} duration={500}>
              {item.title}
            </Link>
          </Box>
        )
      )}
      {sticky && (
        <Box className={clsx(classes.balanceStatus, classes.mobile)}>
          <Box className={classes.token}>
            <img src="/img/fire.png" alt="fire" width={20} />
            {toUSDFormat(burnTokenAmount)}
          </Box>
          <Box className={classes.token}>
            <img src="/tyrh.png" alt="tyrh" width={20} />
            {toUSDFormat(tyrhTokenAmount)}
          </Box>
          <Box className={classes.token}>
            <img src="/tyrh_.png" alt="tyrh" width={20} />
            {toUSDFormat(stakeTokenAmount)}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
