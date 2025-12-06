import React, { useState, useEffect } from 'react';
import { Box, Chip, Typography, Stack, Tooltip } from '@mui/material';
import {
  IconCircleCheck,
  IconActivity,
  IconCoffee,
  IconCode,
  IconGitCommit
} from '@tabler/icons-react';

const SystemStatus = () => {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    // Calculate uptime since page load
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setUptime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  // Fun DevOps metrics
  const metrics = [
    {
      icon: IconCircleCheck,
      label: 'Portfolio Status',
      value: 'Production',
      color: '#13DEB9',
      tooltip: 'All systems operational'
    },
    {
      icon: IconActivity,
      label: 'Uptime',
      value: formatUptime(uptime),
      color: '#5D87FF',
      tooltip: 'Session uptime'
    },
    {
      icon: IconGitCommit,
      label: 'Build',
      value: 'v2.0.0',
      color: '#FFAE1F',
      tooltip: 'Current portfolio version'
    },
    {
      icon: IconCode,
      label: 'Deployments',
      value: '99.9%',
      color: '#9C27B0',
      tooltip: 'Success rate'
    },
    {
      icon: IconCoffee,
      label: 'Coffee',
      value: 'High',
      color: '#795548',
      tooltip: 'Fuel level optimal'
    }
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: { xs: 0, lg: '270px' }, // Start after sidebar on desktop
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid #e5eaef',
        zIndex: 1300, // Higher than sidebar (1100)
        py: 1,
        px: 3,
        display: { xs: 'none', md: 'block' } // Hide on mobile for space
      }}
    >
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        {/* Left side - System Status */}
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Tooltip key={index} title={metric.tooltip} arrow>
                <Chip
                  icon={<Icon size={14} color={metric.color} />}
                  label={
                    <Typography variant="caption" component="span">
                      <strong>{metric.label}:</strong> {metric.value}
                    </Typography>
                  }
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: metric.color,
                    '& .MuiChip-icon': {
                      color: metric.color
                    }
                  }}
                />
              </Tooltip>
            );
          })}
        </Stack>

        {/* Right side - Fun message */}
        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          Built with ❤️ by a Release, DevOps and Product specialist
        </Typography>
      </Stack>
    </Box>
  );
};

export default SystemStatus;
