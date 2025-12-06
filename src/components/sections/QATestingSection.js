import React from 'react';
import { Box, Typography, Grid, Paper, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { IconCheck, IconX, IconAlertTriangle, IconBug, IconTestPipe, IconChevronDown } from '@tabler/icons-react';
import DashboardCard from '../shared/DashboardCard';

/**
 * QATestingSection - Showcases QA collaboration and testing strategy
 *
 * Displays test scenarios, acceptance criteria, bug tracking, and quality metrics
 * Shows PM understanding of quality assurance and definition of done
 */
const QATestingSection = ({
  title = "QA & Testing Strategy",
  testingApproach = {},
  testScenarios = [],
  bugMetrics = {},
  acceptanceCriteria = [],
  showBugMetrics = true
}) => {
  const bugSeverityColors = {
    critical: '#d32f2f',
    high: '#ed6c02',
    medium: '#FFAE1F',
    low: '#5D87FF'
  };

  return (
    <DashboardCard title={title}>
      <Grid container spacing={3}>
        {/* Testing Approach */}
        {testingApproach.description && (
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ p: 2, bgcolor: '#ECF2FF' }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Testing Approach
              </Typography>
              <Typography variant="body2" paragraph>
                {testingApproach.description}
              </Typography>
              {testingApproach.types && testingApproach.types.length > 0 && (
                <Box display="flex" gap={1} flexWrap="wrap">
                  {testingApproach.types.map((type, index) => (
                    <Chip key={index} label={type} size="small" color="primary" variant="outlined" />
                  ))}
                </Box>
              )}
            </Paper>
          </Grid>
        )}

        {/* Bug Metrics */}
        {showBugMetrics && bugMetrics && Object.keys(bugMetrics).length > 0 && (
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Bug Tracking & Resolution
              </Typography>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={6} md={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" fontWeight="bold" color="error">
                      {bugMetrics.totalBugs || 0}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Total Bugs Found
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" fontWeight="bold" color="success.main">
                      {bugMetrics.resolved || 0}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Resolved
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" fontWeight="bold" color="warning.main">
                      {bugMetrics.open || 0}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Open
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" fontWeight="bold" color="info.main">
                      {bugMetrics.resolutionTime || 'N/A'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Avg Resolution Time
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {bugMetrics.byPriority && Object.keys(bugMetrics.byPriority).length > 0 && (
                <Box mt={3}>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    Bugs by Severity:
                  </Typography>
                  <Grid container spacing={1}>
                    {Object.entries(bugMetrics.byPriority).map(([severity, count]) => (
                      <Grid item xs={6} md={3} key={severity}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconBug size={16} color={bugSeverityColors[severity] || '#5D87FF'} />
                          <Typography variant="body2" textTransform="capitalize">
                            {severity}: {count}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Paper>
          </Grid>
        )}

        {/* Test Scenarios */}
        {testScenarios.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Key Test Scenarios
            </Typography>
            {testScenarios.map((scenario, index) => (
              <Accordion key={index} elevation={1} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<IconChevronDown size={20} />}>
                  <Box display="flex" alignItems="center" gap={2} flex={1}>
                    <IconTestPipe size={20} color="#5D87FF" />
                    <Typography variant="body1" fontWeight={600}>
                      {scenario.title}
                    </Typography>
                    {scenario.status && (
                      <Chip
                        label={scenario.status}
                        size="small"
                        color={scenario.status === 'Passed' ? 'success' : scenario.status === 'Failed' ? 'error' : 'default'}
                      />
                    )}
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {scenario.description && (
                    <Typography variant="body2" paragraph>
                      {scenario.description}
                    </Typography>
                  )}

                  {scenario.steps && scenario.steps.length > 0 && (
                    <>
                      <Typography variant="body2" fontWeight={600} gutterBottom>
                        Test Steps:
                      </Typography>
                      <List dense>
                        {scenario.steps.map((step, sIndex) => (
                          <ListItem key={sIndex} disablePadding>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <Typography variant="body2" color="text.secondary">
                                {sIndex + 1}.
                              </Typography>
                            </ListItemIcon>
                            <ListItemText primary={step} primaryTypographyProps={{ variant: 'body2' }} />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}

                  {scenario.expectedResult && (
                    <Box mt={2} p={1.5} bgcolor="success.lighter" borderRadius={1}>
                      <Typography variant="body2" fontWeight={600} gutterBottom>
                        Expected Result:
                      </Typography>
                      <Typography variant="body2">{scenario.expectedResult}</Typography>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        )}

        {/* Acceptance Criteria Checklist */}
        {acceptanceCriteria.length > 0 && (
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Acceptance Criteria Checklist
              </Typography>
              <List>
                {acceptanceCriteria.map((criteria, index) => (
                  <ListItem key={index}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {criteria.completed ? (
                        <IconCheck size={20} color="#13DEB9" />
                      ) : criteria.blocked ? (
                        <IconX size={20} color="#FA896B" />
                      ) : (
                        <IconAlertTriangle size={20} color="#FFAE1F" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={criteria.description}
                      secondary={criteria.notes}
                      primaryTypographyProps={{
                        variant: 'body2',
                        style: {
                          textDecoration: criteria.completed ? 'line-through' : 'none',
                          color: criteria.completed ? '#666' : 'inherit'
                        }
                      }}
                    />
                    {criteria.priority && (
                      <Chip
                        label={criteria.priority}
                        size="small"
                        color={criteria.priority === 'P0' ? 'error' : criteria.priority === 'P1' ? 'warning' : 'default'}
                        variant="outlined"
                      />
                    )}
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

export default QATestingSection;
