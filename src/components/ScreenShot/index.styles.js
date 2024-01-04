import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '150px',
    paddingBottom: '100px',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(6),
    maxWidth: '400px',
    padding: '50px 60px 20px',
    color: 'white',
    background: '#0c0d0e',
    borderRadius: '15px',
    boxShadow: 'inset 0px 0px 20px 20px #000000;',
    [theme.breakpoints.down('sm')]: {
      padding: '50px 50px 20px',
    },
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.2rem',
    '& p': {
      fontSize: '1.5rem',
      marginLeft: theme.spacing(0.5),
      fontWeight: '600',
    },
  },
  burnItem: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '200px',
    padding: '4px',
    borderBottom: `1px solid ${theme.palette.project.gray}`,
    fontSize: '1.1rem',
  },
  burnToken: {
    color: theme.palette.project.gray,
    display: `flex`,
    alignItems: `center`,
    fontSize: '1.1rem',
    '& img': {
      marginRight: theme.spacing(0.5),
    },
  },
  gray: {
    color: theme.palette.project.gray,
    fontSize: '0.9rem',
    marginBottom: theme.spacing(2.5),
  },
  walletBtn: {
    color: 'white',
    borderRadius: '20px',
    borderColor: 'white',
    background: '#2c2e31',
    textTransform: 'inherit',
    padding: '5px 20px',
    fontSize: '1.1rem',
    marginTop: theme.spacing(4),
    '& img': {
      marginRight: '10px',
    },
    '&:hover': {
      background: '#2c2e31',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 5fr',
  },
  posDiv: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '10px',
  },
  posItem: {
    height: '35px',
    color: theme.palette.project.gray,
  },
  pos: {
    fontSize: '0.75rem',
    top: '-15px',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
}));
