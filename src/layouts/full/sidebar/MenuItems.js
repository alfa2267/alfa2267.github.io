import React from 'react';
import { useMenuItems } from '../../../hooks/useMenuItems';
import SidebarItems from './SidebarItems';
import { CircularProgress, Box } from '@mui/material';

const MenuItems = () => {
  const { menuItems, loading, error } = useMenuItems();

  // Show loading state
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={2}>
        <CircularProgress size={20} />
      </Box>
    );
  }

  if (error) {
    console.warn('Menu loading error, using fallback items:', error);
  }

  return <SidebarItems items={menuItems} />;
};

export default MenuItems;
