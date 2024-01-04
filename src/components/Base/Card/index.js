import { Box, Link } from '@material-ui/core';
import { PText } from '../Text';
import './index.scss';
import { CHECK_ICON } from '../../../constants/image';

export const Card = ({ icon, link, title, description }) => {
  const goToLink = () => {
    window.open(link, '_blank');
  };
  console.log({ title });
  return (
    <Box onClick={goToLink} className='card-base' href={link} target='_blank'>
      <img src={icon} alt='card-icon' />
      <PText className='white card-head'>{title}</PText>
      {/* <PText className='grey xs-text'>
        <img src={CHECK_ICON} alt='check-icon' width={10} height={10} />
        {` `}
        {description}
        {` `}
        <Link href={link} className='grey' target='_blank'>
          here
        </Link>
      </PText> */}
    </Box>
  );
};
