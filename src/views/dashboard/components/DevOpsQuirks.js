import React from 'react';
import { Box, Typography, Stack, Chip, Paper, LinearProgress } from '@mui/material';
import {
  IconBrandGit,
  IconCoffee,
  IconMoodSmile,
  IconCode,
  IconBug,
  IconRocket
} from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';

const DevOpsQuirks = () => {
  // Fun, personality-driven metrics
  const quirkyMetrics = [
    {
      icon: IconBrandGit,
      label: 'Commits This Week',
      value: 47,
      maxValue: 50,
      color: '#5D87FF',
      subtitle: 'Keep shipping!'
    },
    {
      icon: IconCoffee,
      label: 'Coffee Consumed',
      value: '∞',
      color: '#795548',
      subtitle: 'Powered by caffeine'
    },
    {
      icon: IconBug,
      label: 'Bugs Squashed',
      value: 23,
      maxValue: 30,
      color: '#13DEB9',
      subtitle: 'Clean code champion'
    },
    {
      icon: IconCode,
      label: 'Features Shipped',
      value: 12,
      maxValue: 15,
      color: '#9C27B0',
      subtitle: 'This quarter'
    }
  ];

  const funFacts = [
    { icon: IconRocket, text: 'Zero-downtime deployments: 42 days', color: '#13DEB9' },
    { icon: IconMoodSmile, text: 'Team happiness score: 9.2/10', color: '#FFAE1F' },
    { icon: IconBrandGit, text: 'Pull requests merged: 156', color: '#5D87FF' }
  ];

  return (
    <DashboardCard title="DevOps DNA" subtitle="The numbers behind the hustle">
      <Stack spacing={3}>
        {/* Quirky Metrics */}
        <Box>
          <Stack spacing={2}>
            {quirkyMetrics.map((metric, index) => {
              const Icon = metric.icon;
              const percentage = metric.maxValue ? (metric.value / metric.maxValue) * 100 : 100;

              return (
                <Box key={index}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Icon size={18} color={metric.color} />
                      <Typography variant="body2" fontWeight={600}>
                        {metric.label}
                      </Typography>
                    </Box>
                    <Typography variant="h6" color={metric.color} fontWeight={700}>
                      {metric.value}
                    </Typography>
                  </Stack>

                  {metric.maxValue && (
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{
                        height: 6,
                        borderRadius: 1,
                        backgroundColor: '#F2F6FA',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: metric.color
                        }
                      }}
                    />
                  )}

                  <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    {metric.subtitle}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>

        {/* Fun Facts */}
        <Box>
          <Typography variant="subtitle2" fontWeight={700} mb={1.5}>
            Fun Facts
          </Typography>
          <Stack spacing={1}>
            {funFacts.map((fact, index) => {
              const Icon = fact.icon;
              return (
                <Paper key={index} elevation={0} sx={{ p: 1.5, backgroundColor: '#F2F6FA' }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Icon size={16} color={fact.color} />
                    <Typography variant="caption" color="text.secondary">
                      {fact.text}
                    </Typography>
                  </Box>
                </Paper>
              );
            })}
          </Stack>
        </Box>

        {/* Personal Touch */}
        <Box
          sx={{
            p: 2,
            backgroundColor: '#ECF2FF',
            borderRadius: 1,
            borderLeft: '4px solid #5D87FF'
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            💡 "I believe the best products are built at the intersection of user needs, technical feasibility, and business value. That's where I thrive."
          </Typography>
        </Box>
      </Stack>
    </DashboardCard>
  );
};

export default DevOpsQuirks;
