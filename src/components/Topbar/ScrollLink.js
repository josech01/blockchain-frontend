import React from 'react';
import { Box, Badge } from '@material-ui/core';
import { Link } from 'react-scroll';
import './index.scss';
const SocialLink = ({ name, to, flag }) => {
  return (
    <Link to={to} smooth={true} duration={500} className='scroll-link'>
      {flag ? (
        <Badge badgeContent='LIVE Testnet v4' color='error' overlap='rectangular'>
          {name}
        </Badge>
      ) : (
        name
      )}
    </Link>
  );
};
export default SocialLink;
