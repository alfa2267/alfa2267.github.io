import React from 'react';
import { Box, Typography, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Chip } from '@mui/material';
import { IconAlertTriangle, IconTarget, IconUsers, IconTrendingUp } from '@tabler/icons-react';
import DashboardCard from '../shared/DashboardCard';

/**
 * ProblemDiscoverySection - Reusable component for showing problem discovery + problem statement
 *
 * Combines:
 * - Problem Statement (What problem are we solving?)
 * - Impact (Who is affected and how?)
 * - Solution Overview (How are we solving it?)
 * - Success Criteria (How will we know it's working?)
 *
 * Essential for every project page to show product thinking
 */
const ProblemDiscoverySection = ({
  title = "Problem Discovery & Solution",
  problemStatement = {},
  solutionOverview = {},
  successCriteria = [],
  showMetrics = true
}) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom mb={3} sx={{ color: '#001f3f' }}>
        {title}
      </Typography>
      <DashboardCard>
      <Grid container spacing={3}>
        {/* Problem Statement */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="error">
            Problem Statement
          </Typography>

          {problemStatement.description && (
            <Typography variant="body1" paragraph color="text.primary">
              {problemStatement.description}
            </Typography>
          )}

          {problemStatement.challenges && problemStatement.challenges.length > 0 && (
            <>
              <Typography variant="body2" fontWeight={600} gutterBottom sx={{ mt: 2 }}>
                Key Challenges:
              </Typography>
              <List dense>
                {problemStatement.challenges.map((challenge, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <IconAlertTriangle size={16} color="#FA896B" />
                    </ListItemIcon>
                    <ListItemText
                      primary={challenge}
                      primaryTypographyProps={{ variant: 'body2', color: 'text.primary' }}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}

          {problemStatement.impact && problemStatement.impact.length > 0 && (
            <>
              <Typography variant="body2" fontWeight={600} gutterBottom sx={{ mt: 2 }}>
                Impact:
              </Typography>
              <List dense>
                {problemStatement.impact.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <IconAlertTriangle size={16} color="#FFAE1F" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ variant: 'body2', color: 'text.primary' }}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}

          {problemStatement.userPainPoints && problemStatement.userPainPoints.length > 0 && (
            <>
              <Typography variant="body2" fontWeight={600} gutterBottom sx={{ mt: 2 }}>
                User Pain Points:
              </Typography>
              <List dense>
                {problemStatement.userPainPoints.map((pain, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <IconUsers size={16} color="#FA896B" />
                    </ListItemIcon>
                    <ListItemText
                      primary={pain}
                      primaryTypographyProps={{ variant: 'body2', color: 'text.primary' }}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Grid>

        {/* Solution Overview */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="success.main">
            Solution Overview
          </Typography>

          {solutionOverview.description && (
            <Typography variant="body1" paragraph color="text.primary">
              {solutionOverview.description}
            </Typography>
          )}

          {solutionOverview.approach && solutionOverview.approach.length > 0 && (
            <>
              <Typography variant="body2" fontWeight={600} gutterBottom sx={{ mt: 2 }}>
                Our Approach:
              </Typography>
              <List dense>
                {solutionOverview.approach.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <IconTarget size={16} color="#13DEB9" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ variant: 'body2', color: 'text.primary' }}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}

          {solutionOverview.keyFeatures && solutionOverview.keyFeatures.length > 0 && (
            <>
              <Typography variant="body2" fontWeight={600} gutterBottom sx={{ mt: 2 }}>
                Key Features:
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {solutionOverview.keyFeatures.map((feature, index) => (
                  <Chip
                    key={index}
                    label={feature}
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                ))}
              </Box>
            </>
          )}

          {solutionOverview.valueProposition && (
            <Paper
              elevation={0}
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: '#E6FFFA',
                borderLeft: '4px solid #13DEB9'
              }}
            >
              <Typography variant="body2" fontWeight={600} gutterBottom>
                Value Proposition
              </Typography>
              <Typography variant="body2" color="text.primary">
                {solutionOverview.valueProposition}
              </Typography>
            </Paper>
          )}
        </Grid>

        {/* Success Criteria / Metrics */}
        {showMetrics && successCriteria && successCriteria.length > 0 && (
          <Grid item xs={12}>
            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: '#ECF2FF',
                borderRadius: 1
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Success Criteria & Metrics
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {successCriteria.map((criteria, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                      <IconTrendingUp size={24} color="#5D87FF" style={{ marginBottom: 8 }} />
                      <Typography variant="h6" color="primary" fontWeight={700}>
                        {criteria.value}
                      </Typography>
                      <Typography variant="caption" color="text.primary" fontWeight={500}>
                        {criteria.label}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        )}
      </Grid>
      </DashboardCard>
    </Box>
  );
};

export default ProblemDiscoverySection;
