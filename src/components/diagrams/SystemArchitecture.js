import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * System Architecture Diagram Component
 * Creates a visual representation of system components and their relationships
 */
const SystemArchitecture = ({ title = "System Architecture", components = [] }) => {
  const defaultComponents = [
    { name: 'Frontend', type: 'client', color: '#1976d2' },
    { name: 'API Gateway', type: 'gateway', color: '#2e7d32' },
    { name: 'Backend Services', type: 'service', color: '#ed6c02' },
    { name: 'Database', type: 'database', color: '#9c27b0' },
    { name: 'External APIs', type: 'external', color: '#d32f2f' }
  ];

  const items = components.length > 0 ? components : defaultComponents;

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {title && (
        <Typography variant="h6" gutterBottom textAlign="center">
          {title}
        </Typography>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          position: 'relative',
          minHeight: '300px',
          py: 3
        }}
      >
        {/* Client Layer */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
            mb: 2
          }}
        >
          {items.filter(item => item.type === 'client' || item.layer === 'client').map((item, index) => (
            <Box
              key={index}
              sx={{
                bgcolor: item.color || '#1976d2',
                color: 'white',
                p: 2,
                borderRadius: 2,
                minWidth: 120,
                textAlign: 'center',
                boxShadow: 2
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {item.name}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Connection Arrow */}
        <Box
          sx={{
            width: 2,
            height: 30,
            bgcolor: 'grey.400',
            mb: 1
          }}
        />

        {/* Gateway/API Layer */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
            mb: 2
          }}
        >
          {items.filter(item => item.type === 'gateway' || item.layer === 'gateway').map((item, index) => (
            <Box
              key={index}
              sx={{
                bgcolor: item.color || '#2e7d32',
                color: 'white',
                p: 2,
                borderRadius: 2,
                minWidth: 120,
                textAlign: 'center',
                boxShadow: 2
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {item.name}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Connection Arrow */}
        <Box
          sx={{
            width: 2,
            height: 30,
            bgcolor: 'grey.400',
            mb: 1
          }}
        />

        {/* Services Layer */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
            mb: 2
          }}
        >
          {items.filter(item => item.type === 'service' || item.layer === 'service').map((item, index) => (
            <Box
              key={index}
              sx={{
                bgcolor: item.color || '#ed6c02',
                color: 'white',
                p: 2,
                borderRadius: 2,
                minWidth: 120,
                textAlign: 'center',
                boxShadow: 2
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {item.name}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Connection Arrow */}
        <Box
          sx={{
            width: 2,
            height: 30,
            bgcolor: 'grey.400',
            mb: 1
          }}
        />

        {/* Data Layer */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          {items.filter(item => item.type === 'database' || item.layer === 'database').map((item, index) => (
            <Box
              key={index}
              sx={{
                bgcolor: item.color || '#9c27b0',
                color: 'white',
                p: 2,
                borderRadius: 2,
                minWidth: 120,
                textAlign: 'center',
                boxShadow: 2
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {item.name}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* External Services (side) */}
        {items.filter(item => item.type === 'external' || item.layer === 'external').length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            {items.filter(item => item.type === 'external' || item.layer === 'external').map((item, index) => (
              <Box
                key={index}
                sx={{
                  bgcolor: item.color || '#d32f2f',
                  color: 'white',
                  p: 1.5,
                  borderRadius: 2,
                  minWidth: 100,
                  textAlign: 'center',
                  boxShadow: 2
                }}
              >
                <Typography variant="caption" fontWeight="bold">
                  {item.name}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SystemArchitecture;

