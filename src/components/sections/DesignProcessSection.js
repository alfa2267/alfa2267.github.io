import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  ListItemIcon
} from '@mui/material';
import {
  IconCheck,
  IconPalette
} from '@tabler/icons';
import DashboardCard from '../shared/DashboardCard';

/**
 * Design Process Section Component
 * Displays design principles for a project
 */
const DesignProcessSection = ({
  title = "Design Process",
  designProcess = null,
  showTitle = true
}) => {
  // Return null if no design process data
  if (!designProcess) {
    return null;
  }

  const { principles = [] } = designProcess;

  // Return null if no principles
  if (principles.length === 0) {
    return null;
  }

  return (
    <>
      {showTitle && (
        <Typography variant="h5" gutterBottom mb={3} sx={{ color: '#001f3f' }}>
          {title}
        </Typography>
      )}
      <DashboardCard>
        <Grid container spacing={2}>
          {principles.map((principle, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                <Box display="flex" alignItems="flex-start">
                  <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                    <IconCheck size={18} color="green" />
                  </ListItemIcon>
                  <Typography variant="body2">
                    {principle}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DashboardCard>
    </>
  );
};

export default DesignProcessSection;

