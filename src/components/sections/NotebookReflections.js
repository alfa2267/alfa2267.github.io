import React from 'react';
import { Box, Typography, Paper, Grid, Stack, Chip } from '@mui/material';
import {
  IconPencil,
  IconBulb,
  IconAlertTriangle,
  IconCheck,
  IconArrowRight
} from '@tabler/icons-react';
import DashboardCard from '../shared/DashboardCard';

/**
 * NotebookReflections - A personal, diary-style component for product reflections
 * Looks like handwritten notes, sketches, and sticky notes
 */
const NotebookReflections = ({ title = "Product Notebook", reflections = [] }) => {
  const StickyNote = ({ color, title, content, icon: Icon }) => (
    <Paper
      elevation={3}
      sx={{
        p: 2.5,
        backgroundColor: color,
        transform: 'rotate(-1deg)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        borderRadius: '2px',
        position: 'relative',
        '&:hover': {
          transform: 'rotate(0deg) scale(1.02)',
          boxShadow: 6,
          zIndex: 10
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60px',
          height: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '0 0 4px 4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
      }}
    >
      <Stack spacing={1.5}>
        {Icon && (
          <Box display="flex" alignItems="center" gap={1}>
            <Icon size={20} />
            <Typography
              variant="subtitle2"
              fontWeight={700}
              sx={{
                fontFamily: "'Indie Flower', cursive, 'Plus Jakarta Sans'",
                fontSize: '1.1rem'
              }}
            >
              {title}
            </Typography>
          </Box>
        )}

        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Indie Flower', cursive, 'Plus Jakarta Sans'",
            fontSize: '0.95rem',
            lineHeight: 1.8,
            color: 'rgba(0, 0, 0, 0.8)'
          }}
        >
          {content}
        </Typography>
      </Stack>
    </Paper>
  );

  const SketchBox = ({ title, items, sketches = [] }) => (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        backgroundColor: '#FFFEF7',
        border: '2px solid #E8E5D5',
        borderRadius: '4px',
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 31px,
            #E8E5D5 31px,
            #E8E5D5 32px
          )
        `
      }}
    >
      <Stack spacing={2}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <IconPencil size={18} color="#5D87FF" />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Indie Flower', cursive, 'Plus Jakarta Sans'",
              fontSize: '1.3rem',
              color: '#2A3547'
            }}
          >
            {title}
          </Typography>
        </Box>

        {items && items.map((item, index) => (
          <Box key={index} display="flex" alignItems="flex-start" gap={1.5}>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#5D87FF',
                mt: 1.5,
                flexShrink: 0
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Indie Flower', cursive, 'Plus Jakarta Sans'",
                fontSize: '1rem',
                lineHeight: 2,
                color: 'rgba(0, 0, 0, 0.75)'
              }}
            >
              {item}
            </Typography>
          </Box>
        ))}

        {sketches && sketches.length > 0 && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              border: '2px dashed #5D87FF',
              borderRadius: '4px',
              backgroundColor: 'rgba(93, 135, 255, 0.05)'
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontFamily: "'Indie Flower', cursive, 'Plus Jakarta Sans'",
                fontSize: '0.85rem',
                fontStyle: 'italic',
                color: '#5A6A85'
              }}
            >
              💡 {sketches.join(' → ')}
            </Typography>
          </Box>
        )}
      </Stack>
    </Paper>
  );

  const TimelineNote = ({ phase, items }) => (
    <Box sx={{ position: 'relative', pl: 3 }}>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 8,
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: '#13DEB9',
          border: '3px solid #E6FFFA',
          boxShadow: '0 0 0 4px rgba(19, 222, 185, 0.2)'
        }}
      />
      <Paper
        elevation={1}
        sx={{
          p: 2,
          backgroundColor: '#F2F6FA',
          borderLeft: '3px solid #13DEB9'
        }}
      >
        <Chip
          label={phase}
          size="small"
          sx={{
            mb: 1,
            fontFamily: "'Indie Flower', cursive, 'Plus Jakarta Sans'",
            backgroundColor: '#13DEB9',
            color: 'white',
            fontWeight: 700
          }}
        />
        <Stack spacing={0.5}>
          {items.map((item, index) => (
            <Box key={index} display="flex" alignItems="center" gap={1}>
              <IconCheck size={14} color="#13DEB9" />
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'Indie Flower', cursive, 'Plus Jakarta Sans'",
                  fontSize: '0.9rem'
                }}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Box>
  );

  return (
    <DashboardCard title={title} subtitle="Scribbles from the product journey">
      <Box>
        {/* Sticky Notes Row */}
        {reflections.stickyNotes && (
          <Grid container spacing={2} mb={4}>
            {reflections.stickyNotes.map((note, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StickyNote
                  color={note.color || '#FFF9C4'}
                  title={note.title}
                  content={note.content}
                  icon={note.icon}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Sketch Boxes */}
        {reflections.sketches && (
          <Grid container spacing={3} mb={4}>
            {reflections.sketches.map((sketch, index) => (
              <Grid item xs={12} md={6} key={index}>
                <SketchBox
                  title={sketch.title}
                  items={sketch.items}
                  sketches={sketch.diagram}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Timeline Notes */}
        {reflections.timeline && (
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontFamily: "'Indie Flower', cursive, 'Plus Jakarta Sans'",
                fontSize: '1.3rem',
                mb: 3
              }}
            >
              If I Could Do It Again...
            </Typography>
            <Stack spacing={3}>
              {reflections.timeline.map((phase, index) => (
                <TimelineNote
                  key={index}
                  phase={phase.phase}
                  items={phase.items}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Key Takeaway Box */}
        {reflections.keyTakeaway && (
          <Box
            sx={{
              mt: 4,
              p: 3,
              backgroundColor: '#ECF2FF',
              borderRadius: '8px',
              border: '3px solid #5D87FF',
              position: 'relative',
              '&::before': {
                content: '"✨"',
                position: 'absolute',
                top: -15,
                left: 20,
                fontSize: '2rem',
                backgroundColor: '#ECF2FF',
                px: 1
              }
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Indie Flower', cursive, 'Plus Jakarta Sans'",
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#2A3547',
                textAlign: 'center',
                fontStyle: 'italic'
              }}
            >
              {reflections.keyTakeaway}
            </Typography>
          </Box>
        )}
      </Box>
    </DashboardCard>
  );
};

// Add Google Font to document
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

export default NotebookReflections;
