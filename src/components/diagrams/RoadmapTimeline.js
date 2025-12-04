import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { IconCalendar, IconCheck } from '@tabler/icons';

/**
 * Visual Roadmap Timeline Component
 * Displays project phases in a timeline format
 */
const RoadmapTimeline = ({ phases = [], title = "Product Roadmap" }) => {
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {title && (
        <Typography variant="h6" gutterBottom textAlign="center" mb={3}>
          {title}
        </Typography>
      )}
      <Box sx={{ position: 'relative' }}>
        {/* Timeline line */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 3,
            bgcolor: 'primary.main',
            transform: 'translateX(-50%)',
            zIndex: 0,
            display: { xs: 'none', md: 'block' }
          }}
        />

        {/* Phases */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {phases.map((phase, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                position: 'relative',
                flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' }
              }}
            >
              {/* Timeline dot */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                  flexShrink: 0,
                  boxShadow: 2
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {index + 1}
                </Typography>
              </Box>

              {/* Phase content */}
              <Paper
                elevation={3}
                sx={{
                  flex: 1,
                  p: 3,
                  maxWidth: { xs: '100%', md: '45%' },
                  bgcolor: index % 2 === 0 ? 'primary.light' : 'secondary.light',
                  color: index % 2 === 0 ? 'primary.contrastText' : 'secondary.contrastText'
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight="bold">
                    {phase.phase || phase.name}
                  </Typography>
                  <Chip
                    icon={<IconCalendar size={16} />}
                    label={phase.duration}
                    size="small"
                    sx={{ bgcolor: 'rgba(255,255,255,0.3)', color: 'inherit' }}
                  />
                </Box>
                <Typography variant="body2" mb={2} sx={{ opacity: 0.9 }}>
                  <strong>Focus:</strong> {phase.focus}
                </Typography>
                {phase.deliverables && (
                  <>
                    <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                      Deliverables:
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 2 }}>
                      {phase.deliverables.slice(0, 3).map((deliverable, dIndex) => (
                        <Box component="li" key={dIndex} sx={{ mb: 0.5 }}>
                          <Typography variant="body2">{deliverable}</Typography>
                        </Box>
                      ))}
                      {phase.deliverables.length > 3 && (
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          +{phase.deliverables.length - 3} more
                        </Typography>
                      )}
                    </Box>
                  </>
                )}
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RoadmapTimeline;

