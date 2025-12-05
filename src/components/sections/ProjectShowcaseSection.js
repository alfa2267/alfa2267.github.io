import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Divider,
  ImageList,
  ImageListItem
} from '@mui/material';
import {
  IconBrandGithub,
  IconCalendar,
  IconExternalLink,
  IconPhoto,
  IconDeviceDesktop,
  IconFileText
} from '@tabler/icons';
import ScreenshotGallery from '../gallery/ScreenshotGallery.js';

/**
 * Reusable Project Showcase Section Component
 * Combines repository info, demo images, screenshots, and wireframes
 */
const ProjectShowcaseSection = ({
  title = "Project Showcase",
  showTitle = true,
  // Repository info
  repository = null, // { name, url, stars, language, updated_at, tech_stack }
  // Demo image
  demoImage = null, // { url, alt, description }
  // Screenshots
  screenshots = [],
  screenshotsTitle = "Live Application Screenshots",
  // Wireframes/Mockups
  wireframes = [],
  wireframesTitle = "Wireframes & Mockups",
  // Layout options
  showRepository = true,
  showDemoImage = true,
  showScreenshots = true,
  showWireframes = true
}) => {
  return (
    <Box>
      {showTitle && (
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      )}

      <Grid container spacing={3}>
        {/* Repository Info - Left Column */}
        {showRepository && repository && (
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Box display="flex" alignItems="center" mb={3}>
                <IconBrandGithub size={24} />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  {repository.name || repository.full_name}
                </Typography>
              </Box>

              <Grid container spacing={2} mb={3}>
                {repository.stars !== undefined && (
                  <Grid item xs={6}>
                    <Box textAlign="center">
                      <Typography variant="h4">
                        {repository.stars || repository.stargazers_count || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Stars
                      </Typography>
                    </Box>
                  </Grid>
                )}
                {repository.language && (
                  <Grid item xs={6}>
                    <Box textAlign="center">
                      <Typography variant="h4">
                        {repository.language}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Language
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>

              {repository.updated_at && (
                <Box mb={3}>
                  <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                    <IconCalendar size={16} />
                    <Box component="span" ml={1}>
                      Updated: {new Date(repository.updated_at).toLocaleDateString()}
                    </Box>
                  </Typography>
                </Box>
              )}

              {repository.tech_stack && repository.tech_stack.length > 0 && (
                <Box mb={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    Technology Stack
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {repository.tech_stack.map((tech, index) => (
                      <Chip key={index} label={tech} size="small" />
                    ))}
                  </Box>
                </Box>
              )}

              {repository.url && (
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<IconBrandGithub size={16} />}
                  href={repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mt: 2 }}
                >
                  View Repository
                </Button>
              )}
            </Paper>
          </Grid>
        )}

        {/* Demo Image - Right Column (or full width if no repo) */}
        {showDemoImage && demoImage && (
          <Grid item xs={12} md={showRepository && repository ? 8 : 12}>
            <Paper elevation={2} sx={{ overflow: 'hidden' }}>
              <Box
                component="img"
                src={demoImage.url}
                alt={demoImage.alt || 'Project Demo'}
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const placeholder = e.target.parentNode;
                  placeholder.innerHTML = `
                    <div style="padding: 4rem; text-align: center; color: #666; min-height: 300px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-bottom: 16px;">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5" stroke-width="2"/>
                        <path d="M21 15l-5-5L5 21" stroke-width="2"/>
                      </svg>
                      <p style="margin-top: 8px; font-size: 14px;">${demoImage.alt || 'Demo image not available'}</p>
                    </div>
                  `;
                }}
              />
              {demoImage.description && (
                <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                  <Typography variant="body2" color="text.secondary">
                    {demoImage.description}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Screenshots Section */}
      {showScreenshots && screenshots.length > 0 && (
        <Box mt={4}>
          <ScreenshotGallery
            title={screenshotsTitle}
            screenshots={screenshots}
          />
        </Box>
      )}

      {/* Wireframes & Mockups Section */}
      {showWireframes && wireframes.length > 0 && (
        <>
          {(showScreenshots && screenshots.length > 0) && <Divider sx={{ my: 4 }} />}
          <Typography variant="h6" gutterBottom>
            {wireframesTitle}
          </Typography>
          <Grid container spacing={2}>
            {wireframes.map((wireframe, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {wireframe.title}
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: 300,
                      bgcolor: 'grey.100',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 1,
                      mb: 2
                    }}
                  >
                    {wireframe.icon === 'desktop' ? (
                      <IconDeviceDesktop size={48} style={{ color: '#999', marginBottom: 8 }} />
                    ) : (
                      <IconFileText size={48} style={{ color: '#999', marginBottom: 8 }} />
                    )}
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      {wireframe.description || wireframe.title}
                    </Typography>
                  </Box>
                  {wireframe.url && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<IconExternalLink size={16} />}
                      href={wireframe.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                    >
                      View {wireframe.type || 'Wireframe'}
                    </Button>
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

export default ProjectShowcaseSection;

