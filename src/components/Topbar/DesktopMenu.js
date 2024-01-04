import React from 'react';
import { makeStyles, Box, Typography } from '@material-ui/core';
import WalletBtn from '../Base/WalletBtn';

const useStyles = makeStyles((theme) => ({
  menuItem: {
    fontSize: '1.3rem',
    fontWeight: '600',
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  socialDiv: {
    display: 'flex',
  },
  socialItem: {
    margin: '5px 20px',
    '& a': {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
    },
    [theme.breakpoints.down('md')]: {
      margin: '5px 10px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '2px',
    },
  },
  socialTitlte: {
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '600',
    textTransform: 'capitalize',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

const socialLinks = [
  { name: 'twitter', link: 'https://twitter.com/_TYRH_' },
  { name: 'telegram', link: 'https://t.me/tyrhcoin' },
];
const DesktopMenu = (props) => {
  const classes = useStyles();

  return (
    <>
      <WalletBtn />
      <Box className={classes.socialDiv}>
        {socialLinks.map((item, index) => (
          <Box className={classes.socialItem} key={index}>
            <a href={item.link} target='_blank' rel='noreferrer' className={classes.social}>
              <img src={`/img/${item.name}.png`} alt={item.name} width={30} />
              <Typography variant='body2' className={classes.socialTitlte}>
                {item.name}
              </Typography>
            </a>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default DesktopMenu;
