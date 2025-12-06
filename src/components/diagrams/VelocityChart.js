import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { IconTrendingUp } from '@tabler/icons-react';

/**
 * Velocity Chart Component
 * Displays sprint velocity trend and burn down visualization
 */
const VelocityChart = ({ velocityHistory = [], burnDownData = [] }) => {
  if (velocityHistory.length === 0) return null;

  const maxVelocity = Math.max(...velocityHistory.map(s => Math.max(s.committed || 0, s.completed || 0)));
  const avgVelocity = velocityHistory.length > 0
    ? Math.round(velocityHistory.reduce((sum, s) => sum + (s.completed || 0), 0) / velocityHistory.length)
    : 0;

  // Calculate burn down if we have daily data, otherwise use sprint data
  const hasBurnDown = burnDownData && burnDownData.length > 0;
  const chartHeight = 200;

  return (
    <Paper elevation={1} sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight="bold">
          Velocity Trend
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Box>
            <Typography variant="caption" color="text.secondary">Avg Velocity</Typography>
            <Typography variant="h6" color="primary" fontWeight="bold">
              {avgVelocity} pts
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Velocity Chart */}
      <Box sx={{ position: 'relative', height: chartHeight, mb: 2 }}>
        {/* Y-axis labels */}
        <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pr: 1 }}>
          <Typography variant="caption" textAlign="right">{maxVelocity}</Typography>
          <Typography variant="caption" textAlign="right">{Math.round(maxVelocity / 2)}</Typography>
          <Typography variant="caption" textAlign="right">0</Typography>
        </Box>

        {/* Chart area */}
        <Box sx={{ ml: 5, position: 'relative', height: '100%' }}>
          {/* Grid lines */}
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            {[0, 0.5, 1].map((ratio) => (
              <Box
                key={ratio}
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: `${ratio * 100}%`,
                  height: '1px',
                  bgcolor: 'divider',
                  opacity: 0.3
                }}
              />
            ))}
          </Box>

          {/* Velocity bars */}
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: '100%', position: 'relative', zIndex: 1 }}>
            {velocityHistory.map((sprint, index) => {
              const committedHeight = ((sprint.committed || 0) / maxVelocity) * 100;
              const completedHeight = ((sprint.completed || 0) / maxVelocity) * 100;
              
              return (
                <Box key={index} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                    {/* Committed bar (background) */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: '10%',
                        right: '10%',
                        height: `${committedHeight}%`,
                        bgcolor: 'grey.300',
                        borderRadius: '4px 4px 0 0',
                        opacity: 0.3
                      }}
                    />
                    {/* Completed bar */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: '10%',
                        right: '10%',
                        height: `${completedHeight}%`,
                        bgcolor: completedHeight >= (avgVelocity / maxVelocity * 100) ? 'success.main' : 'warning.main',
                        borderRadius: '4px 4px 0 0',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </Box>
                  {/* Sprint label */}
                  <Box sx={{ mt: 1, textAlign: 'center' }}>
                    <Typography variant="caption" display="block" fontWeight={600}>
                      {sprint.completed || 0}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                      {sprint.name?.split(' ')[0] || `S${index + 1}`}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* Legend */}
      <Box display="flex" gap={3} justifyContent="center" mt={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{ width: 16, height: 16, bgcolor: 'success.main', borderRadius: 1 }} />
          <Typography variant="caption">Completed</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{ width: 16, height: 16, bgcolor: 'grey.300', borderRadius: 1 }} />
          <Typography variant="caption">Committed</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <IconTrendingUp size={16} color="#5D87FF" />
          <Typography variant="caption">Avg: {avgVelocity} pts</Typography>
        </Box>
      </Box>

      {/* Burn Down Chart (if data available) */}
      {hasBurnDown && (
        <Box mt={4} pt={3} borderTop="1px solid" borderColor="divider">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Burn Down Chart
          </Typography>
          <Box sx={{ position: 'relative', height: chartHeight, mt: 2 }}>
            {/* Similar implementation for burn down */}
            <Typography variant="body2" color="text.secondary">
              Daily burn down data visualization would go here
            </Typography>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default VelocityChart;

