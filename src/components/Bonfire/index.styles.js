import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(25),
    paddingBottom: '100px',
  },
  title: {
    color: 'white',
    fontWeight: '800',
    fontSize: '2.2rem',
    textShadow: '0px 0px 30px white',
  },
  description: {
    color: theme.palette.project.gray,
    margin: theme.spacing(1),
    fontSize: '1rem',
  },
  content: {
    width: '100%',
    display: 'grid',
    marginTop: '50px',
    gridTemplateColumns: '3fr 2fr',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  fireDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  fireImg: {
    width: '270px',
  },
  amount: {
    marginTop: '40px',
    borderRadius: '15px',
    background: theme.palette.project.background.secondary,
    color: 'white',
    fontSize: '1.2rem',
    width: '270px',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btnDiv: {
    width: `100%`,
    paddingLeft: '40px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '30px',
      paddingLeft: '0',
    },
  },
  btn: {
    borderRadius: '15px',
    width: '200px',
    height: '50px',
    color: 'white',
    fontSize: '1rem',
    textTransform: 'inherit',
    '& img': {
      margin: '0 10px',
    },
  },
  blue: {
    background: 'linear-gradient(180deg, #16b6fa, #4186ec)',
    '&:hover': {
      background: 'linear-gradient(180deg, #16b6fa, #4186ec)',
    },
  },
  red: {
    background: 'linear-gradient(#f77f79,#c44465)',
    '&:hover': {
      background: 'linear-gradient(#f77f79,#c44465)',
    },
  },
  input: {
    marginRight: '10px',
    '& input': {
      float: 'right',
      color: 'white',
      textAlign: 'right',
    },
    '& input::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  remainingTime: {
    marginTop: '10px',
    color: 'white',
  },
  fireBtnMax: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '15px',
    background: theme.palette.project.background.secondary,
    color: 'white',
    width: '90%',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  max: {
    color: theme.palette.project.gray,
    margin: '0px 10px',
    cursor: 'pointer',
  },

  paperRoot: {
    display: 'flex',
    boxShadow: 'none',
    alignItems: 'center',
    background: 'transparent',
  },

  icon: {
    color: 'white',
    fontSize: '1rem',
    display: 'flex',
    '& img': {
      marginLeft: '10px',
      marginRight: '15px',
    },
  },
}));
