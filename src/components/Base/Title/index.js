import React from 'react';
import { makeStyles, Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  starDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: theme.spacing(1),
    '& img': {
      margin: theme.spacing(0.5),
    },
  },
  burnTitle: {
    color: 'white',
    fontWeight: '800',
    fontSize: '2.2rem',
    textShadow: '0px 0px 30px white',
  },
  gray: {
    color: theme.palette.project.gray,
    margin: theme.spacing(1),
    fontSize: '1rem',
  },
}));

const Title = (props) => {
  const classes = useStyles();
  const { title, description, star } = props;

  return (
    <>
      <Box>
        <img src='tyrh.png' width={70} alt='tyrh' />
      </Box>
      <Typography className={classes.burnTitle}>{title}</Typography>
      {star == true && (
        <Box className={classes.starDiv}>
          <img src='/img/star.png' width={20} alt='start' />
          <img src='/img/star.png' width={20} alt='start' />
          <img src='/img/star.png' width={20} alt='start' />
        </Box>
      )}
      <Typography variant='caption' className={classes.gray}>
        {description}
      </Typography>
    </>
  );
};

export default Title;
