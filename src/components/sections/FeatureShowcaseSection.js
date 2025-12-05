import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { IconCheck } from '@tabler/icons';

/**
 * Reusable Feature Showcase Section Component
 * Displays features in a grid layout
 */
const FeatureShowcaseSection = ({ 
  title = "Feature Showcase",
  features = {},
  showTitle = true
}) => {
  const featureEntries = typeof features === 'object' && !Array.isArray(features) 
    ? Object.entries(features)
    : Array.isArray(features)
    ? features.map((f, i) => [i, f])
    : [];

  if (featureEntries.length === 0) return null;

  return (
    <Box>
      {showTitle && (
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      )}
      <Grid container spacing={2}>
        {featureEntries.map(([key, feature]) => (
          <Grid item xs={12} md={6} key={key}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                {feature.title || feature.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {feature.description}
              </Typography>
              {feature.highlights && (
                <>
                  <Typography variant="subtitle2" fontWeight="bold" mt={1} mb={1}>
                    Highlights:
                  </Typography>
                  <List dense>
                    {feature.highlights.map((highlight, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <IconCheck size={14} color="green" />
                        </ListItemIcon>
                        <ListItemText primary={highlight} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeatureShowcaseSection;

