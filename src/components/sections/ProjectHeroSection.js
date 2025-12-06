import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
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
 */
const ProjectHeroSection = ({
  name,
  description,
  role,
  timeline,
  value,
  tags = [],
  deploymentStatus = null, // { status: 'deployed', environment: 'production', timestamp: '...' }
  showDeployment = false
}) => {
  return (
    <DashboardCard>
      <Box>
        <Stack spacing={2}>
          {/* Title & Description */}
          <Box>
            <Typography variant="h3" gutterBottom>
              {name}
            </Typography>
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
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default ProjectHeroSection;
