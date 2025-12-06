import React from 'react';
import { Chip, Tooltip } from '@mui/material';
import {
  IconRocket,
  IconAlertTriangle,
  IconCircleCheck,
  IconProgress
} from '@tabler/icons-react';

const DeploymentBadge = ({ status = 'deployed', environment = 'production', timestamp = null }) => {
  const statusConfig = {
    deployed: {
      label: 'Deployed',
      icon: IconRocket,
      color: 'success',
      bgColor: '#E6FFFA',
      textColor: '#13DEB9'
    },
    deploying: {
      label: 'Deploying',
      icon: IconProgress,
      color: 'info',
      bgColor: '#ECF2FF',
      textColor: '#5D87FF'
    },
    success: {
      label: 'Success',
      icon: IconCircleCheck,
      color: 'success',
      bgColor: '#E6FFFA',
      textColor: '#13DEB9'
    },
    failed: {
      label: 'Failed',
      icon: IconAlertTriangle,
      color: 'error',
      bgColor: '#FDEDE8',
      textColor: '#FA896B'
    }
  };

  const config = statusConfig[status] || statusConfig.deployed;
  const StatusIcon = config.icon;

  const tooltipText = timestamp
    ? `${config.label} to ${environment} at ${new Date(timestamp).toLocaleString()}`
    : `${config.label} to ${environment}`;

  return (
    <Tooltip title={tooltipText} arrow>
      <Chip
        icon={<StatusIcon size={14} />}
        label={`${config.label} • ${environment}`}
        size="small"
        sx={{
          backgroundColor: config.bgColor,
          color: config.textColor,
          fontWeight: 600,
          '& .MuiChip-icon': {
            color: config.textColor
          }
        }}
      />
    </Tooltip>
  );
};

export default DeploymentBadge;
