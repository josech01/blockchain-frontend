import React, { useState } from 'react';
import { makeStyles, Paper, Card, Box, Typography, CardContent, Button, Tooltip, Fade } from '@material-ui/core';
import { toUSDFormat } from '../../helpers';
import clsx from 'clsx';
const useStyles = makeStyles((theme) => ({
  paperroot: {
    background: 'transparent',
    boxShadow: 'none',
  },
  root: {
    width: 155,
    height: 225,
    background: theme.palette.project.background.secondary,
    margin: '20px 40px 20px 0px',
    overflow: 'inherit',
    borderRadius: '15px',
    border: '3px solid transparent',
    cursor: 'pointer',
    position: 'relative',

    [theme.breakpoints.down('xs')]: {
      width: 130,
      height: 210,
      margin: '30px 10px',
    },

    transition: 'all 0.2s linear',
    '&:hover': {
      border: '3px solid transparent',
      background: `linear-gradient(${theme.palette.project.background.secondary}, ${theme.palette.project.background.secondary}) padding-box,linear-gradient(0deg, #fd644f, #f18e27) border-box`,
    },
  },
  selectedCaption: {
    position: 'absolute',
    color: '#f58139',
    top: '-30px',
    fontSize: '0.8rem',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  selected: {
    border: '3px solid transparent',
    background: `linear-gradient(${theme.palette.project.background.secondary}, ${theme.palette.project.background.secondary}) padding-box,linear-gradient(0deg, #fd644f, #f18e27) border-box`,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0',
    height: '100%',
    justifyContent: 'space-around',
    paddingBottom: '0px !important',
    position: 'relative',
    '&:hover': {},
  },
  greenDot: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: '50%',
    marginRight: theme.spacing(1),
    background: theme.palette.project.green,
    boxShadow: `0px 0px 30px ${theme.palette.project.green}`,
  },

  activeStatus: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textTransform: 'capitalize',
  },
  comingStatus: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.project.gray,
    textTransform: 'capitalize',
  },
  normal: {
    opacity: 1,
  },

  title: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '700',
    textTransform: 'inherit',
    marginTop: theme.spacing(2),
  },
  description: {
    color: '#767676',
    fontSize: '1rem',
    marginTop: '-5px',
  },
  hover: {
    textShadow: '0px -10px 20px #8c56ff,0px 10px 15px #8c56ff, 0px 0px 30px #8c56ff',
  },
  btnDiv: {
    height: '60px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  claimBtn: {
    background: theme.palette.project.background.primary,
    borderRadius: '20px',
    color: 'white',
    border: '1px solid black',
    width: '88%',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '4px 10px',
    marginBottom: '10px',
    '& p': {
      fontSize: '0.9rem',
    },
    '&:hover': {
      background: theme.palette.project.background.primary,
    },
  },
  caption: {
    color: `#767676`,
    fontSize: '0.8rem',
  },
  imgDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    background: '#26272a',
    borderRadius: '50%',
    // width: 'fit-content',
    width: '60px',
    height: '60px',
    margin: '10px auto',
  },
  icon: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  tooltip: {
    fontSize: '0.9rem',
    maxWidth: '300px',
    textAlign: 'center',
  },
}));

const ClaimCard = (props) => {
  const { item, selectCard, selected } = props;
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  return (
    <Paper className={classes.paperroot}>
      <Card className={selected ? clsx(classes.root, classes.selected) : classes.root} onClick={() => selectCard(item)}>
        {selected && (
          <Typography variant="caption" className={classes.selectedCaption}>
            Selected
          </Typography>
        )}
        <CardContent
          className={clsx(classes.cardContent, classes.normal)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {item.info && (
            <Tooltip
              title={item.tooltip}
              placement="top"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              classes={{ tooltip: classes.tooltip }}
            >
              <Box className={classes.icon}>
                <img src="/img/nft/info.png" alt="icon" width={15} />
              </Box>
            </Tooltip>
          )}
          <Box flexGrow={1}>
            <Typography variant="body2" className={hover ? clsx(classes.title, classes.hover) : classes.title}>
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              className={hover ? clsx(classes.description, classes.hover) : classes.description}
            >
              {item.description}
            </Typography>
            <Box className={classes.imgDiv}>
              {item?.active != false && <img src={`/img/nft/${item.img}.png`} alt="img" width={45} height={45} />}
            </Box>
          </Box>
          <Box className={classes.btnDiv}>
            <Typography variant="caption" className={classes.caption}>
              price
            </Typography>
            <Button className={classes.claimBtn}>
              <Typography variant="body1">{toUSDFormat(item.price)}</Typography>
              <img src="/img/fire.png" width={15} alt="fire" />
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Paper>
  );
};
export default ClaimCard;
