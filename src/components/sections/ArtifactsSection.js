import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper
} from '@mui/material';
import { IconFileText, IconExternalLink } from '@tabler/icons';

/**
 * Reusable Artifacts Section Component
 * Displays project artifacts in a grid layout
 */
const ArtifactsSection = ({ 
  title = "Artifacts",
  artifacts = [],
  showTitle = true
}) => {
  if (artifacts.length === 0) return null;

  return (
    <Box>
      {showTitle && (
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      )}
      <Grid container spacing={2}>
        {artifacts.map((artifact, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <Box display="flex" alignItems="center" mb={1}>
                {artifact.type === 'demo' ? (
                  <IconExternalLink size={24} style={{ marginRight: 8 }} />
                ) : (
                  <IconFileText size={24} style={{ marginRight: 8 }} />
                )}
                <Typography variant="subtitle1" fontWeight="bold">
                  {artifact.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                {artifact.description}
              </Typography>
              {artifact.preview && (
                <Typography variant="caption" color="text.secondary">
                  {artifact.preview}
                </Typography>
              )}
              {artifact.url && (
                <Box mt={1}>
                  <a 
                    href={artifact.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      textDecoration: 'none',
                      color: 'inherit',
                      fontSize: '0.875rem'
                    }}
                  >
                    View {artifact.type === 'demo' ? 'Live Demo' : 'Document'} →
                  </a>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ArtifactsSection;

