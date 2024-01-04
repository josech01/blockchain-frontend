import React from 'react';

import { Button, withStyles, Menu, MenuItem, makeStyles } from '@material-ui/core';
import { Link } from 'react-scroll';
import { useDisconnect, useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';
import { menuItems } from '../../helpers';
import { walletAddressConvert } from '../../helpers';
const useStyles = makeStyles((theme) => ({
  menuBtn: {
    minWidth: '40px',
    padding: '5px',
  },
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
  },
}));

const StyledMenu = withStyles((theme) => ({
  paper: {
    border: '1px solid #d3d4d5',
    background: '#2d2e32',
  },
}))((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    '& a': {
      color: 'white',
    },
    '&:focus': {
      backgroundColor: theme.palette.project.background.primary,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const MobileMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { isConnected, address } = useAccount;
  const { disconnect } = useDisconnect();
  const { open, close } = useWeb3Modal();

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        aria-controls='customized-menu'
        aria-haspopup='true'
        color='primary'
        onClick={handleClick}
        variant='outlined'
        className={classes.menuBtn}
      >
        <img src='/img/menu.png' alt='menu' width={20} />
      </Button>
      <StyledMenu id='customized-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <StyledMenuItem style={{ borderBottom: '1px solid white' }}>
          {isConnected ? (
            <Button onClick={disconnect} variant='contained' className={classes.walletBtn}>
              {walletAddressConvert(address)}
            </Button>
          ) : (
            <Button variant='contained' onClick={() => open()} className={classes.walletBtn}>
              Wallet connect
            </Button>
          )}
        </StyledMenuItem>
        {menuItems.map((item, index) => (
          <StyledMenuItem key={index}>
            <Link to={item.to} smooth={true} duration={500} onClick={handleClose}>
              {item.title}
            </Link>
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default MobileMenu;
