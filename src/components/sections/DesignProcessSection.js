import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  IconCheck,
  IconPalette,
  IconRoute
} from '@tabler/icons';
import DashboardCard from '../shared/DashboardCard';

/**
 * Design Process Section Component
 * Displays design principles and user flows for a project
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

  const { principles = [], userFlows = [] } = designProcess;

  // Return null if both are empty
  if (principles.length === 0 && userFlows.length === 0) {
    return null;
  }

  return (
    <DashboardCard title={showTitle ? title : null}>
      <Box>
        {principles.length > 0 && (
          <>
            <Box display="flex" alignItems="center" mb={2}>
              <IconPalette size={24} color="#1976d2" style={{ marginRight: 8 }} />
              <Typography variant="h6" fontWeight={600}>
                Design Principles
              </Typography>
            </Box>
            <Grid container spacing={2} mb={principles.length > 0 && userFlows.length > 0 ? 3 : 0}>
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
          </>
        )}

        {principles.length > 0 && userFlows.length > 0 && (
          <Divider sx={{ my: 3 }} />
        )}

        {userFlows.length > 0 && (
          <>
            <Box display="flex" alignItems="center" mb={2}>
              <IconRoute size={24} color="#1976d2" style={{ marginRight: 8 }} />
              <Typography variant="h6" fontWeight={600}>
                User Flows
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {userFlows.map((flow, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                    <Box display="flex" alignItems="flex-start">
                      <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                        <IconRoute size={18} color="#1976d2" />
                      </ListItemIcon>
                      <Typography variant="body2">
                        {flow}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </DashboardCard>
  );
};

export default DesignProcessSection;

