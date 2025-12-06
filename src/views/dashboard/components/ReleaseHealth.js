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

const ReleaseHealth = () => {
  // Mock data - replace with real data from your projects/services
  const releaseMetrics = {
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
  };

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
                Current Sprint Progress
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {releaseMetrics.currentSprint.completed} / {releaseMetrics.currentSprint.total} tasks
              </Typography>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={(releaseMetrics.currentSprint.completed / releaseMetrics.currentSprint.total) * 100}
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
