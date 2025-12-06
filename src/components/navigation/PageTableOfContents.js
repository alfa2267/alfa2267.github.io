import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider
} from '@mui/material';
import { IconList } from '@tabler/icons';

/**
 * PageTableOfContents - Sidebar table of contents with scroll spy
 * 
 * @param {Array} sections - Array of section objects with { id, title, level }
 * @param {Object} sx - Custom styles
 */
const PageTableOfContents = ({ sections = [], sx = {} }) => {
  const [activeSection, setActiveSection] = useState('');
  const observerRef = useRef(null);

  useEffect(() => {
    if (sections.length === 0) return;

    // Create Intersection Observer for scroll spy
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observerRef.current.observe(element);
      }
    });

    // Set initial active section
    if (sections.length > 0) {
      const firstElement = document.getElementById(sections[0].id);
      if (firstElement) {
        setActiveSection(sections[0].id);
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections]);

  const handleClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update active section immediately
      setActiveSection(sectionId);
    }
  };

  if (sections.length === 0) {
    return null;
  }

  return (
    <Paper
      elevation={2}
      sx={{
        position: 'sticky',
        top: 100,
        maxHeight: 'calc(100vh - 120px)',
        overflow: 'auto',
        p: 2,
        ...sx
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <IconList size={20} style={{ marginRight: 8 }} />
        <Typography variant="h6" fontWeight="bold">
          Contents
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List dense sx={{ p: 0 }}>
        {sections.map((section, index) => (
          <ListItem
            key={section.id}
            disablePadding
            sx={{
              mb: 0.5,
              pl: (section.level - 1) * 2
            }}
          >
            <ListItemButton
              onClick={() => handleClick(section.id)}
              selected={activeSection === section.id}
              sx={{
                borderRadius: 1,
                py: 0.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  },
                  '& .MuiListItemText-primary': {
                    color: 'white'
                  }
                },
                '&:hover': {
                  backgroundColor: 'action.hover'
                }
              }}
            >
              <ListItemText
                primary={section.title}
                primaryTypographyProps={{
                  variant: section.level === 1 ? 'body2' : 'caption',
                  fontWeight: activeSection === section.id ? 'bold' : 'normal',
                  fontSize: section.level === 1 ? '0.875rem' : '0.75rem',
                  sx: {
                    color: activeSection === section.id ? 'white' : 'inherit'
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default PageTableOfContents;

