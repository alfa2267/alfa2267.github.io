import React from 'react';
import { Grid, Box } from '@mui/material';
import DashboardCard from '../shared/DashboardCard';
import MetricsCard from '../shared/MetricsCard';

/**
 * ProductMetricsSection - A reusable component for displaying key product metrics
 *
 * Usage:
 * <ProductMetricsSection
 *   title="Key Metrics"
 *   metrics={[
 *     { icon: IconUsers, label: "Users", value: "10K+", color: "#5D87FF", trend: { direction: 'up', value: '25%' } }
 *   ]}
 * />
 */
const ProductMetricsSection = ({ title = "Key Metrics", subtitle = null, metrics = [] }) => {
  if (!metrics || metrics.length === 0) {
    return null;
  }

  // Determine grid columns based on number of metrics
  const getGridSize = () => {
    const count = metrics.length;
    if (count === 1) return 12;
    if (count === 2) return 6;
    if (count === 3) return 4;
    return 3; // 4 or more metrics
  };

  const gridSize = getGridSize();

  return (
    <DashboardCard title={title} subtitle={subtitle}>
      <Grid container spacing={3}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={gridSize} key={index}>
            <MetricsCard
              icon={metric.icon}
              label={metric.label}
              value={metric.value}
              color={metric.color || '#5D87FF'}
              trend={metric.trend || null}
              subtitle={metric.subtitle || null}
              size={metric.size || 'medium'}
            />
          </Grid>
        ))}
      </Grid>
    </DashboardCard>
  );
};

export default ProductMetricsSection;
