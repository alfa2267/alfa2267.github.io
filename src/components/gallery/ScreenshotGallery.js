import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  ImageList,
  ImageListItem
} from '@mui/material';
import { IconX, IconPhoto } from '@tabler/icons';

/**
 * Screenshot Gallery Component
 * Displays screenshots with lightbox functionality
 */
const ScreenshotGallery = ({ screenshots = [], title = "Screenshots" }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  if (screenshots.length === 0) {
    return (
      <Box sx={{ width: '100%', p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Paper
          elevation={1}
          sx={{
            p: 4,
            textAlign: 'center',
            bgcolor: 'grey.100',
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IconPhoto size={48} style={{ color: '#999', marginBottom: 16 }} />
          <Typography variant="body2" color="text.secondary">
            Screenshots coming soon
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <ImageList cols={screenshots.length > 2 ? 3 : screenshots.length} gap={8}>
        {screenshots.map((screenshot, index) => (
          <ImageListItem key={index}>
            <Paper
              elevation={2}
              sx={{
                cursor: 'pointer',
                overflow: 'hidden',
                '&:hover': {
                  boxShadow: 4,
                  transform: 'scale(1.02)',
                  transition: 'all 0.3s ease'
                }
              }}
              onClick={() => handleImageClick(screenshot)}
            >
              {screenshot.url ? (
                <Box
                  component="img"
                  src={screenshot.url}
                  alt={screenshot.title || screenshot.alt || `Screenshot ${index + 1}`}
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
                        <p style="margin-top: 8px; font-size: 14px;">${screenshot.title || 'Image not available'}</p>
                      </div>
                    `;
                  }}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
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
                    p: 3
                  }}
                >
                  <IconPhoto size={48} style={{ color: '#999', marginBottom: 8 }} />
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    {screenshot.title || 'Screenshot placeholder'}
                  </Typography>
                  {screenshot.description && (
                    <Typography variant="caption" color="text.secondary" textAlign="center" mt={1}>
                      {screenshot.description}
                    </Typography>
                  )}
                </Box>
              )}
              {screenshot.title && (
                <Box sx={{ p: 1, bgcolor: 'rgba(0,0,0,0.7)', color: 'white' }}>
                  <Typography variant="caption">{screenshot.title}</Typography>
                </Box>
              )}
            </Paper>
          </ImageListItem>
        ))}
      </ImageList>

      {/* Lightbox Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'rgba(0,0,0,0.9)',
            color: 'white'
          }
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              zIndex: 1
            }}
          >
            <IconX />
          </IconButton>
          {selectedImage && (
            <Box
              component="img"
              src={selectedImage.url || selectedImage}
              alt={selectedImage.title || selectedImage.alt || 'Screenshot'}
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          )}
          {selectedImage && selectedImage.title && (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">{selectedImage.title}</Typography>
              {selectedImage.description && (
                <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                  {selectedImage.description}
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ScreenshotGallery;

