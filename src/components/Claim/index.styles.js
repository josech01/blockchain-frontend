import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '100px',
    minHeight: '900px',
  },
  claimBtn: {
    background: `linear-gradient(#2eb281, #2ca377)`,
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    width: '150px',
    fontSize: '1rem',
    borderRadius: '15px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textTransform: 'inherit',
    [theme.breakpoints.down('sm')]: {
      position: 'inherit',
      right: '0',
    },
    '&:hover': {
      background: `linear-gradient(#077307, #579157)`,
    },
    '& img': {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  },

  timeLeft: {
    marginTop: theme.spacing(2),
    color: theme.palette.project.gray,
    fontSize: '0.9rem',
    marginBottom: theme.spacing(2),
  },
  rewardUsd: {
    color: theme.palette.project.gray,
    fontSize: '0.8rem',
  },
  rewardBtn: {
    background: `#202124`,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    width: '400px',
    fontSize: '1rem',
    borderRadius: '15px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'inherit',
    '&:hover': {
      background: `#202124`,
    },
    '& img': {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      fontSize: '0.8rem',
    },
  },
  rewardCardDiv: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  green: {
    color: '#34810a',
    fontSize: 'inherit',
    paddingLeft: '10px',
  },
  rewardToken: {
    marginTop: theme.spacing(4),
    color: theme.palette.project.gray,
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    '& img': {
      marginLeft: '5px',
    },
  },
  btnDiv: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      width: '100%',
    },
  },
  container: {
    flexGrow: 1,
  },
  containerDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
    },
  },
  title: {
    color: 'white',
    fontSize: '1.6rem',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '600',
    marginBottom: '20px',
    '& img': {
      marginRight: '10px',
    },
  },
  comingTitle: {
    color: 'white',
    fontSize: '1.6rem',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '600',
    marginBottom: '20px',
    '& img': {
      marginRight: '10px',
    },
  },
  liveTitle: {
    justifyContent: 'center',
    textTransform: 'uppercase',
  },
  redDot: {
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    background: 'red',
    boxShadow: '0px 0px 5px red',
    marginRight: '10px',
  },
  center: {
    alignItems: 'center',
  },
  description: {
    color: 'white',
    fontSize: '0.9rem',
  },
  greenShadow: {
    boxShadow: '0px 0px 140px #29997f91',
    borderRadius: '15px',
  },
  comingCardDiv: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
  },
}));
