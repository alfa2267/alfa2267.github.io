import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Stack
} from '@mui/material';
import { IconCheck } from '@tabler/icons';

/**
 * Reusable Requirements Section Component
 * Displays epics and user stories in a grid layout
 */
const RequirementsSection = ({ 
  title = "Requirements & User Stories",
  epics = [],
  showTitle = true,
  columnsPerRow = 2
}) => {
  if (epics.length === 0) return null;

  return (
    <Box>
      {showTitle && (
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      )}
      <Stack spacing={2}>
        {epics.map((epic, epicIndex) => (
          <Box key={epicIndex}>
            <Typography variant="h6" gutterBottom>{epic.name}</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>{epic.description}</Typography>
            <Stack spacing={1.5}>
              {epic.userStories && epic.userStories.map((story, storyIndex) => (
                <Paper key={storyIndex} elevation={1} sx={{ p: 1.5 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {story.title} {story.id && `(${story.id})`}
                    </Typography>
                    {story.priority && (
                      <Chip 
                        label={story.priority} 
                        size="small" 
                        color={story.priority === 'P0' || story.priority === 'High' ? 'error' : 'default'}
                      />
                    )}
                  </Box>
                  {(story.as || story.asA) && (
                    <Typography variant="body2" fontStyle="italic" mb={1} sx={{ fontSize: '0.875rem' }}>
                      As a <strong>{story.as || story.asA}</strong>, I want <strong>{story.want || story.iWantTo}</strong>, so that <strong>{story.so || story.soThat}</strong>.
                    </Typography>
                  )}
                  {story.acceptanceCriteria && (
                    <>
                      <Typography variant="caption" fontWeight="bold" display="block" mb={0.5}>
                        Acceptance Criteria:
                      </Typography>
                      <List dense>
                        {story.acceptanceCriteria.map((criteria, cIndex) => (
                          <ListItem key={cIndex} disablePadding sx={{ py: 0.25 }}>
                            <ListItemIcon sx={{ minWidth: 24 }}>
                              <IconCheck size={12} color="green" />
                            </ListItemIcon>
                            <ListItemText primary={criteria} primaryTypographyProps={{ variant: 'body2', fontSize: '0.875rem' }} />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                  {story.effort && (
                    <Box mt={1}>
                      <Chip label={`Effort: ${story.effort}`} size="small" variant="outlined" />
                    </Box>
                  )}
                </Paper>
              ))}
            </Stack>
            {epicIndex < epics.length - 1 && <Divider sx={{ my: 2 }} />}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default RequirementsSection;

