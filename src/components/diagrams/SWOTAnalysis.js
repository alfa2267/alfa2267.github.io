import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

/**
 * SWOT Analysis Component
 * Displays Strengths, Weaknesses, Opportunities, Threats in a 2x2 grid
 */
const SWOTAnalysis = ({ swot = {} }) => {
  const { strengths = [], weaknesses = [], opportunities = [], threats = [] } = swot;

  // If no SWOT data provided, show placeholder
  if (!strengths.length && !weaknesses.length && !opportunities.length && !threats.length) {
    return (
      <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="body2">SWOT analysis data not available</Typography>
      </Box>
    );
  }

  const swotSections = [
    { title: 'Strengths', items: strengths, color: '#2e7d32', bgColor: '#e8f5e9' },
    { title: 'Weaknesses', items: weaknesses, color: '#d32f2f', bgColor: '#ffebee' },
    { title: 'Opportunities', items: opportunities, color: '#1976d2', bgColor: '#e3f2fd' },
    { title: 'Threats', items: threats, color: '#ed6c02', bgColor: '#fff3e0' }
  ];

  return (
    <Grid container spacing={1} sx={{ height: '100%' }}>
      {swotSections.map((section, index) => (
        <Grid item xs={6} key={index}>
          <Paper
            elevation={1}
            sx={{
              p: 1.5,
              height: '100%',
              borderLeft: `4px solid ${section.color}`,
              bgcolor: section.bgColor
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              gutterBottom
              sx={{ color: section.color, mb: 1 }}
            >
              {section.title}
            </Typography>
            {section.items.length > 0 ? (
              <Box component="ul" sx={{ m: 0, pl: 2, listStyle: 'none' }}>
                {section.items.map((item, idx) => (
                  <Box
                    key={idx}
                    component="li"
                    sx={{
                      mb: 0.75,
                      fontSize: '0.875rem',
                      '&::before': {
                        content: '"•"',
                        color: section.color,
                        fontWeight: 'bold',
                        display: 'inline-block',
                        width: '1em',
                        marginLeft: '-1em'
                      }
                    }}
                  >
                    {item}
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                No items listed
              </Typography>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default SWOTAnalysis;

