import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import { IconCheck, IconChartBar, IconAlertTriangle } from '@tabler/icons';

/**
 * Reusable Lessons Learned Section Component
 * Displays lessons learned, what would be done differently, and skills demonstrated
 */
const LessonsLearnedSection = ({ 
  title = "Lessons Learned & Reflections",
  whatILearned = [],
  whatWouldDoDifferently = {},
  skillsDemonstrated = [],
  insights = [],
  keyTakeaways = [],
  showTitle = true
}) => {
  return (
    <Box>
      {showTitle && (
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      )}
      
      <Grid container spacing={2}>
        {whatILearned.length > 0 && (
          <Grid item xs={12} md={whatWouldDoDifferently && Object.keys(whatWouldDoDifferently).length > 0 ? 4 : 6}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              {whatILearned[0] && typeof whatILearned[0] === 'object' && whatILearned[0].title ? 'What I Learned' : 'Insights'}
            </Typography>
            {whatILearned[0] && typeof whatILearned[0] === 'object' && whatILearned[0].title ? (
              <Grid container spacing={2} mb={3}>
                {whatILearned.map((lesson, index) => {
                  const lessonData = typeof lesson === 'string' 
                    ? { title: lesson, mistake: '', lesson: '', impact: '', goingForward: [] }
                    : lesson;
                  return (
                    <Grid item xs={12} md={6} key={index}>
                      <Paper elevation={1} sx={{ p: 1.5, height: '100%' }}>
                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                          {typeof lesson === 'string' ? lesson : `${index + 1}. ${lessonData.title}`}
                        </Typography>
                        {lessonData.mistake && (
                          <Box mb={0.5}>
                            <Typography variant="body2" color="error" sx={{ fontSize: '0.875rem' }}>
                              <strong>Mistake:</strong> {lessonData.mistake}
                            </Typography>
                          </Box>
                        )}
                        {lessonData.lesson && (
                          <Box mb={0.5}>
                            <Typography variant="body2" color="info.main" sx={{ fontSize: '0.875rem' }}>
                              <strong>Lesson:</strong> {lessonData.lesson}
                            </Typography>
                          </Box>
                        )}
                        {lessonData.impact && (
                          <Box mb={1}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                              <strong>Impact:</strong> {lessonData.impact}
                            </Typography>
                          </Box>
                        )}
                        {lessonData.goingForward && lessonData.goingForward.length > 0 && (
                          <Box mt={1.5}>
                            <Typography variant="caption" fontWeight="bold" gutterBottom display="block">
                              Going Forward:
                            </Typography>
                            <List dense>
                              {lessonData.goingForward.map((item, gIndex) => (
                                <ListItem key={gIndex} disablePadding sx={{ py: 0.25 }}>
                                  <ListItemIcon sx={{ minWidth: 20 }}>
                                    <IconCheck size={12} color="green" />
                                  </ListItemIcon>
                                  <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2', fontSize: '0.875rem' }} />
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <List dense>
                {whatILearned.map((insight, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.25 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                      <IconChartBar size={14} color="#1976d2" />
                    </ListItemIcon>
                    <ListItemText primary={insight} primaryTypographyProps={{ variant: 'body2' }} />
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>
        )}

        {whatWouldDoDifferently && (
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              What I'd Do Differently
            </Typography>
            {whatWouldDoDifferently.timeline && whatWouldDoDifferently.timeline.length > 0 ? (
              <Grid container spacing={1}>
                {whatWouldDoDifferently.timeline.map((phase, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper elevation={1} sx={{ p: 1.5, height: '100%' }}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <Chip label={phase.week} size="small" color="primary" sx={{ mr: 1 }} />
                        <Typography variant="subtitle2" fontWeight="bold">
                          {phase.activity}
                        </Typography>
                      </Box>
                      <List dense>
                        {phase.tasks.map((task, tIndex) => (
                          <ListItem key={tIndex} disablePadding sx={{ py: 0.25 }}>
                            <ListItemIcon sx={{ minWidth: 24 }}>
                              <IconCheck size={12} color="green" />
                            </ListItemIcon>
                            <ListItemText primary={task} primaryTypographyProps={{ variant: 'body2', fontSize: '0.875rem' }} />
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : whatWouldDoDifferently.items && whatWouldDoDifferently.items.length > 0 ? (
              <List dense>
                {whatWouldDoDifferently.items.map((item, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.25 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                      <IconAlertTriangle size={14} color="#ed6c02" />
                    </ListItemIcon>
                    <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2' }} />
                  </ListItem>
                ))}
              </List>
            ) : null}
          </Grid>
        )}

        {keyTakeaways.length > 0 && (
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Key Takeaways
            </Typography>
            <Grid container spacing={1}>
              {keyTakeaways.map((takeaway, index) => {
                const colors = ['primary', 'secondary', 'success', 'info', 'warning'];
                const color = colors[index % colors.length];
                return (
                  <Grid item xs={12} key={index}>
                    <Paper 
                      elevation={1} 
                      sx={{ 
                        p: 1.5,
                        bgcolor: `${color}.light`,
                        color: `${color}.contrastText`
                      }}
                    >
                      <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>{takeaway}</Typography>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        )}
      </Grid>

      {skillsDemonstrated.length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            Product Owner Skills Demonstrated
          </Typography>
          <Grid container spacing={2}>
            {skillsDemonstrated.map((skill, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={1} sx={{ p: 2 }}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <IconCheck size={20} color="green" style={{ marginRight: 8 }} />
                    <Typography variant="subtitle2" fontWeight="bold">
                      {skill.skill || skill.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {skill.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default LessonsLearnedSection;

