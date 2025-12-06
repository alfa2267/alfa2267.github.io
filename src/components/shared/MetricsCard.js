import React from 'react';
import { Paper, Typography, Box, Stack } from '@mui/material';
import { IconTrendingUp, IconTrendingDown, IconMinus } from '@tabler/icons-react';

const MetricsCard = ({
  icon: Icon,
  label,
  value,
  color = 'primary',
  trend = null, // { direction: 'up' | 'down' | 'neutral', value: '25%' }
  subtitle = null,
  size = 'medium' // 'small' | 'medium' | 'large'
}) => {
  const getTrendIcon = () => {
    if (!trend) return null;

    const trendColor = trend.direction === 'up' ? '#13DEB9' :
                       trend.direction === 'down' ? '#FA896B' : '#7C8FAC';

    const TrendIcon = trend.direction === 'up' ? IconTrendingUp :
                      trend.direction === 'down' ? IconTrendingDown : IconMinus;

    return (
      <Box display="flex" alignItems="center" gap={0.5} sx={{ color: trendColor }}>
        <TrendIcon size={16} />
        <Typography variant="caption" fontWeight={600}>
          {trend.value}
        </Typography>
      </Box>
    );
  };

  const sizeStyles = {
    small: { p: 2, iconSize: 24, valueVariant: 'h5', labelVariant: 'caption' },
    medium: { p: 3, iconSize: 32, valueVariant: 'h4', labelVariant: 'body2' },
    large: { p: 4, iconSize: 40, valueVariant: 'h3', labelVariant: 'body1' }
  };

  const styles = sizeStyles[size];

  return (
    <Paper elevation={2} sx={{ p: styles.p, textAlign: 'center', height: '100%' }}>
      <Stack spacing={1} alignItems="center">
        {Icon && <Icon size={styles.iconSize} color={color} style={{ marginBottom: 4 }} />}

        <Typography variant={styles.valueVariant} color={color} fontWeight={700}>
          {value}
        </Typography>

        <Typography variant={styles.labelVariant} color="text.secondary">
          {label}
        </Typography>

        {subtitle && (
          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            {subtitle}
          </Typography>
        )}

        {getTrendIcon()}
      </Stack>
    </Paper>
  );
};

export default MetricsCard;
