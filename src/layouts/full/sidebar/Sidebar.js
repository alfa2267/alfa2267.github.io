import { useMediaQuery, Box, Drawer, IconButton, Tooltip } from '@mui/material';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import Logo from '../shared/logo/Logo';
import SidebarItems from './SidebarItems';

const Sidebar = (props) => {

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const sidebarWidth = '270px';
  const collapsedWidth = '70px';
  const isCollapsed = !props.isSidebarOpen;

  if (lgUp) {
    return (
      <Box
        sx={{
          width: isCollapsed ? collapsedWidth : sidebarWidth,
          flexShrink: 0,
          transition: 'width 0.3s ease',
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={true}
          variant="permanent"
          PaperProps={{
            sx: {
              width: isCollapsed ? collapsedWidth : sidebarWidth,
              boxSizing: 'border-box',
              zIndex: 1100, // Lower than footer (1300)
              transition: 'width 0.3s ease',
              overflowX: 'hidden',
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* ------------------------------------------- */}
            {/* Logo and Toggle Button */}
            {/* ------------------------------------------- */}
            <Box 
              sx={{ 
                px: isCollapsed ? 1 : 3,
                py: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
            >
              {!isCollapsed && <Logo />}
              <Tooltip title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"} placement="right">
                <IconButton
                  onClick={() => props.toggleSidebar && props.toggleSidebar()}
                  size="small"
                  sx={{ ml: isCollapsed ? 0 : 'auto' }}
                >
                  {isCollapsed ? <IconChevronRight size={20} /> : <IconChevronLeft size={20} />}
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems isCollapsed={isCollapsed} />
            </Box>
            
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <Logo />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
