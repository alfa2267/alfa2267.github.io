import React from 'react';
import { useLocation } from 'react-router';
import { Box, List, CircularProgress } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import { useMenuItems } from '../../../hooks/useMenuItems';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const { menuItems, loading, error } = useMenuItems();

  if (loading) {
    return (
      <Box sx={{ px: 3, display: 'flex', justifyContent: 'center', py: 2 }}>
        <CircularProgress size={20} />
      </Box>
    );
  }

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {menuItems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
