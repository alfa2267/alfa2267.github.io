import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router';
import { Box, List, CircularProgress, Collapse, IconButton, Tooltip } from '@mui/material';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import { useMenuItems } from '../../../hooks/useMenuItems';

const SidebarItems = ({ isCollapsed = false }) => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const { menuItems, loading } = useMenuItems();
  const [expandedSections, setExpandedSections] = useState({
    'Home': true,
    'Projects': true,
    'External Links': true,
    'Development': true
  });

  // Group menu items by section
  const groupedItems = useMemo(() => {
    const groups = [];
    let currentGroup = null;

    menuItems.forEach((item) => {
      if (item.subheader) {
        if (currentGroup) {
          groups.push(currentGroup);
        }
        currentGroup = {
          subheader: item.subheader,
          items: []
        };
      } else if (currentGroup) {
        currentGroup.items.push(item);
      }
    });

    if (currentGroup) {
      groups.push(currentGroup);
    }

    return groups;
  }, [menuItems]);

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  if (loading) {
    return (
      <Box sx={{ px: isCollapsed ? 1 : 3, display: 'flex', justifyContent: 'center', py: 2 }}>
        <CircularProgress size={20} />
      </Box>
    );
  }

  return (
    <Box sx={{ px: isCollapsed ? 1 : 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {groupedItems.map((group) => {
          const isExpanded = expandedSections[group.subheader] !== false;
          
          return (
            <Box key={group.subheader}>
              {/* Section Header with Collapse Button */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 1,
                  py: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    borderRadius: 1,
                  }
                }}
                onClick={() => !isCollapsed && toggleSection(group.subheader)}
              >
                {!isCollapsed && (
                  <NavGroup item={{ subheader: group.subheader }} isCollapsed={isCollapsed} />
                )}
                {!isCollapsed && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection(group.subheader);
                    }}
                    sx={{ 
                      ml: 'auto',
                      p: 0.5,
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  >
                    {isExpanded ? (
                      <IconChevronUp size={16} />
                    ) : (
                      <IconChevronDown size={16} />
                    )}
                  </IconButton>
                )}
              </Box>

              {/* Section Items */}
              <Collapse in={isExpanded || isCollapsed} timeout="auto" unmountOnExit={false}>
                <List component="div" disablePadding>
                  {group.items.map((item) => (
                    <NavItem 
                      item={item} 
                      key={item.id} 
                      pathDirect={pathDirect}
                      isCollapsed={isCollapsed}
                    />
                  ))}
                </List>
              </Collapse>
            </Box>
          );
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
