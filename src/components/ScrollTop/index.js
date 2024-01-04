import { useState, useEffect } from 'react';
import './index.scss';
function ScrollTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className={`scroll-to-top-button ${showButton ? 'show-scroll-button' : ''}`} onClick={handleClick}>
      <img src='img/up-arrow.png' width={25} alt='up' />
    </div>
  );
}

export default ScrollTop;
