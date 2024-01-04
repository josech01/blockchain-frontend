import React from 'react';
import { makeStyles, Paper, Card, Box, Typography, CardContent, Button } from '@material-ui/core';
import { toUSDFormat } from '../../helpers';
import clsx from 'clsx';
const useStyles = makeStyles((theme) => ({
  root: {
    width: 150,
    height: 220,
    background: theme.palette.project.background.secondary,
    overflow: 'inherit',
    borderRadius: '15px',
    [theme.breakpoints.down('xs')]: {
      width: 130,
      height: 210,
    },
  },
  shadow: {
    boxShadow: '-10px 0px 20px #0808089c',
    '&:not(:first-child)': {
      marginLeft: '-14%',
    },
  },
  overflow: {},
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0',
    height: '100%',
    justifyContent: 'space-around',
    paddingBottom: '10px !important',
  },
  greenDot: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: '50%',
    marginRight: theme.spacing(1),
    background: theme.palette.project.green,
    boxShadow: `0px 0px 30px ${theme.palette.project.green}`,
  },
  claimBtn: {
    background: theme.palette.project.background.primary,
    borderRadius: '20px',
    color: 'white',
    fontSize: '0.75rem',
    border: '1px solid black',
    width: '86%',
    padding: '4px',
    marginTop: theme.spacing(3),
    '&:hover': {
      background: theme.palette.project.background.primary,
    },
  },
  comingStatus: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.project.gray,
    textTransform: 'capitalize',
  },

  title: {
    color: 'white',
    fontSize: '1.6rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    margin: theme.spacing(1),
  },
}));

const ClaimCard = (props) => {
  const { item } = props;
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, item.status == 'coming' ? classes.shadow : '')}>
      <CardContent className={classes.cardContent}>
        <Typography variant='body2' className={classes.title}>
          {item.name}
        </Typography>
        <Box>
          <img src={`/img/${item.img}.png`} alt='img' height={70} />
        </Box>
        <Box className={classes.claimBtn}>{item.status == 'finished' ? `0?` : toUSDFormat(item.balance)}</Box>
      </CardContent>
    </Card>
  );
};
export default ClaimCard;
