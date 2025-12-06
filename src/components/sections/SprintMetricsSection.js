import React from 'react';
import { Box, Typography, Grid, Paper, LinearProgress, Chip, List, ListItem, ListItemText } from '@mui/material';
import { IconCalendar, IconTrendingUp, IconTarget, IconActivity } from '@tabler/icons-react';
import DashboardCard from '../shared/DashboardCard';

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
  showVelocityChart = true
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

        {/* Velocity Tracking */}
        {showVelocityChart && velocityHistory.length > 0 && (
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Velocity Trend
              </Typography>
              <Box mb={2}>
                <Typography variant="h5" color="primary">
                  {velocityAverage} pts
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Average Velocity (Last {velocityHistory.length} Sprints)
                </Typography>
              </Box>

              {/* Simple velocity bar chart */}
              <Box>
                {velocityHistory.map((sprint, index) => (
                  <Box key={index} mb={1.5}>
                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                      <Typography variant="caption" color="text.secondary">
                        {sprint.name}
                      </Typography>
                      <Typography variant="caption" fontWeight={600}>
                        {sprint.completed} pts
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(sprint.completed / Math.max(...velocityHistory.map(s => s.completed))) * 100}
                      sx={{
                        height: 6,
                        borderRadius: 1,
                        backgroundColor: '#E6FFFA',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: sprint.completed >= velocityAverage ? '#13DEB9' : '#FFAE1F'
                        }
                      }}
                    />
                  </Box>
                ))}
              </Box>
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
