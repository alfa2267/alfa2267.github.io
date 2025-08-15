import React from 'react';
import PropTypes from 'prop-types';
import { Box, Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Breadcrumbs = ({ items = [] }) => {
  // Ensure items is an array and has at least one item
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      ml: 2,
      '& .MuiBreadcrumbs-ol': {
        flexWrap: 'nowrap',
      },
      '& .MuiBreadcrumbs-separator': {
        margin: '0 4px',
      },
      '& .MuiBreadcrumbs-li': {
        whiteSpace: 'nowrap',
      },
      '& a': {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
          textDecoration: 'underline',
        }
      }
    }}>
      <MuiBreadcrumbs aria-label="breadcrumb">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return isLast ? (
            <Typography key={index} color="text.primary" variant="body2">
              {item.label}
            </Typography>
          ) : (
            <Link
              key={index}
              component={RouterLink}
              to={item.to}
              color="inherit"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              {item.icon ? (
                React.isValidElement(item.icon) ? (
                  item.icon
                ) : (
                  <item.icon size={16} />
                )
              ) : null}
              {item.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};

// Add prop types for better development experience
Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired
    })
  )
};

export default Breadcrumbs;
