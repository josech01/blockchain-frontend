import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(10),
  },

  burnBtn: {
    background: `#202124`,
    marginTop: theme.spacing(3),
    padding: '10px 30px',
    borderRadius: '15px',
    fontSize: '1.1rem',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    textTransform: 'inherit',
    '&:hover': {
      background: `#202124`,
    },
    '& img': {
      marginLeft: theme.spacing(1),
      marginBottom: theme.spacing(0.5),
    },
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {},
  },
  hand: {
    position: 'absolute',
    right: '35px',
    top: '20px',
  },
  burnStatDiv: {
    width: '80%',
    margin: 'auto',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  white: {
    color: 'white',
  },
  statCard: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.project.background.secondary,
    margin: '50px auto',
    minWidth: 300,
    maxWidth: 330,
    position: 'relative',
    borderRadius: '20px',
    minHeight: '430px',
  },
  fireDiv: {
    position: 'absolute',
    top: '-30px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  cardTitle: {
    marginTop: '50px',
    fontSize: '1.3rem',
    fontWeight: '600',
  },
  tyrhDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    height: '50px',
    position: 'relative',
    '& h6': {
      fontSize: '1.8rem',
      marginLeft: '10px',
      color: 'white',
      fontWeight: '700',
      textShadow: '0px 0px 35px #0000ff7d',
    },
  },
  tyrhImgDiv: {
    borderRadius: '50%',
    background: 'black',
    width: '35px',
    height: '35px',
    padding: '5px',
    '& img': {
      margin: 'auto',
    },
  },
  burnItemDiv: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
  },
  fireBtn: {
    background: `linear-gradient(#e5b953,#fe9f42,#d0583e)`,
    borderRadius: `10px`,
    color: `white`,
    textTransform: `inherit`,
    boxShadow: '0px 0px 35px #d0583e70',
    '& img': {
      marginRight: '10px',
    },
  },
  marginAuto: {
    margin: 'auto',
  },
}));
