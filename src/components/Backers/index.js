import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { Element } from 'react-scroll';
import { PText } from '../Base/Text';
import { CARD_DATA } from '../../constants/cards';
import { Card } from '../Base/Card';
import './index.scss';

const Backers = () => {
  return (
    <Element name='backers'>
      <Box className='baker-container'>
        <Box className='baker-header'>
          <PText className='white glow head-text'>Sponsored by</PText>
          <PText className='grey small-text'>50,000,000 PLS</PText>
        </Box>
        <Box className='baker-cards-container'>
          <Grid container style={{ justifyContent: 'center' }}>
            {CARD_DATA.map((card, index) => {
              return (
                <Grid item xs={12} sm={6} md={6} key={index} style={{ padding: '30px 40px' }}>
                  <Card
                    key={index}
                    link={card.link}
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                  />
                </Grid>
              );
            })}
            {/* <Grid item md={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Link href='https://t.me/pulsechain_iou' target='_blank' className='provide_liquidity'>
                <img src='img/check (1).png' width='15px' alt='check' />
                Provide liquidity? Click here
              </Link>
            </Grid> */}
          </Grid>
        </Box>
      </Box>
    </Element>
  );
};

export default Backers;
