import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  Chip,
  Avatar,
  Divider
} from '@mui/material';
import {
  IconUser,
  IconDeviceDesktop,
  IconInfoCircle,
  IconGridDots,
  IconTarget,
  IconMapPin
} from '@tabler/icons';

/**
 * Rich Persona Card Component
 * Displays detailed user persona information in an engaging visual format
 */
const PersonaCard = ({ persona, index = 0 }) => {
  // Generate avatar colors based on index
  const avatarColors = [
    { bg: '#001f3f', color: '#5D87FF' },
    { bg: '#5D87FF', color: '#ffffff' },
    { bg: '#13DEB9', color: '#001f3f' },
    { bg: '#FFAE1F', color: '#001f3f' }
  ];
  const avatarColor = avatarColors[index % avatarColors.length];

  // Extract initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get tech exposure level (if provided, otherwise default to medium)
  const techExposure = persona.techExposure || 'Medium';
  const techLevel = techExposure.toLowerCase() === 'high' ? 3 : techExposure.toLowerCase() === 'low' ? 1 : 2;

  return (
    <Paper
      elevation={3}
      sx={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: '400px'
      }}
    >
      {/* Left Section - Dark Blue Background */}
      <Box
        sx={{
          backgroundColor: '#001f3f',
          color: 'white',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minWidth: { md: '280px' },
          width: { xs: '100%', md: '280px' }
        }}
      >
        <Box>
          {/* Avatar */}
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: avatarColor.color,
                color: avatarColor.bg,
                fontSize: '2rem',
                fontWeight: 'bold'
              }}
            >
              {getInitials(persona.name)}
            </Avatar>
          </Box>

          {/* Name */}
          <Typography
            variant="h5"
            fontWeight={700}
            textAlign="center"
            mb={1}
            sx={{ color: 'white' }}
          >
            {persona.name}
          </Typography>

          {/* Demographics */}
          <Stack spacing={0.5} alignItems="center" mb={2}>
            {persona.age && persona.location && (
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                {persona.age}, {persona.occupation || persona.role}
              </Typography>
            )}
            {persona.location && (
              <Box display="flex" alignItems="center" gap={0.5}>
                <IconMapPin size={14} />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {persona.location}
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>

        {/* Quote */}
        {persona.quote && (
          <Box mt={2} pt={2} sx={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <Typography
              variant="caption"
              fontStyle="italic"
              sx={{ color: 'rgba(255,255,255,0.9)', display: 'block', mb: 0.5 }}
            >
              "{persona.quote}"
            </Typography>
            {persona.quoteAuthor && (
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                — {persona.quoteAuthor}
              </Typography>
            )}
          </Box>
        )}
      </Box>

      {/* Right Section - Light Background */}
      <Box
        sx={{
          flex: 1,
          p: 3,
          backgroundColor: '#F2F6FA'
        }}
      >
        <Grid container spacing={3}>
          {/* Personal Details */}
          {(persona.family || persona.income || persona.devices) && (
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                <IconUser size={20} color="#5D87FF" />
                <Typography variant="subtitle2" fontWeight={600}>
                  Personal Details
                </Typography>
              </Box>
              <Stack spacing={1}>
                {persona.family && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">Family:</Typography>
                    <Typography variant="body2">{persona.family}</Typography>
                  </Box>
                )}
                {persona.income && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">Household Income:</Typography>
                    <Typography variant="body2">{persona.income}</Typography>
                  </Box>
                )}
                {persona.devices && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">Devices:</Typography>
                    <Typography variant="body2">{persona.devices}</Typography>
                  </Box>
                )}
              </Stack>
            </Grid>
          )}

          {/* Tech Exposure */}
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1} mb={1.5}>
              <IconDeviceDesktop size={20} color="#5D87FF" />
              <Typography variant="subtitle2" fontWeight={600}>
                Tech Exposure
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Box display="flex" gap={0.5}>
                {[1, 2, 3].map((level) => (
                  <Box
                    key={level}
                    sx={{
                      width: 40,
                      height: 8,
                      borderRadius: 1,
                      backgroundColor: level <= techLevel ? '#5D87FF' : '#DFE5EF',
                      transition: 'all 0.3s'
                    }}
                  />
                ))}
              </Box>
              <Typography variant="caption" color="text.secondary" ml={1}>
                {techExposure}
              </Typography>
            </Box>
          </Grid>

          {/* About */}
          {persona.about && (
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                <IconInfoCircle size={20} color="#5D87FF" />
                <Typography variant="subtitle2" fontWeight={600}>
                  About
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {persona.about}
              </Typography>
            </Grid>
          )}

          {/* Patterns & Behaviours */}
          {persona.behaviors && persona.behaviors.length > 0 && (
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                <IconGridDots size={20} color="#5D87FF" />
                <Typography variant="subtitle2" fontWeight={600}>
                  Patterns & Behaviours
                </Typography>
              </Box>
              <Stack spacing={0.5}>
                {persona.behaviors.map((behavior, idx) => (
                  <Box key={idx} display="flex" alignItems="flex-start" gap={1}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: '#5D87FF',
                        mt: 1,
                        flexShrink: 0
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {behavior}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
          )}

          {/* Goals & Motivations */}
          {persona.goals && persona.goals.length > 0 && (
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                <IconTarget size={20} color="#5D87FF" />
                <Typography variant="subtitle2" fontWeight={600}>
                  Goals & Motivations
                </Typography>
              </Box>
              <Stack spacing={0.5}>
                {persona.goals.map((goal, idx) => (
                  <Box key={idx} display="flex" alignItems="flex-start" gap={1}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: '#13DEB9',
                        mt: 1,
                        flexShrink: 0
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {goal}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
          )}

          {/* Pain Points */}
          {persona.painPoints && persona.painPoints.length > 0 && (
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                <IconInfoCircle size={20} color="#FA896B" />
                <Typography variant="subtitle2" fontWeight={600} color="error">
                  Pain Points
                </Typography>
              </Box>
              <Stack spacing={0.5}>
                {persona.painPoints.map((pain, idx) => (
                  <Box key={idx} display="flex" alignItems="flex-start" gap={1}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: '#FA896B',
                        mt: 1,
                        flexShrink: 0
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {pain}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
};

export default PersonaCard;

