import React from 'react';
import { Box, Typography, Grid, Chip, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { IconCheck } from '@tabler/icons-react';
import DashboardCard from '../shared/DashboardCard';
import SystemArchitecture from '../diagrams/SystemArchitecture';

/**
 * TechnicalArchitectureSection - Reusable component for showing technical architecture
 *
 * Demonstrates:
 * - Technical fluency
 * - Architectural decision-making
 * - DevOps/Infrastructure knowledge
 * - System design thinking
 */
const TechnicalArchitectureSection = ({
  title = "Technical Architecture",
  overview = "",
  architecture = null, // { components: [...] } for SystemArchitecture diagram
  technologyStack = {}, // { frontend: [...], backend: [...], infrastructure: [...], etc. }
  keyDecisions = [],
  showDiagram = true
}) => {
  return (
    <DashboardCard title={title}>
      <Box>
        {/* Overview */}
        {overview && (
          <Typography variant="body1" paragraph>
            {overview}
          </Typography>
        )}

        {/* System Architecture Diagram */}
        {showDiagram && architecture && architecture.components && (
          <Box mb={4}>
            <SystemArchitecture
              title={architecture.title || "System Architecture Overview"}
              components={architecture.components}
            />
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Technology Stack */}
        {technologyStack && Object.keys(technologyStack).length > 0 && (
          <>
            <Grid container spacing={3} mb={3}>
              {Object.entries(technologyStack).map(([category, techs]) => (
                <Grid item xs={12} md={6} key={category}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {techs.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        size="small"
                        sx={{ backgroundColor: '#f5f5f5' }}
                      />
                    ))}
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 3 }} />
          </>
        )}

        {/* Key Architecture Decisions */}
        {keyDecisions && keyDecisions.length > 0 && (
          <>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Key Architecture Decisions
            </Typography>
            <List>
              {keyDecisions.map((decision, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <IconCheck size={20} color="#1976d2" />
                  </ListItemIcon>
                  <ListItemText primary={decision} />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
    </DashboardCard>
  );
};

export default TechnicalArchitectureSection;
