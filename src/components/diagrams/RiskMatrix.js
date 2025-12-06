import React from 'react';
import { Box, Typography, Paper, Tooltip } from '@mui/material';

/**
 * Risk Matrix Component
 * Displays risks on a probability vs impact matrix
 */
const RiskMatrix = ({ risks = [] }) => {
  if (!risks || risks.length === 0) return null;

  // Map probability and impact to numeric values for positioning
  const getProbabilityValue = (prob) => {
    const map = { 'Low': 1, 'Medium': 2, 'High': 3 };
    return map[prob] || 1;
  };

  const getImpactValue = (impact) => {
    const map = { 'Low': 1, 'Medium': 2, 'High': 3 };
    return map[impact] || 1;
  };

  const getRiskColor = (prob, impact) => {
    const probVal = getProbabilityValue(prob);
    const impactVal = getImpactValue(impact);
    const riskLevel = probVal * impactVal;
    
    if (riskLevel >= 7) return '#d32f2f'; // High risk - red
    if (riskLevel >= 4) return '#ed6c02'; // Medium risk - orange
    return '#2e7d32'; // Low risk - green
  };

  const matrixSize = 3; // 3x3 matrix (Low, Medium, High)
  const cellSize = 80;

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box sx={{ position: 'relative', width: cellSize * matrixSize + 100, height: cellSize * matrixSize + 100, mx: 'auto' }}>
        {/* Y-axis label (Impact) */}
        <Box sx={{ 
          position: 'absolute', 
          left: -40, 
          top: '50%', 
          transform: 'translateY(-50%) rotate(-90deg)',
          fontSize: '0.875rem',
          fontWeight: 600
        }}>
          Impact
        </Box>

        {/* X-axis label (Probability) */}
        <Box sx={{ 
          position: 'absolute', 
          bottom: -30, 
          left: '50%', 
          transform: 'translateX(-50%)',
          fontSize: '0.875rem',
          fontWeight: 600
        }}>
          Probability
        </Box>

        {/* Matrix grid */}
        <Box sx={{ position: 'relative', ml: 5, mt: 2 }}>
          {/* Grid cells */}
          {[1, 2, 3].map((impact) => (
            [1, 2, 3].map((prob) => {
              const cellRisks = risks.filter(r => 
                getProbabilityValue(r.probability) === prob && 
                getImpactValue(r.impact) === impact
              );
              
              return (
                <Box
                  key={`${prob}-${impact}`}
                  sx={{
                    position: 'absolute',
                    left: (prob - 1) * cellSize,
                    top: (3 - impact) * cellSize, // Invert Y axis
                    width: cellSize,
                    height: cellSize,
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'grey.50',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0.5
                  }}
                >
                  {cellRisks.length > 0 && (
                    <Tooltip 
                      title={
                        <Box>
                          {cellRisks.map((risk, idx) => (
                            <Box key={idx} sx={{ mb: 0.5 }}>
                              <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>
                                {risk.risk}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      }
                      arrow
                    >
                      <Box
                        sx={{
                          width: cellSize - 10,
                          height: cellSize - 10,
                          borderRadius: '50%',
                          bgcolor: getRiskColor(cellRisks[0].probability, cellRisks[0].impact),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'scale(1.1)'
                          }
                        }}
                      >
                        <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, fontSize: '0.75rem' }}>
                          {cellRisks.length}
                        </Typography>
                      </Box>
                    </Tooltip>
                  )}
                </Box>
              );
            })
          ))}

          {/* Y-axis labels (Impact) */}
          {['High', 'Medium', 'Low'].map((label, idx) => (
            <Typography
              key={label}
              variant="caption"
              sx={{
                position: 'absolute',
                left: -35,
                top: idx * cellSize + cellSize / 2 - 8,
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            >
              {label}
            </Typography>
          ))}

          {/* X-axis labels (Probability) */}
          {['Low', 'Medium', 'High'].map((label, idx) => (
            <Typography
              key={label}
              variant="caption"
              sx={{
                position: 'absolute',
                bottom: -20,
                left: idx * cellSize + cellSize / 2 - 15,
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            >
              {label}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Legend */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#d32f2f' }} />
          <Typography variant="caption">High Risk</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#ed6c02' }} />
          <Typography variant="caption">Medium Risk</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#2e7d32' }} />
          <Typography variant="caption">Low Risk</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RiskMatrix;

