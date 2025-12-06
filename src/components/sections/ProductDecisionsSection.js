import React from 'react';
import { Box, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, Chip, Stack } from '@mui/material';
import { IconCheck } from '@tabler/icons';

/**
 * ProductDecisionsSection - Showcases product decision-making and trade-offs
 *
 * Displays key product decisions with context, options considered, rationale, and trade-offs
 * Shows PM's ability to make informed decisions and document reasoning
 */
const ProductDecisionsSection = ({
  title = "Product Decisions & Trade-offs",
  decisions = []
}) => {
  if (!decisions || decisions.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom mb={3} sx={{ color: '#001f3f' }}>
        {title}
      </Typography>
      <Stack spacing={3}>
        {decisions.map((decision, index) => (
          <Paper key={index} elevation={2} sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">{decision.decision}</Typography>
              {decision.date && (
                <Chip label={decision.date} size="small" />
              )}
            </Box>
            
            {decision.context && (
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Context:</strong> {decision.context}
              </Typography>
            )}

            {decision.options && Object.keys(decision.options).length > 0 && (
              <>
                <Typography variant="subtitle2" fontWeight="bold" mt={2} mb={1}>
                  Options Considered:
                </Typography>
                <List dense>
                  {Object.entries(decision.options).map(([key, value]) => (
                    <ListItem key={key} disablePadding>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Typography variant="body2" fontWeight="bold">{key}.</Typography>
                      </ListItemIcon>
                      <ListItemText primary={value} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}

            {decision.choice && (
              <Box mt={2} p={2} bgcolor="success.light" borderRadius={1}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Decision: {decision.choice}
                </Typography>
                {decision.rationale && decision.rationale.length > 0 && (
                  <>
                    <Typography variant="subtitle2" fontWeight="bold" mt={1} mb={0.5}>
                      Rationale:
                    </Typography>
                    <List dense>
                      {decision.rationale.map((reason, rIndex) => (
                        <ListItem key={rIndex} disablePadding>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <IconCheck size={14} color="green" />
                          </ListItemIcon>
                          <ListItemText primary={reason} />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </Box>
            )}

            {decision.tradeoffs && (
              <Grid container spacing={2} mt={2}>
                {decision.tradeoffs.benefit && (
                  <Grid item xs={12} md={6}>
                    <Paper elevation={1} sx={{ p: 1.5, bgcolor: 'success.light' }}>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        ✅ Benefit:
                      </Typography>
                      <Typography variant="body2">{decision.tradeoffs.benefit}</Typography>
                    </Paper>
                  </Grid>
                )}
                {decision.tradeoffs.cost && (
                  <Grid item xs={12} md={6}>
                    <Paper elevation={1} sx={{ p: 1.5, bgcolor: 'warning.light' }}>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        ❌ Cost:
                      </Typography>
                      <Typography variant="body2">{decision.tradeoffs.cost}</Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            )}

            {decision.validationPlan && (
              <Box mt={2} p={1.5} bgcolor="info.light" borderRadius={1}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Validation Plan:
                </Typography>
                <Typography variant="body2">{decision.validationPlan}</Typography>
              </Box>
            )}
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default ProductDecisionsSection;

