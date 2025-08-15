import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

// components
import Profile from './Profile';
import { IconMenu, IconExternalLink } from '@tabler/icons';
import Breadcrumbs from '../../../components/shared/Breadcrumbs';
import { useMenuItems } from '../../../hooks/useMenuItems';
import ProjectService from '../../../services/projectService';

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
  const { menuItems } = useMenuItems();
  
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

      // Find matching menu item for current path
      const currentMenuItem = menuItems.find(item => 
        item.href && pathname.includes(item.href.replace('/', ''))
      );

      if (currentMenuItem) {
        items.push({
          label: currentMenuItem.title,
          to: currentMenuItem.href,
        });
      }

      return items;
    } catch (error) {
      console.error('Error generating breadcrumbs:', error);
      return [];
    }
  };

  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    const loadCurrentProject = async () => {
      const pathname = location?.pathname || '';
      const projectSlug = pathname.split('/projects/')[1];
      
      if (!projectSlug) {
        setCurrentProject(null);
        return;
      }

      try {
        const projectService = new ProjectService();
        const project = await projectService.getProjectBySlug(projectSlug);
        setCurrentProject(project);
      } catch (error) {
        console.error('Error loading current project:', error);
        setCurrentProject(null);
      }
    };

    loadCurrentProject();
  }, [location.pathname]);

  const showDemoButton = currentProject && currentProject.demo_url;

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
              href={currentProject.demo_url}
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
