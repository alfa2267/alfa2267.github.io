import React from 'react';
import { Box, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, Chip, LinearProgress } from '@mui/material';
import { IconShield, IconBrandGit, IconCode, IconLock, IconCheck, IconAlertTriangle, IconActivity } from '@tabler/icons-react';
import DashboardCard from '../shared/DashboardCard';

/**
 * DevOpsSecuritySection - Showcases DevOps practices and security awareness
 *
 * Displays CI/CD pipeline, security scans, code quality metrics
 * Shows PM's technical fluency and understanding of production readiness
 */
const DevOpsSecuritySection = ({
  title = "DevOps & Security",
  cicdPipeline = {},
  securityScans = {},
  codeQuality = {},
  showPipeline = true,
  showSecurity = true,
  showCodeQuality = true
}) => {
  const getStatusColor = (status) => {
    const statusMap = {
      'passing': '#13DEB9',
      'success': '#13DEB9',
      'failed': '#FA896B',
      'warning': '#FFAE1F',
      'pending': '#5D87FF'
    };
    return statusMap[status?.toLowerCase()] || '#5D87FF';
  };

  const getStatusIcon = (status) => {
    if (status?.toLowerCase() === 'passing' || status?.toLowerCase() === 'success') {
      return <IconCheck size={20} color="#13DEB9" />;
    } else if (status?.toLowerCase() === 'failed') {
      return <IconAlertTriangle size={20} color="#FA896B" />;
    }
    return <IconActivity size={20} color="#5D87FF" />;
  };

  return (
    <DashboardCard title={title}>
      <Grid container spacing={3}>
        {/* CI/CD Pipeline Status */}
        {showPipeline && cicdPipeline && Object.keys(cicdPipeline).length > 0 && (
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 2, bgcolor: '#ECF2FF' }}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <IconBrandGit size={24} color="#5D87FF" />
                <Typography variant="subtitle1" fontWeight="bold">
                  CI/CD Pipeline
                </Typography>
                {cicdPipeline.status && (
                  <Chip
                    label={cicdPipeline.status}
                    size="small"
                    sx={{
                      bgcolor: getStatusColor(cicdPipeline.status),
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                )}
              </Box>

              {cicdPipeline.stages && cicdPipeline.stages.length > 0 && (
                <Grid container spacing={2}>
                  {cicdPipeline.stages.map((stage, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Paper elevation={1} sx={{ p: 1.5 }}>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          {getStatusIcon(stage.status)}
                          <Typography variant="body2" fontWeight={600}>
                            {stage.name}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {stage.description || 'Automated'}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}

              {cicdPipeline.metrics && (
                <Grid container spacing={2} mt={2}>
                  <Grid item xs={6} md={3}>
                    <Box textAlign="center">
                      <Typography variant="h5" fontWeight="bold" color="primary">
                        {cicdPipeline.metrics.deploymentFrequency || 'N/A'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Deployment Frequency
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box textAlign="center">
                      <Typography variant="h5" fontWeight="bold" color="success.main">
                        {cicdPipeline.metrics.successRate || 'N/A'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Build Success Rate
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box textAlign="center">
                      <Typography variant="h5" fontWeight="bold" color="info.main">
                        {cicdPipeline.metrics.leadTime || 'N/A'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Lead Time
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box textAlign="center">
                      <Typography variant="h5" fontWeight="bold" color="warning.main">
                        {cicdPipeline.metrics.mttr || 'N/A'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        MTTR
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Paper>
          </Grid>
        )}

        {/* Security Scans */}
        {showSecurity && securityScans && Object.keys(securityScans).length > 0 && (
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <IconShield size={24} color="#9C27B0" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Security Scans
                </Typography>
              </Box>

              <List dense>
                {securityScans.scans && securityScans.scans.map((scan, index) => (
                  <ListItem key={index} sx={{ bgcolor: 'grey.50', mb: 1, borderRadius: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {scan.status === 'passed' ? (
                        <IconCheck size={20} color="#13DEB9" />
                      ) : (
                        <IconAlertTriangle size={20} color="#FFAE1F" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={scan.name}
                      secondary={scan.findings ? `${scan.findings} findings` : 'No issues found'}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                    {scan.severity && (
                      <Chip
                        label={scan.severity}
                        size="small"
                        color={scan.severity === 'low' ? 'success' : scan.severity === 'medium' ? 'warning' : 'error'}
                        variant="outlined"
                      />
                    )}
                  </ListItem>
                ))}
              </List>

              {securityScans.summary && (
                <Box mt={2} p={1.5} bgcolor={securityScans.summary.criticalIssues > 0 ? '#FFEBEE' : '#E6FFFA'} borderRadius={1}>
                  <Typography variant="body2" fontWeight={600}>
                    Total Issues: {securityScans.summary.totalIssues || 0}
                    {securityScans.summary.criticalIssues > 0 && (
                      <span style={{ color: '#d32f2f', marginLeft: 8 }}>
                        ({securityScans.summary.criticalIssues} critical)
                      </span>
                    )}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        )}

        {/* Code Quality Metrics */}
        {showCodeQuality && codeQuality && Object.keys(codeQuality).length > 0 && (
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <IconCode size={24} color="#1976d2" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Code Quality
                </Typography>
              </Box>

              {codeQuality.coverage && (
                <Box mb={2}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" fontWeight={600}>
                      Test Coverage
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {codeQuality.coverage}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={codeQuality.coverage}
                    sx={{
                      height: 8,
                      borderRadius: 1,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: codeQuality.coverage >= 80 ? '#13DEB9' : codeQuality.coverage >= 60 ? '#FFAE1F' : '#FA896B'
                      }
                    }}
                  />
                </Box>
              )}

              <List dense>
                {codeQuality.metrics && codeQuality.metrics.map((metric, index) => (
                  <ListItem key={index}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <IconCheck size={16} color="#5D87FF" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">{metric.name}</Typography>
                          <Typography variant="body2" fontWeight={600} color={metric.status === 'good' ? 'success.main' : 'warning.main'}>
                            {metric.value}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              {codeQuality.linting && (
                <Box mt={2} p={1.5} bgcolor="grey.50" borderRadius={1}>
                  <Typography variant="body2" fontWeight={600}>
                    Linting: {codeQuality.linting.status || 'Enabled'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {codeQuality.linting.errors || 0} errors, {codeQuality.linting.warnings || 0} warnings
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        )}

        {/* Security Best Practices */}
        {showSecurity && securityScans.bestPractices && securityScans.bestPractices.length > 0 && (
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ p: 2, bgcolor: '#FFF9E6' }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <IconLock size={20} color="#FFAE1F" />
                <Typography variant="subtitle2" fontWeight="bold">
                  Security Best Practices Implemented
                </Typography>
              </Box>
              <Box display="flex" gap={1} flexWrap="wrap">
                {securityScans.bestPractices.map((practice, index) => (
                  <Chip key={index} label={practice} size="small" variant="outlined" />
                ))}
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </DashboardCard>
  );
};

export default DevOpsSecuritySection;
