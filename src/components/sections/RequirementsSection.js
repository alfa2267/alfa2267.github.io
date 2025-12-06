import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Stack,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { IconCheck, IconChevronDown } from '@tabler/icons';
import DashboardCard from '../shared/DashboardCard';

/**
 * Reusable Requirements Section Component
 * Displays epics and user stories with success criteria and story points
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
        <Typography variant="h5" gutterBottom mb={3} sx={{ color: '#001f3f' }}>
          {title}
        </Typography>
      )}
      <DashboardCard>
        <Grid container spacing={2}>
        {epics.map((epic, epicIndex) => {
          // Calculate total story points for the epic
          const epicPoints = epic.userStories?.reduce((sum, story) => {
            const points = parseInt(story.effort?.match(/\d+/)?.[0] || story.storyPoints || 0);
            return sum + points;
          }, 0) || 0;

          return (
            <Grid item xs={12} md={6} key={epicIndex}>
              <Accordion>
                <AccordionSummary expandIcon={<IconChevronDown />}>
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', pr: 2 }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {epic.name || epic.id}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {epic.description}
                      </Typography>
                    </Box>
                    {epicPoints > 0 && (
                      <Chip label={`${epicPoints} pts`} size="small" color="primary" />
                    )}
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    {/* Epic-level Success Criteria */}
                    {epic.successCriteria && epic.successCriteria.length > 0 && (
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                          Epic Success Criteria:
                        </Typography>
                        <List dense>
                          {epic.successCriteria.map((criteria, cIndex) => (
                            <ListItem key={cIndex} disablePadding>
                              <ListItemIcon sx={{ minWidth: 24 }}>
                                <IconCheck size={14} color="green" />
                              </ListItemIcon>
                              <ListItemText primary={criteria} primaryTypographyProps={{ variant: 'body2' }} />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}

                    {/* User Stories */}
                    {epic.userStories && epic.userStories.length > 0 && (
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                          User Stories ({epic.userStories.length}):
                        </Typography>
                        <Stack spacing={1.5}>
                          {epic.userStories.map((story, storyIndex) => {
                            const storyPoints = parseInt(story.effort?.match(/\d+/)?.[0] || story.storyPoints || 0);
                            return (
                              <Paper key={storyIndex} elevation={1} sx={{ p: 1.5 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                                  <Typography variant="subtitle2" fontWeight="bold">
                                    {story.title || story.id} {story.id && story.title && `(${story.id})`}
                                  </Typography>
                                  <Box display="flex" gap={1}>
                                    {storyPoints > 0 && (
                                      <Chip label={`${storyPoints}pt`} size="small" variant="outlined" />
                                    )}
                                    {story.priority && (
                                      <Chip 
                                        label={story.priority} 
                                        size="small" 
                                        color={story.priority === 'P0' || story.priority === 'High' ? 'error' : story.priority === 'P1' || story.priority === 'Medium' ? 'warning' : 'default'}
                                      />
                                    )}
                                  </Box>
                                </Box>
                                {(story.as || story.asA) && (
                                  <Typography variant="body2" fontStyle="italic" mb={1} sx={{ fontSize: '0.875rem' }}>
                                    As a <strong>{story.as || story.asA}</strong>, I want <strong>{story.want || story.iWantTo}</strong>, so that <strong>{story.so || story.soThat}</strong>.
                                  </Typography>
                                )}
                                {story.acceptanceCriteria && story.acceptanceCriteria.length > 0 && (
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
                                {story.effort && !storyPoints && (
                                  <Box mt={1}>
                                    <Chip label={`Effort: ${story.effort}`} size="small" variant="outlined" />
                                  </Box>
                                )}
                              </Paper>
                            );
                          })}
                        </Stack>
                      </Box>
                    )}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Grid>
          );
        })}
      </Grid>
      </DashboardCard>
    </Box>
  );
};

export default RequirementsSection;

