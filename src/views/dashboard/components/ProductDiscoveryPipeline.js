import React from 'react';
import { Box, Typography, Stack, Chip, Paper, Grid } from '@mui/material';
import {
  IconBulb,
  IconSearch,
  IconCheckbox,
  IconCode,
  IconRocket,
  IconArrowRight
} from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';

const ProductDiscoveryPipeline = () => {
  const pipelineStages = [
    {
      id: 'ideation',
      name: 'Ideation',
      icon: IconBulb,
      color: '#FFAE1F',
      bgColor: '#FEF5E5',
      projects: [
        { name: 'AI-Powered Analytics', status: 'active' },
        { name: 'Mobile App Redesign', status: 'active' }
      ]
    },
    {
      id: 'research',
      name: 'Research',
      icon: IconSearch,
      color: '#5D87FF',
      bgColor: '#ECF2FF',
      projects: [
        { name: 'User Interview Analysis', status: 'active' },
        { name: 'Competitor Analysis', status: 'active' }
      ]
    },
    {
      id: 'validation',
      name: 'Validation',
      icon: IconCheckbox,
      color: '#49BEFF',
      bgColor: '#E8F7FF',
      projects: [
        { name: 'Prototype Testing', status: 'active' }
      ]
    },
    {
      id: 'development',
      name: 'Development',
      icon: IconCode,
      color: '#9C27B0',
      bgColor: '#F3E5F5',
      projects: [
        { name: 'AirOps Platform', status: 'active' },
        { name: 'Reloam App', status: 'active' }
      ]
    },
    {
      id: 'launch',
      name: 'Launch',
      icon: IconRocket,
      color: '#13DEB9',
      bgColor: '#E6FFFA',
      projects: [
        { name: 'Portfolio v2.0', status: 'active' }
      ]
    }
  ];

  const StageCard = ({ stage, showArrow }) => {
    const StageIcon = stage.icon;

    return (
      <Box display="flex" alignItems="center" gap={1}>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            flex: 1,
            borderTop: `3px solid ${stage.color}`,
            backgroundColor: stage.bgColor,
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 3
            }
          }}
        >
          <Stack spacing={1.5}>
            <Box display="flex" alignItems="center" gap={1}>
              <StageIcon size={20} color={stage.color} />
              <Typography variant="subtitle2" fontWeight={700}>
                {stage.name}
              </Typography>
            </Box>

            <Stack spacing={0.5}>
              {stage.projects.map((project, idx) => (
                <Chip
                  key={idx}
                  label={project.name}
                  size="small"
                  sx={{
                    fontSize: '0.7rem',
                    height: '20px',
                    backgroundColor: 'white',
                    '& .MuiChip-label': {
                      px: 1
                    }
                  }}
                />
              ))}
            </Stack>

            <Typography variant="caption" color="text.secondary">
              {stage.projects.length} project{stage.projects.length !== 1 ? 's' : ''}
            </Typography>
          </Stack>
        </Paper>

        {showArrow && (
          <IconArrowRight
            size={20}
            color="#7C8FAC"
            style={{ flexShrink: 0 }}
          />
        )}
      </Box>
    );
  };

  return (
    <DashboardCard title="Product Discovery Pipeline" subtitle="From Ideas to Launch">
      {/* Desktop View - Horizontal */}
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Box display="flex" alignItems="center" gap={0}>
          {pipelineStages.map((stage, index) => (
            <StageCard
              key={stage.id}
              stage={stage}
              showArrow={index < pipelineStages.length - 1}
            />
          ))}
        </Box>
      </Box>

      {/* Mobile/Tablet View - Grid */}
      <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
        <Grid container spacing={2}>
          {pipelineStages.map((stage) => (
            <Grid item xs={12} sm={6} key={stage.id}>
              <StageCard stage={stage} showArrow={false} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Summary Stats */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          backgroundColor: '#F2F6FA',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        <Box textAlign="center">
          <Typography variant="h6" fontWeight={700} color="primary">
            {pipelineStages.reduce((acc, stage) => acc + stage.projects.length, 0)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Active Projects
          </Typography>
        </Box>

        <Box textAlign="center">
          <Typography variant="h6" fontWeight={700} color="success.main">
            2
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Ready for Launch
          </Typography>
        </Box>

        <Box textAlign="center">
          <Typography variant="h6" fontWeight={700} color="info.main">
            5
          </Typography>
          <Typography variant="caption" color="text.secondary">
            In Development
          </Typography>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default ProductDiscoveryPipeline;
