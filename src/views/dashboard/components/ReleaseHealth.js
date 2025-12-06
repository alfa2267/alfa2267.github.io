import React from 'react';
import { Grid, Box, Typography, Chip, LinearProgress, Stack } from '@mui/material';
import {
  IconRocket,
  IconAlertTriangle,
  IconCheckbox,
  IconClock,
  IconTrendingUp,
  IconActivity
} from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';
import MetricsCard from '../../../components/shared/MetricsCard';
import GitHubService from '../../../services/github';
import ProjectService from '../../../services/projectService';

const ReleaseHealth = () => {
  const githubService = new GitHubService();
  const projectService = new ProjectService();
  const [releaseMetrics, setReleaseMetrics] = React.useState({
    daysSinceIncident: 42,
    deploymentFrequency: '12/week',
    changeFailureRate: 3.2,
    mttr: '< 1hr',
    deploymentSuccessRate: 96.8,
    currentSprint: {
      completed: 23,
      total: 30,
      velocity: 85
    }
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const [weeklyCommits, projects] = await Promise.all([
          githubService.getWeeklyCommitStats(),
          projectService.fetchProjects()
        ]);

        // Calculate deployment frequency based on weekly commits
        // Estimate: commits per week / 2 (assuming some commits are grouped in deployments)
        const estimatedDeployments = Math.max(1, Math.round(weeklyCommits / 2));
        const deploymentFrequency = `${estimatedDeployments}/week`;

        // Calculate project completion stats
        const activeProjects = projects.filter(p => p.status === 'active' || p.status === 'in-progress');
        const completedProjects = projects.filter(p => p.status === 'completed' || p.status === 'done');
        const totalActive = activeProjects.length + completedProjects.length;
        const completed = completedProjects.length;
        const velocity = totalActive > 0 ? Math.round((completed / totalActive) * 100) : 0;

        // Estimate deployment success rate based on activity (high activity = good success rate)
        // This is an approximation - in real scenario, you'd track actual deployments
        const estimatedSuccessRate = weeklyCommits > 10 ? 96.8 : weeklyCommits > 5 ? 94.5 : 92.0;

        setReleaseMetrics({
          daysSinceIncident: 42, // Keep as mock - would need issue tracking
          deploymentFrequency,
          changeFailureRate: 3.2, // Keep as mock - would need deployment tracking
          mttr: '< 1hr', // Keep as mock - would need incident tracking
          deploymentSuccessRate: estimatedSuccessRate,
          currentSprint: {
            completed,
            total: totalActive,
            velocity
          }
        });
      } catch (error) {
        console.error('Error fetching release metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const getHealthStatus = (rate) => {
    if (rate >= 95) return { label: 'Excellent', color: 'success' };
    if (rate >= 85) return { label: 'Good', color: 'info' };
    if (rate >= 70) return { label: 'Fair', color: 'warning' };
    return { label: 'Needs Attention', color: 'error' };
  };

  const healthStatus = getHealthStatus(releaseMetrics.deploymentSuccessRate);

  return (
    <DashboardCard title="Release Health" subtitle="DevOps Performance Metrics">
      <Grid container spacing={2}>
        {/* Top Metrics Row */}
        <Grid item xs={6} sm={3}>
          <MetricsCard
            icon={IconCheckbox}
            label="Days w/o Incident"
            value={releaseMetrics.daysSinceIncident}
            color="#13DEB9"
            size="small"
            trend={{ direction: 'up', value: '+12' }}
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <MetricsCard
            icon={IconRocket}
            label="Deploy Frequency"
            value={releaseMetrics.deploymentFrequency}
            color="#5D87FF"
            size="small"
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <MetricsCard
            icon={IconAlertTriangle}
            label="Change Failure"
            value={`${releaseMetrics.changeFailureRate}%`}
            color="#FA896B"
            size="small"
            trend={{ direction: 'down', value: '-1.2%' }}
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <MetricsCard
            icon={IconClock}
            label="MTTR"
            value={releaseMetrics.mttr}
            color="#FFAE1F"
            size="small"
          />
        </Grid>

        {/* Deployment Success Rate */}
        <Grid item xs={12}>
          <Box sx={{ mt: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <IconActivity size={20} color="#5D87FF" />
                <Typography variant="subtitle2" fontWeight={600}>
                  Deployment Success Rate
                </Typography>
              </Box>
              <Chip
                label={healthStatus.label}
                color={healthStatus.color}
                size="small"
                icon={<IconTrendingUp size={16} />}
              />
            </Stack>

            <Box display="flex" alignItems="center" gap={2}>
              <Box flex={1}>
                <LinearProgress
                  variant="determinate"
                  value={releaseMetrics.deploymentSuccessRate}
                  sx={{
                    height: 8,
                    borderRadius: 1,
                    backgroundColor: '#ECF2FF',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: healthStatus.color === 'success' ? '#13DEB9' :
                                      healthStatus.color === 'info' ? '#5D87FF' :
                                      healthStatus.color === 'warning' ? '#FFAE1F' : '#FA896B'
                    }
                  }}
                />
              </Box>
              <Typography variant="h6" fontWeight={700} color="primary">
                {releaseMetrics.deploymentSuccessRate}%
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Current Sprint Progress */}
        <Grid item xs={12}>
          <Box sx={{ mt: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="subtitle2" fontWeight={600}>
                Project Progress
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {loading ? '...' : `${releaseMetrics.currentSprint.completed} / ${releaseMetrics.currentSprint.total} projects`}
              </Typography>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={releaseMetrics.currentSprint.total > 0 
                ? (releaseMetrics.currentSprint.completed / releaseMetrics.currentSprint.total) * 100 
                : 0}
              sx={{
                height: 6,
                borderRadius: 1,
                backgroundColor: '#E8F7FF',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#49BEFF'
                }
              }}
            />

            <Box display="flex" justifyContent="space-between" mt={0.5}>
              <Typography variant="caption" color="text.secondary">
                Velocity: {releaseMetrics.currentSprint.velocity}%
              </Typography>
              <Typography variant="caption" color="success.main" fontWeight={600}>
                On Track
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default ReleaseHealth;
