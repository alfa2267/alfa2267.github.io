import React from 'react';
import { Box, Typography, Grid, Paper, Chip, List, ListItem, ListItemText, ListItemIcon, Divider, Stack } from '@mui/material';
import { IconCalendar, IconTrendingUp, IconTarget, IconActivity, IconCheck, IconStack, IconFlame, IconClock } from '@tabler/icons-react';
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
  burnDownData = [],
  backlogManagement = {}
}) => {
  const velocityAverage = velocityHistory.length > 0
    ? Math.round(velocityHistory.reduce((sum, s) => sum + s.completed, 0) / velocityHistory.length)
    : 0;

  const commitmentAccuracy = currentSprint.committed
    ? Math.round((currentSprint.completed / currentSprint.committed) * 100)
    : 0;

  // Compact Sprint Health Indicators for top right corner
  const healthIndicators = (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <Box display="flex" alignItems="center" gap={0.5}>
        <IconCalendar size={14} color="#5D87FF" />
                  <Typography variant="caption" color="text.secondary">
          {currentSprint.duration || '2 weeks'}
                  </Typography>
                </Box>
      <Box display="flex" alignItems="center" gap={0.5}>
        <IconTarget size={14} color="#13DEB9" />
                  <Typography variant="caption" color="text.secondary">
          {currentSprint.teamCapacity || 'N/A'} pts
                  </Typography>
                </Box>
      <Box display="flex" alignItems="center" gap={0.5}>
        <IconTrendingUp size={14} color={commitmentAccuracy >= 80 ? '#13DEB9' : '#FFAE1F'} />
                  <Typography variant="caption" color="text.secondary">
          {commitmentAccuracy}% {commitmentAccuracy >= 80 ? '✓' : commitmentAccuracy < 60 ? '❌' : '⚠'}
                  </Typography>
                </Box>
      <Box display="flex" alignItems="center" gap={0.5}>
        <IconActivity size={14} color="#9C27B0" />
                  <Typography variant="caption" color="text.secondary">
          {velocityAverage} pts/sprint
                  </Typography>
                </Box>
                </Box>
  );

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">{title}</Typography>
        {healthIndicators}
      </Stack>
      <Grid container spacing={3}>
        {/* Velocity Chart */}
        {showVelocityChart && velocityHistory.length > 0 && (
          <Grid item xs={12}>
            <VelocityChart velocityHistory={velocityHistory} burnDownData={burnDownData} />
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

        {/* Backlog Management & Prioritization */}
        {backlogManagement && Object.keys(backlogManagement).length > 0 && (
          <>
            {/* Prioritization Framework */}
            {backlogManagement.prioritizationFramework && backlogManagement.prioritizationFramework.name && (
              <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 2, bgcolor: '#ECF2FF' }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Prioritization Framework: {backlogManagement.prioritizationFramework.name}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {backlogManagement.prioritizationFramework.description}
            </Typography>

                  {backlogManagement.prioritizationFramework.criteria && backlogManagement.prioritizationFramework.criteria.length > 0 && (
                    <>
                      <Typography variant="body2" fontWeight={600} gutterBottom>
                        Decision Criteria:
                      </Typography>
                      <Box display="flex" gap={1} flexWrap="wrap">
                        {backlogManagement.prioritizationFramework.criteria.map((criterion, index) => (
                          <Chip key={index} label={criterion} size="small" color="primary" variant="outlined" />
                        ))}
                      </Box>
                    </>
                  )}
                </Paper>
              </Grid>
            )}

            {/* Backlog Health Metrics */}
            {backlogManagement.backlogHealth && Object.keys(backlogManagement.backlogHealth).length > 0 && (
              <Grid item xs={12}>
                <Paper elevation={1} sx={{ p: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Backlog Health
                  </Typography>
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={6} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" fontWeight="bold" color="primary">
                          {backlogManagement.backlogHealth.totalItems || 0}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Total Items
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" fontWeight="bold" color="success.main">
                          {backlogManagement.backlogHealth.refined || 0}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Refined & Ready
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" fontWeight="bold" color="warning.main">
                          {backlogManagement.backlogHealth.needsRefinement || 0}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Needs Refinement
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" fontWeight="bold" color="info.main">
                          {backlogManagement.backlogHealth.avgAge || 'N/A'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Avg Item Age
                      </Typography>
                    </Box>
                    </Grid>
                  </Grid>

                  {backlogManagement.backlogHealth.distribution && (
                    <Box mt={3}>
                      <Typography variant="body2" fontWeight={600} gutterBottom>
                        Item Distribution:
                      </Typography>
                      <Grid container spacing={2}>
                        {Object.entries(backlogManagement.backlogHealth.distribution).map(([type, count]) => (
                          <Grid item xs={6} md={3} key={type}>
                            <Paper elevation={0} sx={{ p: 1, bgcolor: 'grey.50', textAlign: 'center' }}>
                              <Typography variant="h6" color="primary">
                                {count}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" textTransform="capitalize">
                                {type}
                              </Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  {backlogManagement.backlogHealth.insights && backlogManagement.backlogHealth.insights.length > 0 && (
                    <Box mt={3} p={2} bgcolor="#FFF9E6" borderRadius={1}>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <IconTrendingUp size={20} color="#FFAE1F" />
                        <Typography variant="subtitle2" fontWeight="bold">
                          Backlog Insights
                        </Typography>
                      </Box>
                      <List dense>
                        {backlogManagement.backlogHealth.insights.map((insight, index) => (
                          <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemText
                              primary={insight}
                              primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </Paper>
              </Grid>
            )}

            {/* Technical Debt & Refinement Notes */}
            {(backlogManagement.technicalDebt?.length > 0 || backlogManagement.refinementNotes?.length > 0) && (
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {/* Technical Debt Tracking */}
                  {backlogManagement.technicalDebt && backlogManagement.technicalDebt.length > 0 && (
                    <Grid item xs={12} md={6}>
                      <Paper elevation={1} sx={{ p: 2 }}>
                        <Box display="flex" alignItems="center" gap={1} mb={2}>
                          <IconFlame size={24} color="#ed6c02" />
                          <Typography variant="subtitle1" fontWeight="bold">
                            Technical Debt
                          </Typography>
                        </Box>
                        <List dense>
                          {backlogManagement.technicalDebt.map((item, index) => {
                            const getPriorityColor = (priority) => {
                              const priorityMap = {
                                'P0': '#d32f2f',
                                'Critical': '#d32f2f',
                                'P1': '#ed6c02',
                                'High': '#ed6c02',
                                'P2': '#FFAE1F',
                                'Medium': '#FFAE1F',
                                'P3': '#5D87FF',
                                'Low': '#5D87FF'
                              };
                              return priorityMap[priority] || '#5D87FF';
                            };
                            return (
                              <React.Fragment key={index}>
                                <ListItem sx={{ px: 0 }}>
                                  <ListItemText
                                    primary={item.description}
                                    secondary={
                                      <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                                        <Chip
                                          label={item.priority}
                                          size="small"
                                          sx={{
                                            bgcolor: getPriorityColor(item.priority),
                                            color: 'white',
                                            height: 20,
                                            fontSize: '0.7rem'
                                          }}
                                        />
                                        {item.effort && (
                                          <Typography variant="caption" color="text.secondary">
                                            {item.effort} points
                                          </Typography>
                                        )}
                                        {item.impact && (
                                          <Typography variant="caption" color="text.secondary">
                                            • Impact: {item.impact}
                                          </Typography>
                                        )}
                    </Box>
                  }
                                    primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
                                {index < backlogManagement.technicalDebt.length - 1 && <Divider />}
                              </React.Fragment>
                            );
                          })}
                        </List>
                      </Paper>
                    </Grid>
                  )}

                  {/* Refinement Notes */}
                  {backlogManagement.refinementNotes && backlogManagement.refinementNotes.length > 0 && (
                    <Grid item xs={12} md={6}>
                      <Paper elevation={1} sx={{ p: 2 }}>
                        <Box display="flex" alignItems="center" gap={1} mb={2}>
                          <IconStack size={24} color="#5D87FF" />
                          <Typography variant="subtitle1" fontWeight="bold">
                            Backlog Refinement Notes
                      </Typography>
                    </Box>
                        <List dense>
                          {backlogManagement.refinementNotes.map((note, index) => (
                            <React.Fragment key={index}>
                              <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
                                <Box sx={{ minWidth: 80, pt: 0.5 }}>
                                  <Chip
                                    label={note.date}
                                    size="small"
                                    icon={<IconClock size={12} />}
                                    variant="outlined"
                                    sx={{ height: 20, fontSize: '0.7rem' }}
                                  />
                                </Box>
                                <ListItemText
                                  primary={note.summary}
                                  secondary={note.details}
                                  primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItem>
                              {index < backlogManagement.refinementNotes.length - 1 && <Divider />}
                            </React.Fragment>
                          ))}
            </List>
          </Paper>
        </Grid>
                  )}
                </Grid>
              </Grid>
            )}
          </>
        )}

      </Grid>
    </Box>
  );
};

export default SprintMetricsSection;
