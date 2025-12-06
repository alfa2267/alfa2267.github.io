import React, { useState, useEffect } from 'react';
import { Fab, Zoom, Tooltip } from '@mui/material';
import { IconArrowUp } from '@tabler/icons';

/**
 * BackToTop - Floating button to scroll back to top
 * 
 * @param {Object} sx - Custom styles
 * @param {Number} threshold - Scroll threshold in pixels to show button (default: 400)
 */
const BackToTop = ({ sx = {}, threshold = 400 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Zoom in={visible}>
      <Tooltip title="Back to top" placement="left">
        <Fab
          color="primary"
          size="medium"
          onClick={scrollToTop}
          aria-label="back to top"
          sx={{
            position: 'fixed',
            bottom: 100,
            right: 24,
            zIndex: 1000,
            ...sx
          }}
        >
          <IconArrowUp size={24} />
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default BackToTop;

