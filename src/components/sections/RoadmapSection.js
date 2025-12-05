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
  Chip,
  Divider
} from '@mui/material';
import { IconCheck, IconCalendar } from '@tabler/icons';
import RoadmapTimeline from '../diagrams/RoadmapTimeline.js';

/**
 * Reusable Roadmap Section Component
 * Combines visual timeline with detailed phase breakdown
 */
const RoadmapSection = ({ 
  title = "Product Roadmap",
  phases = [],
  showTimeline = true,
  showDetailedBreakdown = true,
  timelineTitle = "Implementation Timeline",
  breakdownTitle = "Detailed Phase Breakdown",
  columnsPerRow = 2
}) => {
  if (phases.length === 0) return null;

  return (
    <Box>
      {title && (
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      )}

      {/* Visual Timeline */}
      {showTimeline && (
        <Box mb={4}>
          <RoadmapTimeline
            title={timelineTitle}
            phases={phases}
          />
        </Box>
      )}

      {/* Detailed Phase Breakdown */}
      {showDetailedBreakdown && (
        <>
          {showTimeline && <Divider sx={{ my: 3 }} />}
          <Typography variant="h6" gutterBottom>
            {breakdownTitle}
          </Typography>
          <Grid container spacing={2}>
            {phases.map((phase, index) => (
              <Grid item xs={12} md={12 / columnsPerRow} key={index}>
                <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">{phase.phase || phase.name}</Typography>
                    <Chip 
                      label={phase.duration} 
                      color="primary" 
                      size="small"
                      icon={<IconCalendar size={16} />}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Focus:</strong> {phase.focus}
                  </Typography>
                  {phase.deliverables && phase.deliverables.length > 0 && (
                    <>
                      <Typography variant="subtitle2" fontWeight="bold" mt={2} mb={1}>
                        Deliverables:
                      </Typography>
                      <List dense>
                        {phase.deliverables.map((deliverable, dIndex) => (
                          <ListItem key={dIndex} disablePadding>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <IconCheck size={16} color="green" />
                            </ListItemIcon>
                            <ListItemText primary={deliverable} />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                  {phase.keyMetrics && phase.keyMetrics.length > 0 && (
                    <>
                      <Typography variant="subtitle2" fontWeight="bold" mt={2} mb={1}>
                        Key Metrics:
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {phase.keyMetrics.map((metric, mIndex) => (
                          <Chip key={mIndex} label={metric} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default RoadmapSection;

