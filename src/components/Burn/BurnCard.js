import React from 'react';

import { makeStyles, Card, CardContent, Button, Box, Typography } from '@material-ui/core';
import { toUSDFormat } from '../../helpers';
import clsx from 'clsx';
const useStyles = makeStyles((theme) => ({
  root: {
    width: 160,
    height: 220,
    background: theme.palette.project.background.secondary,
    margin: theme.spacing(6),
    overflow: 'inherit',
    borderRadius: '15px',
    [theme.breakpoints.down('sm')]: {
      margin: `24px 8px`,
    },
    [theme.breakpoints.down('xs')]: {
      width: 130,
      height: 210,
    },
  },
  animationCard: {
    animation: `glowing 1500ms infinite`,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0',
  },
  fire: {
    marginTop: '-30px',
  },
  token: {
    color: 'white',
    fontSize: '1.4rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    margin: theme.spacing(1),
  },
  burnBtn: {
    background: theme.palette.project.background.primary,
    borderRadius: '20px',
    color: 'white',
    fontSize: '0.75rem',
    border: '1px solid black',
    width: '95%',
    padding: '5px',
    marginTop: theme.spacing(3),
    '&:hover': {
      background: theme.palette.project.background.primary,
    },
  },
}));
const BurnCard = (props) => {
  const classes = useStyles();
  const { item, splash } = props;
  return (
    <Card className={splash ? clsx(classes.root, classes.animationCard) : classes.root}>
      <CardContent className={classes.cardContent}>
        <Box className={classes.fire}>
          <img src='/img/fire.png' width={50} alt='fire' />
        </Box>
        <Typography variant='h6' className={classes.token}>
          {item.token}
        </Typography>
        <img src={`/img/${item.token}.png`} width={65} height={70} alt='token' />
        <Button variant='contained' className={classes.burnBtn}>
          {toUSDFormat(item.balance, 5)} {item.unit}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BurnCard;
