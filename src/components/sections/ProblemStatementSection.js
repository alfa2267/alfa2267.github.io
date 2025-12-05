import React from 'react';
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper
} from '@mui/material';
import { IconAlertTriangle } from '@tabler/icons';

/**
 * Reusable Problem Statement Section Component
 * Displays problem statement with pain points and opportunity
 */
const ProblemStatementSection = ({ 
  title = "Problem Statement",
  targetUser,
  painPoints = [],
  opportunity,
  challenges = [],
  impact = [],
  showTitle = true
}) => {
  return (
    <Box>
      {showTitle && (
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      )}
      
      {targetUser && (
        <>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Target User
          </Typography>
          <Typography variant="body1" paragraph>
            {targetUser}
          </Typography>
          <Divider sx={{ my: 3 }} />
        </>
      )}

      {challenges.length > 0 && (
        <>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="error">
            Problem Statement
          </Typography>
          <Typography variant="body1" paragraph>
            {challenges[0]?.context || 'Key challenges:'}
          </Typography>
          <List dense>
            {challenges.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <IconAlertTriangle size={16} color="red" />
                </ListItemIcon>
                <ListItemText primary={typeof item === 'string' ? item : item.text} />
              </ListItem>
            ))}
          </List>
          {impact.length > 0 && (
            <>
              <Typography variant="subtitle1" fontWeight="bold" mt={2} mb={1}>
                Impact:
              </Typography>
              <List dense>
                {impact.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <IconAlertTriangle size={16} color="orange" />
                    </ListItemIcon>
                    <ListItemText primary={typeof item === 'string' ? item : item.text} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </>
      )}

      {painPoints.length > 0 && (
        <Grid container spacing={3}>
          {painPoints.map((painPoint, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Typography 
                variant="subtitle1" 
                fontWeight="bold" 
                gutterBottom 
                color={painPoint.color || (index === 0 ? 'error' : index === 1 ? 'warning.main' : 'info.main')}
              >
                {painPoint.number && `${painPoint.number}. `}{painPoint.title}
              </Typography>
              <List dense>
                {painPoint.items.map((item, itemIndex) => (
                  <ListItem key={itemIndex} disablePadding>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <IconAlertTriangle size={16} color={painPoint.iconColor || 'red'} />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          ))}
        </Grid>
      )}

      {opportunity && (
        <>
          <Divider sx={{ my: 3 }} />
          <Paper elevation={1} sx={{ p: 2, bgcolor: 'success.light' }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Opportunity
            </Typography>
            <Typography variant="body1">{opportunity}</Typography>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default ProblemStatementSection;

