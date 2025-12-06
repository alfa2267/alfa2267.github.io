import React from 'react';
import { Box, Typography, Chip, Stack, Grid, Paper } from '@mui/material';
import { IconCalendar } from '@tabler/icons-react';
import DashboardCard from '../shared/DashboardCard';
import DeploymentBadge from '../shared/DeploymentBadge';

/**
 * ProjectHeroSection - Standardized hero section for all project pages
 *
 * Displays:
 * - Project name & description
 * - Role, timeline, and business value chips
 * - Deployment status (optional)
 * - Tags/technologies
 * - Key stats/metrics (optional)
 */
const ProjectHeroSection = ({
  name,
  description,
  role,
  timeline,
  value,
  tags = [],
  deploymentStatus = null, // { status: 'deployed', environment: 'production', timestamp: '...' }
  showDeployment = false,
  keyStats = [] // Array of { value, label } objects
}) => {
  return (
    <Box>
      {/* Title - Outside Card */}
      <Typography variant="h3" gutterBottom mb={3}>
        {name}
      </Typography>
      
      <DashboardCard>
        <Box>
          <Stack spacing={2}>
            {/* Description */}
            <Box>
              <Typography variant="body1" color="text.secondary" paragraph>
                {description}
              </Typography>
            </Box>

          {/* Metadata Chips */}
          <Box display="flex" gap={1} flexWrap="wrap" alignItems="center">
            {role && (
              <Chip
                label={role}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
            {timeline && (
              <Chip
                label={timeline}
                icon={<IconCalendar size={16} />}
                size="small"
              />
            )}
            {value && (
              <Chip
                label={value}
                color="success"
                size="small"
              />
            )}
            {showDeployment && deploymentStatus && (
              <DeploymentBadge
                status={deploymentStatus.status}
                environment={deploymentStatus.environment}
                timestamp={deploymentStatus.timestamp}
              />
            )}
          </Box>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                Technologies:
              </Typography>
              <Box display="flex" gap={0.5} flexWrap="wrap">
                {tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Key Stats */}
          {keyStats && keyStats.length > 0 && (
            <Box mt={2}>
              <Typography variant="caption" color="text.secondary" gutterBottom display="block" mb={1}>
                Key Metrics:
              </Typography>
              <Grid container spacing={2}>
                {keyStats.map((stat, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h5" color="primary" fontWeight={700}>
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Stack>
      </Box>
    </DashboardCard>
    </Box>
  );
};

export default ProjectHeroSection;
