import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  IconButton,
  Card,
  CardMedia
} from '@mui/material';
import {
  IconBrandGithub,
  IconExternalLink,
  IconCheck,
  IconDeviceDesktop,
  IconFileText,
  IconChevronDown,
  IconPhoto,
  IconLayoutGrid,
  IconList,
  IconPlayerPlay,
  IconChevronLeft,
  IconChevronRight
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
  screenshotsTitle = "",
  screenshotsView = "gallery", // "gallery" or "accordion"
  // Wireframes/Mockups
  wireframes = [],
  wireframesTitle = "Wireframes & Mockups",
  // Layout options
  showRepository = true,
  showDemoImage = true,
  showScreenshots = true,
  showWireframes = true
}) => {
  // Combine all items: demo, screenshots, wireframes
  const allItems = [
    // Add demo image first if available
    ...(showDemoImage && demoImage ? [{
      url: demoImage.url,
      title: demoImage.alt || 'Project Demo',
      description: demoImage.description,
      type: 'demo',
      link: null
    }] : []),
    // Add screenshots
    ...screenshots,
    // Add wireframes/mockups
    ...(showWireframes && wireframes.length > 0 ? wireframes.map(wireframe => ({
      url: wireframe.url || null,
      title: wireframe.title,
      description: wireframe.description,
      type: wireframe.type || 'wireframe',
      icon: wireframe.icon,
      link: wireframe.url || null
    })) : [])
  ];

  const [viewMode, setViewMode] = React.useState(screenshotsView);
  const [slideshowIndex, setSlideshowIndex] = React.useState(0);
  const [slideshowPlaying, setSlideshowPlaying] = React.useState(false);

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setViewMode(newView);
      if (newView === 'slideshow') {
        setSlideshowIndex(0);
        setSlideshowPlaying(true);
      } else {
        setSlideshowPlaying(false);
      }
    }
  };

  // Slideshow navigation
  const nextSlide = () => {
    setSlideshowIndex((prev) => (prev + 1) % allItems.length);
  };

  const prevSlide = () => {
    setSlideshowIndex((prev) => (prev - 1 + allItems.length) % allItems.length);
  };

  // Auto-advance slideshow
  React.useEffect(() => {
    if (slideshowPlaying && viewMode === 'slideshow' && allItems.length > 1) {
      const interval = setInterval(() => {
        setSlideshowIndex((prev) => (prev + 1) % allItems.length);
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [slideshowPlaying, viewMode, allItems.length]);

  return (
    <Box>
      {showTitle && (
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      )}

      <Grid container spacing={3}>
        {/* Repository Info - Left Column (or full width if no visual content) */}
        {showRepository && repository && (
          <Grid item xs={12} md={(!showDemoImage || !demoImage) && (!showScreenshots || screenshots.length === 0) && (!showWireframes || wireframes.length === 0) ? 12 : 4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Box display="flex" alignItems="center" mb={3}>
                <IconBrandGithub size={24} />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  {repository.name || repository.full_name}
                </Typography>
              </Box>

              {repository.language && (
                <Box mb={3}>
                  <Box textAlign="center">
                    <Typography variant="h4">
                      {repository.language}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Language
                    </Typography>
                  </Box>
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

              {repository.features && repository.features.length > 0 && (
                <Box mb={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    Key Features
                  </Typography>
                  <List dense>
                    {repository.features.map((feature, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <IconCheck size={16} color="green" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
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

        {/* Demo Image & Screenshots Combined - Right Column (or full width if no repo) */}
        {(showDemoImage && demoImage) || (showScreenshots && screenshots.length > 0) || (showWireframes && wireframes.length > 0) ? (
          <Grid item xs={12} md={showRepository && repository ? 8 : 12}>
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                {screenshotsTitle && (
                  <Typography variant="h6">
                    {screenshotsTitle}
                  </Typography>
                )}
                {!screenshotsTitle && <Box />}
                {allItems.length > 0 && (
                  <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={handleViewChange}
                    size="small"
                    aria-label="view mode"
                  >
                    <ToggleButton value="gallery" aria-label="gallery view">
                      <Tooltip title="Gallery View">
                        <IconLayoutGrid size={18} />
                      </Tooltip>
                    </ToggleButton>
                    <ToggleButton value="accordion" aria-label="accordion view">
                      <Tooltip title="List View">
                        <IconList size={18} />
                      </Tooltip>
                    </ToggleButton>
                    <ToggleButton value="slideshow" aria-label="slideshow view">
                      <Tooltip title="Slideshow View">
                        <IconPlayerPlay size={18} />
                      </Tooltip>
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              </Box>
              
              {/* Combine demo image, screenshots, and wireframes */}
              {viewMode === "slideshow" ? (
                /* Slideshow View */
                <Box>
                  {allItems.length > 0 && (
                    <Card elevation={3} sx={{ position: 'relative', mb: 2, overflow: 'hidden' }}>
                      <Box sx={{ 
                        position: 'relative', 
                        width: '100%', 
                        bgcolor: 'black',
                        minHeight: '500px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {allItems[slideshowIndex].url ? (
                          <CardMedia
                            component="img"
                            image={allItems[slideshowIndex].url}
                            alt={allItems[slideshowIndex].title || `Slide ${slideshowIndex + 1}`}
                            sx={{
                              width: '100%',
                              height: 'auto',
                              maxHeight: '70vh',
                              minHeight: '400px',
                              objectFit: 'contain',
                              display: 'block'
                            }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: '100%',
                              minHeight: 400,
                              bgcolor: 'grey.900',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              p: 4
                            }}
                          >
                            {allItems[slideshowIndex].icon === 'desktop' ? (
                              <IconDeviceDesktop size={64} style={{ color: '#999', marginBottom: 16 }} />
                            ) : allItems[slideshowIndex].icon === 'document' ? (
                              <IconFileText size={64} style={{ color: '#999', marginBottom: 16 }} />
                            ) : (
                              <IconPhoto size={64} style={{ color: '#999', marginBottom: 16 }} />
                            )}
                            <Typography variant="h6" color="white" textAlign="center">
                              {allItems[slideshowIndex].title || 'Placeholder'}
                            </Typography>
                            {allItems[slideshowIndex].description && (
                              <Typography variant="body2" color="grey.400" textAlign="center" mt={1}>
                                {allItems[slideshowIndex].description}
                  </Typography>
                            )}
                </Box>
              )}
                        
                        {/* Navigation Arrows */}
                        {allItems.length > 1 && (
                          <>
                            <IconButton
                              onClick={prevSlide}
                              sx={{
                                position: 'absolute',
                                left: 8,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                bgcolor: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                '&:hover': {
                                  bgcolor: 'rgba(0,0,0,0.7)'
                                }
                              }}
                              aria-label="Previous slide"
                            >
                              <IconChevronLeft size={24} />
                            </IconButton>
                            <IconButton
                              onClick={nextSlide}
                              sx={{
                                position: 'absolute',
                                right: 8,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                bgcolor: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                '&:hover': {
                                  bgcolor: 'rgba(0,0,0,0.7)'
                                }
                              }}
                              aria-label="Next slide"
                            >
                              <IconChevronRight size={24} />
                            </IconButton>
                          </>
                        )}
                      </Box>
                      
                      {/* Slide Info */}
                      <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography variant="h6" fontWeight={600}>
                              {allItems[slideshowIndex].title || `Slide ${slideshowIndex + 1}`}
                            </Typography>
                            {allItems[slideshowIndex].description && (
                              <Typography variant="body2" color="text.secondary" mt={0.5}>
                                {allItems[slideshowIndex].description}
                              </Typography>
                            )}
                          </Box>
                          {(allItems[slideshowIndex].link || allItems[slideshowIndex].url) && (
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<IconExternalLink size={16} />}
                              href={allItems[slideshowIndex].link || allItems[slideshowIndex].url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {allItems[slideshowIndex].type === 'wireframe' || allItems[slideshowIndex].type === 'mockup' 
                                ? `View ${allItems[slideshowIndex].type}` 
                                : 'View Live'}
                            </Button>
                          )}
                        </Box>
                        
                        {/* Slide Indicators */}
                        {allItems.length > 1 && (
                          <Box display="flex" justifyContent="center" gap={1} mt={2}>
                            {allItems.map((_, index) => (
                              <Box
                                key={index}
                                onClick={() => setSlideshowIndex(index)}
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  bgcolor: index === slideshowIndex ? 'primary.main' : 'grey.300',
                                  cursor: 'pointer',
                                  transition: 'background-color 0.2s',
                                  '&:hover': {
                                    bgcolor: index === slideshowIndex ? 'primary.dark' : 'grey.400'
                                  }
                                }}
                                aria-label={`Go to slide ${index + 1}`}
                              />
                            ))}
                          </Box>
                        )}
                        
                        {/* Slide Counter */}
                        {allItems.length > 1 && (
                          <Typography variant="caption" color="text.secondary" textAlign="center" display="block" mt={1}>
                            {slideshowIndex + 1} / {allItems.length}
          </Typography>
                        )}
                      </Box>
                    </Card>
                  )}
                </Box>
              ) : viewMode === "accordion" ? (
            <Box>
              {/* Combine all items: demo, screenshots, wireframes */}
              {allItems.map((item, index) => (
                <Accordion key={index} defaultExpanded={index === 0}>
                  <AccordionSummary expandIcon={<IconChevronDown />}>
                    <Box display="flex" alignItems="center" gap={2} width="100%">
                      {item.url ? (
                        <Box
                          component="img"
                          src={item.url}
                          alt={item.title || `Item ${index + 1}`}
                          sx={{
                            width: 120,
                            height: 80,
                            objectFit: 'cover',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: 120,
                            height: 80,
                            bgcolor: 'grey.100',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 1
                          }}
                        >
                          {item.icon === 'desktop' ? (
                            <IconDeviceDesktop size={32} style={{ color: '#999' }} />
                          ) : item.icon === 'document' ? (
                            <IconFileText size={32} style={{ color: '#999' }} />
                          ) : (
                          <IconPhoto size={32} style={{ color: '#999' }} />
                          )}
                        </Box>
                      )}
                      <Box flex={1}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.title || `Item ${index + 1}`}
                        </Typography>
                        {item.description && (
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box>
                      {item.url ? (
                        <Box
                          component="img"
                          src={item.url}
                          alt={item.title || `Item ${index + 1}`}
                          sx={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 1,
                            mb: 2
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const placeholder = e.target.parentNode;
                            placeholder.innerHTML = `
                              <div style="padding: 2rem; text-align: center; color: #666; min-height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-bottom: 8px;">
                                  <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/>
                                  <circle cx="8.5" cy="8.5" r="1.5" stroke-width="2"/>
                                  <path d="M21 15l-5-5L5 21" stroke-width="2"/>
                                </svg>
                                <p style="margin-top: 8px; font-size: 14px;">${item.title || 'Image not available'}</p>
                              </div>
                            `;
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: '100%',
                            minHeight: 200,
                            bgcolor: 'grey.100',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 1,
                            p: 3
                          }}
                        >
                          {item.icon === 'desktop' ? (
                            <IconDeviceDesktop size={48} style={{ color: '#999', marginBottom: 8 }} />
                          ) : item.icon === 'document' ? (
                            <IconFileText size={48} style={{ color: '#999', marginBottom: 8 }} />
                          ) : (
                          <IconPhoto size={48} style={{ color: '#999', marginBottom: 8 }} />
                          )}
                          <Typography variant="body2" color="text.secondary" textAlign="center">
                            {item.title || 'Placeholder'}
                          </Typography>
                        </Box>
                      )}
                      {(item.link || (item.url && (item.type === 'wireframe' || item.type === 'mockup'))) && (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<IconExternalLink size={16} />}
                          href={item.link || item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ mt: 1 }}
                        >
                          {item.type === 'wireframe' || item.type === 'mockup' ? `View ${item.type}` : 'View Live'}
                        </Button>
                      )}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ) : (
            <ScreenshotGallery
              title=""
              screenshots={allItems}
            />
          )}
        </Box>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
};

export default ProjectShowcaseSection;

