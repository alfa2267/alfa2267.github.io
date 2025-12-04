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
    <Box sx={{ width: '100%', p: 2 }}>
      {title && (
        <Typography variant="h6" gutterBottom textAlign="center" mb={3}>
          {title}
        </Typography>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          flexWrap: 'wrap'
        }}
      >
        {flowSteps.map((step, index) => (
          <React.Fragment key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                minWidth: 120,
                textAlign: 'center',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                position: 'relative'
              }}
            >
              <IconCircle size={24} style={{ marginBottom: 8 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                {step.name}
              </Typography>
              {step.description && (
                <Typography variant="caption" sx={{ opacity: 0.9, display: 'block', mt: 0.5 }}>
                  {step.description}
                </Typography>
              )}
            </Paper>
            {index < flowSteps.length - 1 && (
              <Box
                sx={{
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                <IconArrowRight size={32} style={{ color: '#1976d2' }} />
              </Box>
            )}
            {index < flowSteps.length - 1 && (
              <Box
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  transform: 'rotate(90deg)'
                }}
              >
                <IconArrowRight size={32} style={{ color: '#1976d2' }} />
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default UserFlowDiagram;

