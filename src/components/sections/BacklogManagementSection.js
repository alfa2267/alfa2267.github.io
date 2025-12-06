import React from 'react';
import { Box, Typography, Grid, Paper, List, ListItem, ListItemText, Chip, Divider } from '@mui/material';
import { IconStack, IconFlame, IconClock, IconTrendingUp } from '@tabler/icons-react';
import DashboardCard from '../shared/DashboardCard';

/**
 * BacklogManagementSection - Showcases product backlog management skills
 *
 * Displays prioritization framework, backlog refinement, technical debt tracking
 * Shows PM's ability to balance features, bugs, and tech debt
 */
const BacklogManagementSection = ({
  title = "Backlog Management",
  prioritizationFramework = {},
  backlogHealth = {},
  technicalDebt = [],
  refinementNotes = [],
  showFramework = true
}) => {
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
    <DashboardCard title={title}>
      <Grid container spacing={3}>
        {/* Prioritization Framework */}
        {showFramework && prioritizationFramework && prioritizationFramework.name && (
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 2, bgcolor: '#ECF2FF' }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Prioritization Framework: {prioritizationFramework.name}
              </Typography>
              <Typography variant="body2" paragraph>
                {prioritizationFramework.description}
              </Typography>

              {prioritizationFramework.criteria && prioritizationFramework.criteria.length > 0 && (
                <>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    Decision Criteria:
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap">
                    {prioritizationFramework.criteria.map((criterion, index) => (
                      <Chip key={index} label={criterion} size="small" color="primary" variant="outlined" />
                    ))}
                  </Box>
                </>
              )}
            </Paper>
          </Grid>
        )}

        {/* Backlog Health Metrics */}
        {backlogHealth && Object.keys(backlogHealth).length > 0 && (
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Backlog Health
              </Typography>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={6} md={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" fontWeight="bold" color="primary">
                      {backlogHealth.totalItems || 0}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Total Items
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" fontWeight="bold" color="success.main">
                      {backlogHealth.refined || 0}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Refined & Ready
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" fontWeight="bold" color="warning.main">
                      {backlogHealth.needsRefinement || 0}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Needs Refinement
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" fontWeight="bold" color="info.main">
                      {backlogHealth.avgAge || 'N/A'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Avg Item Age
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {backlogHealth.distribution && (
                <Box mt={3}>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    Item Distribution:
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(backlogHealth.distribution).map(([type, count]) => (
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
            </Paper>
          </Grid>
        )}

        {/* Technical Debt Tracking */}
        {technicalDebt.length > 0 && (
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <IconFlame size={24} color="#ed6c02" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Technical Debt
                </Typography>
              </Box>
              <List dense>
                {technicalDebt.map((item, index) => (
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
                    {index < technicalDebt.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        )}

        {/* Refinement Notes */}
        {refinementNotes.length > 0 && (
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <IconStack size={24} color="#5D87FF" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Backlog Refinement Notes
                </Typography>
              </Box>
              <List dense>
                {refinementNotes.map((note, index) => (
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
                    {index < refinementNotes.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        )}

        {/* Prioritization Insights */}
        {backlogHealth.insights && backlogHealth.insights.length > 0 && (
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ p: 2, bgcolor: '#FFF9E6' }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <IconTrendingUp size={20} color="#FFAE1F" />
                <Typography variant="subtitle2" fontWeight="bold">
                  Backlog Insights
                </Typography>
              </Box>
              <List dense>
                {backlogHealth.insights.map((insight, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemText
                      primary={insight}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        )}
      </Grid>
    </DashboardCard>
  );
};

export default BacklogManagementSection;
