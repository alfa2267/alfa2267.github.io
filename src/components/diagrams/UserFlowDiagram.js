import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { IconArrowRight, IconCircle } from '@tabler/icons';

/**
 * User Flow Diagram Component
 * Visualizes user journey through the application
 */
const UserFlowDiagram = ({ steps = [], title = "User Flow" }) => {
  const defaultSteps = [
    { name: 'Login', description: 'User authentication' },
    { name: 'Dashboard', description: 'Overview of data' },
    { name: 'Action', description: 'Perform main task' },
    { name: 'Review', description: 'Confirm and submit' },
    { name: 'Complete', description: 'Task finished' }
  ];

  const flowSteps = steps.length > 0 ? steps : defaultSteps;

  return (
    <Box sx={{ width: '100%', py: 1 }}>
      {title && (
        <Typography variant="h6" gutterBottom textAlign="center" mb={2}>
          {title}
        </Typography>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          flexWrap: 'wrap'
        }}
      >
        {flowSteps.map((step, index) => (
          <React.Fragment key={index}>
            <Paper
              elevation={1}
              sx={{
                p: 1.5,
                minWidth: 100,
                maxWidth: 140,
                textAlign: 'center',
                bgcolor: 'background.paper',
                borderLeft: '3px solid',
                borderColor: 'primary.main',
                borderRadius: 1,
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  elevation: 3,
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                  borderColor: 'primary.dark'
                }
              }}
            >
              <IconCircle
                size={20}
                style={{ marginBottom: 4, color: '#5D87FF' }}
                fill="#5D87FF"
              />
              <Typography variant="body2" fontWeight="bold" color="text.primary">
                {step.name}
              </Typography>
              {step.description && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mt: 0.25, fontSize: '0.7rem' }}
                >
                  {step.description}
                </Typography>
              )}
            </Paper>
            {index < flowSteps.length - 1 && (
              <Box
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center'
                }}
              >
                <IconArrowRight size={24} style={{ color: '#5D87FF' }} />
              </Box>
            )}
            {index < flowSteps.length - 1 && (
              <Box
                sx={{
                  display: { xs: 'flex', sm: 'none' },
                  transform: 'rotate(90deg)',
                  alignItems: 'center'
                }}
              >
                <IconArrowRight size={24} style={{ color: '#5D87FF' }} />
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default UserFlowDiagram;

