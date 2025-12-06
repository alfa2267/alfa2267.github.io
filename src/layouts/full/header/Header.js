import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Button, Paper, Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

// components
import Profile from './Profile';
import { IconMenu, IconExternalLink, IconBrandGithub, IconFileText, IconUsers, IconTrendingUp, IconRocket } from '@tabler/icons';
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
  const isAirOps = currentProject?.slug === 'airops';
  const isReloam = currentProject?.slug === 'reloam';

  // StatCard component for Key Stats - Compact version
  const StatCard = ({ icon: Icon, label, value, color = 'primary' }) => (
    <Box 
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1,
        py: 0.5,
        borderRadius: 1,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        minWidth: 'fit-content'
      }}
    >
      <Icon size={16} color={color} />
      <Box>
        <Typography variant="body2" color={color} sx={{ fontSize: '0.75rem', fontWeight: 600, lineHeight: 1.2 }}>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', lineHeight: 1.2, display: 'block' }}>
          {label}
        </Typography>
      </Box>
    </Box>
  );

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

          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, flexGrow: 1 }}>
            <Breadcrumbs items={getBreadcrumbItems()} />
            
            {/* Key Stats for AirOps */}
            {isAirOps && (
              <Box sx={{ 
                display: { xs: 'none', lg: 'flex' }, 
                gap: 1, 
                ml: 3,
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                <StatCard 
                  icon={IconFileText} 
                  label="Strategy Doc" 
                  value="194 pages" 
                  color="#1976d2"
                />
                <StatCard 
                  icon={IconUsers} 
                  label="Interviews" 
                  value="78+" 
                  color="#2e7d32"
                />
                <StatCard 
                  icon={IconTrendingUp} 
                  label="ROI" 
                  value="285%" 
                  color="#ed6c02"
                />
                <StatCard 
                  icon={IconRocket} 
                  label="Break-even" 
                  value="Month 18" 
                  color="#9c27b0"
                />
              </Box>
            )}

            {/* Key Stats for Reloam */}
            {isReloam && (
              <Box sx={{ 
                display: { xs: 'none', lg: 'flex' }, 
                gap: 1, 
                ml: 3,
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                <StatCard 
                  icon={IconUsers} 
                  label="Beta Users" 
                  value="5-10" 
                  color="#1976d2"
                />
                <StatCard 
                  icon={IconTrendingUp} 
                  label="Time Saved" 
                  value="80%" 
                  color="#2e7d32"
                />
                <StatCard 
                  icon={IconRocket} 
                  label="Market Gap" 
                  value="$2B" 
                  color="#ed6c02"
                />
                <StatCard 
                  icon={IconTrendingUp} 
                  label="3-Year ROI" 
                  value="407%" 
                  color="#9c27b0"
                />
              </Box>
            )}
          </Box>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ flexShrink: 0, ml: 2 }}>
           {currentProject?.repo_url && (
             <Button
               variant="outlined"
               startIcon={<IconBrandGithub size={16} />}
               href={currentProject.repo_url}
               target="_blank"
               rel="noopener noreferrer"
             >
               Source Code
             </Button>
           )}
        
          {/* Special handling for Reloam with multiple portals */}
          {currentProject?.slug === 'reloam' && (
            <>
              <Button
                variant="contained"
                size="small"
                color="primary"
                startIcon={<IconExternalLink size={16} />}
                href="https://ld.reloam.ainaeco.uk/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  whiteSpace: 'nowrap',
                  '& .MuiButton-startIcon': {
                    mr: 0.5
                  }
                }}
              >
                Landlord Portal
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                startIcon={<IconExternalLink size={16} />}
                href="https://tn.reloam.ainaeco.uk/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  whiteSpace: 'nowrap',
                  '& .MuiButton-startIcon': {
                    mr: 0.5
                  }
                }}
              >
                Tenant Portal
              </Button>
            </>
          )}
        
          {showDemoButton && currentProject?.slug !== 'reloam' && (
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
