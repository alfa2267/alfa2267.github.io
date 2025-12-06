import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { IconTrendingUp, IconChartBar, IconClock } from '@tabler/icons';

/**
 * Business Case Infographic Component
 * Visualizes ROI, investment, and returns
 */
const BusinessCaseInfographic = ({ data = {}, title }) => {
  const {
    investment = 2900000,
    totalBenefit = 9700000,
    roi = 285,
    breakEven = 18,
    costSavings = 4500000,
    revenueIncrease = 2800000
  } = data;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {title && (
        <Typography variant="h6" gutterBottom textAlign="center" mb={3}>
          {title}
        </Typography>
      )}
      <Grid container spacing={3}>
        {/* Total Benefit */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: 'center',
              bgcolor: 'success.main',
              color: 'white',
              height: '100%'
            }}
          >
            <IconTrendingUp size={32} style={{ marginBottom: 8 }} />
            <Typography variant="h5" fontWeight="bold">
              {formatCurrency(totalBenefit)}
            </Typography>
            <Typography variant="body2">3-Year Benefit</Typography>
          </Paper>
        </Grid>

        {/* ROI */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: 'center',
              bgcolor: 'warning.main',
              color: 'white',
              height: '100%'
            }}
          >
            <IconChartBar size={32} style={{ marginBottom: 8 }} />
            <Typography variant="h5" fontWeight="bold">
              {roi}%
            </Typography>
            <Typography variant="body2">Total ROI</Typography>
          </Paper>
        </Grid>

        {/* Break-even */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: 'center',
              bgcolor: 'info.main',
              color: 'white',
              height: '100%'
            }}
          >
            <IconClock size={32} style={{ marginBottom: 8 }} />
            <Typography variant="h5" fontWeight="bold">
              Month {breakEven}
            </Typography>
            <Typography variant="body2">Break-even Point</Typography>
          </Paper>
        </Grid>

        {/* Breakdown */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Cost Savings
            </Typography>
            <Typography variant="h4" color="success.main">
              {formatCurrency(costSavings)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              From operational automation
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Revenue Increase
            </Typography>
            <Typography variant="h4" color="info.main">
              {formatCurrency(revenueIncrease)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              From conversion improvements
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessCaseInfographic;

