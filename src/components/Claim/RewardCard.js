import React from 'react';
import { makeStyles, Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '10px',
    width: '90px',
    height: '120px',
    border: '3px solid transparent',
    margin: theme.spacing(2),
    background: `linear-gradient(${theme.palette.project.background.secondary}, ${theme.palette.project.background.secondary}) padding-box,linear-gradient(0deg, #ea3095, #9e2fdb, #00aeff) border-box`,
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1),
    },
  },
  name: {
    marginTop: '10px',
    marginBottom: '5px',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
  },
  percent: {
    fontSize: '1.5rem',
    fontWeight: '700',
    backgroundColor: `#f3ec78`,
    backgroundImage: `linear-gradient(180deg, #c52deb, #69bdff)`,
    backgroundSize: `100%`,
    '-webkit-background-clip': 'text',
    '-moz-background-clip': 'text',
    '-webkit-text-fill-color': `transparent`,
    '-moz-text-fill-color': `transparent`,
  },
}));

const RewardCard = (props) => {
  const classes = useStyles();
  const { item } = props;
  return (
    <Box className={classes.root}>
      <Typography variant='body2' className={classes.name}>
        {item.name}
      </Typography>
      <Typography variant='body2' className={classes.percent}>
        {item.percent}%
      </Typography>
      <img src={`/img/nft/${item.img}.png`} alt='card' width={30} />
    </Box>
  );
};

export default RewardCard;
