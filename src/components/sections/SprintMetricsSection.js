import React from 'react';
import { Box, Typography, Grid, Paper, LinearProgress, Chip, List, ListItem, ListItemText, ListItemIcon, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import { IconCalendar, IconTrendingUp, IconTarget, IconActivity, IconCheck, IconChevronDown } from '@tabler/icons-react';
import DashboardCard from '../shared/DashboardCard';
import VelocityChart from '../diagrams/VelocityChart';

/**
 * SprintMetricsSection - Showcases Agile/Scrum practices
 *
 * Displays sprint planning, velocity tracking, and commitment metrics
 * Shows PM understanding of Agile ceremonies and team capacity
 */
const SprintMetricsSection = ({
  title = "Sprint Metrics & Velocity",
  currentSprint = {},
  velocityHistory = [],
  sprintGoal = '',
  showVelocityChart = true,
  epics = [],
  userStories = [],
  burnDownData = []
}) => {
  const velocityAverage = velocityHistory.length > 0
    ? Math.round(velocityHistory.reduce((sum, s) => sum + s.completed, 0) / velocityHistory.length)
    : 0;

  const commitmentAccuracy = currentSprint.committed
    ? Math.round((currentSprint.completed / currentSprint.committed) * 100)
    : 0;

  return (
    <DashboardCard title={title}>
      <Grid container spacing={3}>
        {/* Current Sprint Overview */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, bgcolor: '#ECF2FF', borderLeft: '4px solid #5D87FF' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                {currentSprint.name || 'Current Sprint'}
              </Typography>
              <Chip
                label={currentSprint.status || 'Active'}
                color={currentSprint.status === 'Completed' ? 'success' : 'primary'}
                size="small"
              />
            </Box>

            {sprintGoal && (
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Sprint Goal:
                </Typography>
                <Typography variant="body1" fontStyle="italic">
                  "{sprintGoal}"
                </Typography>
              </Box>
            )}

            <Grid container spacing={2} mt={1}>
              <Grid item xs={6} md={3}>
                <Box textAlign="center">
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {currentSprint.committed || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Story Points Committed
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box textAlign="center">
                  <Typography variant="h4" color="success.main" fontWeight="bold">
                    {currentSprint.completed || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Points Completed
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box textAlign="center">
                  <Typography variant="h4" color="warning.main" fontWeight="bold">
                    {currentSprint.inProgress || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Points In Progress
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box textAlign="center">
                  <Typography variant="h4" color="info.main" fontWeight="bold">
                    {commitmentAccuracy}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Commitment Accuracy
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {currentSprint.committed && (
              <Box mt={3}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" fontWeight={600}>
                    Sprint Progress
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentSprint.completed || 0} / {currentSprint.committed} points
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={Math.min((currentSprint.completed / currentSprint.committed) * 100, 100)}
                  sx={{ height: 8, borderRadius: 1 }}
                />
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Velocity Chart */}
        {showVelocityChart && velocityHistory.length > 0 && (
          <Grid item xs={12}>
            <VelocityChart velocityHistory={velocityHistory} burnDownData={burnDownData} />
          </Grid>
        )}

        {/* Epics with Success Criteria and Story Points */}
        {epics && epics.length > 0 && (
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom mb={2}>
                Epics & Success Criteria
              </Typography>
              <Grid container spacing={2}>
                {epics.map((epic, index) => {
                  const epicPoints = epic.userStories?.reduce((sum, story) => {
                    const points = parseInt(story.effort?.match(/\d+/)?.[0] || story.storyPoints || 0);
                    return sum + points;
                  }, 0) || 0;

                  return (
                    <Grid item xs={12} md={6} key={index}>
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
                            <Chip label={`${epicPoints} pts`} size="small" color="primary" />
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          {epic.successCriteria && (
                            <Box mb={2}>
                              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                Success Criteria:
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
                          {epic.userStories && epic.userStories.length > 0 && (
                            <Box>
                              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                User Stories ({epic.userStories.length}):
                              </Typography>
                              <List dense>
                                {epic.userStories.map((story, sIndex) => {
                                  const storyPoints = parseInt(story.effort?.match(/\d+/)?.[0] || story.storyPoints || 0);
                                  return (
                                    <ListItem key={sIndex} disablePadding sx={{ py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <Chip label={`${storyPoints}pt`} size="small" variant="outlined" sx={{ minWidth: 40 }} />
                                      </ListItemIcon>
                                      <ListItemText 
                                        primary={story.title || story.id}
                                        secondary={story.as ? `As ${story.as}, I want ${story.want || story.iWantTo}, so that ${story.so || story.soThat}` : story.description}
                                        primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                                        secondaryTypographyProps={{ variant: 'caption' }}
                                      />
                                    </ListItem>
                                  );
                                })}
                              </List>
                            </Box>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
          </Grid>
        )}

        {/* User Stories List (if provided separately) */}
        {userStories && userStories.length > 0 && epics.length === 0 && (
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom mb={2}>
                User Stories
              </Typography>
              <List>
                {userStories.map((story, index) => {
                  const storyPoints = parseInt(story.effort?.match(/\d+/)?.[0] || story.storyPoints || 0);
                  return (
                    <ListItem key={index} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                      <ListItemIcon sx={{ minWidth: 60 }}>
                        <Chip label={`${storyPoints}pt`} size="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={story.title || story.id}
                        secondary={story.as ? `As ${story.as}, I want ${story.want || story.iWantTo}, so that ${story.so || story.soThat}` : story.description}
                        primaryTypographyProps={{ variant: 'body1', fontWeight: 600 }}
                        secondaryTypographyProps={{ variant: 'body2' }}
                      />
                      {story.acceptanceCriteria && (
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                            Acceptance Criteria:
                          </Typography>
                          <List dense>
                            {story.acceptanceCriteria.slice(0, 2).map((criteria, cIndex) => (
                              <ListItem key={cIndex} disablePadding>
                                <ListItemIcon sx={{ minWidth: 20 }}>
                                  <IconCheck size={12} color="green" />
                                </ListItemIcon>
                                <ListItemText primary={criteria} primaryTypographyProps={{ variant: 'caption' }} />
                              </ListItem>
                            ))}
                            {story.acceptanceCriteria.length > 2 && (
                              <Typography variant="caption" color="text.secondary">
                                +{story.acceptanceCriteria.length - 2} more
                              </Typography>
                            )}
                          </List>
                        </Box>
                      )}
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
          </Grid>
        )}

        {/* Sprint Health Indicators */}
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Sprint Health Indicators
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <IconCalendar size={16} color="#5D87FF" />
                      <Typography variant="body2">
                        Sprint Duration: {currentSprint.duration || '2 weeks'}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <IconTarget size={16} color="#13DEB9" />
                      <Typography variant="body2">
                        Team Capacity: {currentSprint.teamCapacity || 'N/A'} pts
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <IconTrendingUp size={16} color={commitmentAccuracy >= 80 ? '#13DEB9' : '#FFAE1F'} />
                      <Typography variant="body2">
                        Commitment Accuracy: {commitmentAccuracy}%
                        {commitmentAccuracy >= 80 && ' ✓ (Healthy)'}
                        {commitmentAccuracy < 80 && commitmentAccuracy >= 60 && ' ⚠ (Needs Attention)'}
                        {commitmentAccuracy < 60 && ' ❌ (Over-committed)'}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <IconActivity size={16} color="#9C27B0" />
                      <Typography variant="body2">
                        Avg Velocity: {velocityAverage} pts/sprint
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default SprintMetricsSection;
