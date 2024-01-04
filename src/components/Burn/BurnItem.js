import React from 'react';
import { makeStyles, Box, Typography } from '@material-ui/core';
import { toUSDFormat } from '../../helpers';
import clsx from 'clsx';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    width: '80%',
    margin: 'auto',
    marginBottom: '10px',
    gridTemplateColumns: '1fr 2fr',
    alignItems: 'flex-start',
    // borderBottom: '1px solid gray',
    position: 'relative',
    padding: '0px 10px',
    borderRadius: '10px',
  },
  border: {
    position: 'absolute',
    width: '100%',
    bottom: '0',
    height: '2px',
    background: '#282a2e',
    boxShadow: '0px 1px 1px #636363',
  },
  tokenName: {
    display: 'flex',
    alignItems: 'center',
    '& h6': {
      color: 'white',
      fontSize: '1.3rem',
      fontWeight: '700',
      marginLeft: '10px',
      textTransform: 'uppercase',
    },
  },
  animation: {
    animation: `glowing 1500ms linear`,
  },
  tokenBalance: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '& p': {
      color: 'white',
      fontSize: '1.1rem',
    },
    '& span': {
      color: '#7d7d7d',
    },
  },
}));

const BurnItem = (props) => {
  const classes = useStyles();
  const { name, balance, price, last, fire, flash } = props;
  return (
    <Box className={flash == true ? clsx(classes.animation, classes.root) : classes.root}>
      {!last && !flash && <Box className={classes.border}></Box>}
      <Box className={classes.tokenName}>
        {fire ? (
          <img src={`/img/f2_${name}.png`} alt={name} width={35} />
        ) : (
          <img src={`/img/${name}.png`} alt={name} width={25} />
        )}
        <Typography variant='h6' style={{ marginTop: fire ? '5px' : '0px' }}>
          {name}
        </Typography>
      </Box>
      <Box className={classes.tokenBalance}>
        <Typography variant='body1'>{toUSDFormat(balance)}</Typography>
        <Typography variant='caption'>$ {toUSDFormat(balance * price)}</Typography>
      </Box>
    </Box>
  );
};

export default BurnItem;
