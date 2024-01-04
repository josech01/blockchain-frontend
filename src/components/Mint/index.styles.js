import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '100px',
  },
  claimBtn: {
    background: `#202124`,
    marginTop: theme.spacing(3),
    padding: '10px 20px',
    width: '170px',
    borderRadius: '15px',
    color: 'white',
    display: 'flex',
    fontSize: '1rem',
    alignItems: 'baseline',
    justifyContent: 'space-around',
    textTransform: 'inherit',
    '&:hover': {
      background: `#202124`,
    },
    '& img': {
      marginRight: theme.spacing(1),
    },
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px',
    background: 'linear-gradient(#202124 0%,transparent 20%)',
    borderRadius: '15px',
    width: '100%',
  },
  filterDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: `90%`,
    padding: `40px 00px 20px 00px`,
    '&>div:nth-child(2)': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  catBtnDiv: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  filterBtn: {
    margin: '10px 20px',
    width: '200px',
    height: '53px',
    borderRadius: '10px',
    fontSize: '1.2rem',
    fontWeight: '600',
    background: '#292a2d',
    textTransform: 'inherit',
    color: 'white',
    '&:hover': {
      background: '#292a2d',
    },
    '& img': {
      marginRight: '10px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
      width: '180px',
    },
  },
  caption: {
    color: `#858585`,
    marginBottom: '10px',
  },
  mintBtn: {
    background: 'linear-gradient(#fcb91e,#fb5504)',
    color: 'white',
    borderRadius: '10px',
    height: '53px',
    fontSize: '1rem',
    width: '200px',
    marginBottom: '10px',
  },
  cardDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: '90%',
    minHeight: '300px',
    marginTop: theme.spacing(4),
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  accordion: {
    background: 'transparent',
  },
  accordionSummary: {
    width: '150px',
    color: 'white',
    background: 'transparent',
  },
  accordionDetail: {},
  badge: {
    alignItems: 'center',
    '& span': {
      top: '-10px',
      right: '-5px',
      padding: '2px 10px',
    },
  },
  green: {
    '& span': {
      background: '#5ecb40',
    },
  },
  red: {
    '& span': {
      background: '#cf5160',
    },
  },
}));
