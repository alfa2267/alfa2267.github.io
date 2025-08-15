import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

// components
import Profile from './Profile';
import { IconMenu, IconExternalLink } from '@tabler/icons';
import Breadcrumbs from '../../../components/shared/Breadcrumbs';

const Header = (props) => {

  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));


  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  const location = useLocation();
  
  // Get breadcrumb items based on current route
  const getBreadcrumbItems = () => {
    try {
      const pathname = location?.pathname || '';
      const items = [];

      // Add Home breadcrumb
      items.push({
        label: 'Home',
        to: '/',
      });

      // Add current page breadcrumb
      if (pathname.includes('community-vote')) {
        items.push({
          label: 'Community Vote',
          to: '/community-vote',
        });
      }
      // Add more routes as needed

      return items;
    } catch (error) {
      console.error('Error generating breadcrumbs:', error);
      return [];
    }
  };

  // Check if we should show the demo button
  const showDemoButton = location.pathname.includes('community-vote');

  return (
    <AppBarStyled position="sticky" color="default" elevation={1}>
      <ToolbarStyled sx={{ minHeight: 64 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, overflow: 'hidden' }}>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={props.toggleMobileSidebar}
            sx={{
              display: {
                lg: "none",
                xs: "inline-flex",
              },
              mr: 2,
              flexShrink: 0
            }}
          >
            <IconMenu width="20" height="20" />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
            <Breadcrumbs items={getBreadcrumbItems()} />
          </Box>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ flexShrink: 0, ml: 2 }}>
          {showDemoButton && (
            <Button
              variant="contained"
              size="small"
              color="primary"
              startIcon={<IconExternalLink size={16} />}
              href="https://alfa2267.github.io/community-vote/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                whiteSpace: 'nowrap',
                '& .MuiButton-startIcon': {
                  mr: 0.5
                }
              }}
            >
              View Demo
            </Button>
          )}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
