import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { IconCheck, IconChartBar, IconList } from '@tabler/icons';
import BusinessCaseInfographic from '../diagrams/BusinessCaseInfographic';
import DashboardCard from '../shared/DashboardCard';
import RiskMatrix from '../diagrams/RiskMatrix';
import SWOTAnalysis from '../diagrams/SWOTAnalysis';

const BusinessCaseSection = ({ title = "Business Case & ROI Analysis", businessCase, swot }) => {
  const [riskView, setRiskView] = useState('matrix');

  if (!businessCase) return null;

  const { investment, projectedReturns, assumptions, risks } = businessCase;

  const handleRiskViewChange = (event, newView) => {
    if (newView !== null) {
      setRiskView(newView);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {/* Business Case Infographic */}
      {projectedReturns?.threeYear && (
        <Box mb={4}>
          <BusinessCaseInfographic
            data={{
              investment: investment.total,
              totalBenefit: projectedReturns.threeYear.totalBenefit,
              roi: projectedReturns.threeYear.totalROI,
              breakEven: projectedReturns.threeYear.breakEvenMonth,
              costSavings: projectedReturns.threeYear.costSavings,
              revenueIncrease: projectedReturns.threeYear.revenueIncrease
            }}
          />
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Investment Breakdown */}
      <DashboardCard title="Investment Breakdown">
        <Grid container spacing={2}>
        {investment.development && (
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 2.5,
                borderLeft: '4px solid',
                borderColor: 'primary.main',
                bgcolor: 'background.paper',
                transition: 'all 0.3s',
                '&:hover': {
                  elevation: 4,
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                }
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                  Development
                </Typography>
                <Chip
                  label={`$${(investment.development.total / 1000).toFixed(0)}K`}
                  color="primary"
                  size="small"
                />
              </Box>
              {investment.development.breakdown && Object.entries(investment.development.breakdown).map(([key, value]) => (
                <Box key={key} display="flex" justifyContent="space-between" sx={{ py: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    ${(value / 1000).toFixed(0)}K
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        )}

        {investment.infrastructure && (
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 2.5,
                borderLeft: '4px solid',
                borderColor: 'success.main',
                bgcolor: 'background.paper',
                transition: 'all 0.3s',
                '&:hover': {
                  elevation: 4,
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                }
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                <Typography variant="subtitle1" fontWeight="bold" color="success.main">
                  Infrastructure
                </Typography>
                <Chip
                  label={`$${(investment.infrastructure.total / 1000).toFixed(0)}K`}
                  color="success"
                  size="small"
                />
              </Box>
              {investment.infrastructure.breakdown && Object.entries(investment.infrastructure.breakdown).map(([key, value]) => (
                <Box key={key} display="flex" justifyContent="space-between" sx={{ py: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    ${(value / 1000).toFixed(1)}K
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        )}

        {investment.marketing && (
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 2.5,
                borderLeft: '4px solid',
                borderColor: 'warning.main',
                bgcolor: 'background.paper',
                transition: 'all 0.3s',
                '&:hover': {
                  elevation: 4,
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                }
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                <Typography variant="subtitle1" fontWeight="bold" color="warning.main">
                  Marketing & Research
                </Typography>
                <Chip
                  label={`$${(investment.marketing.total / 1000).toFixed(0)}K`}
                  color="warning"
                  size="small"
                />
              </Box>
              {investment.marketing.breakdown && Object.entries(investment.marketing.breakdown).map(([key, value]) => (
                <Box key={key} display="flex" justifyContent="space-between" sx={{ py: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    ${(value / 1000).toFixed(0)}K
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        )}

        {investment.changeManagement && (
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 2.5,
                borderLeft: '4px solid',
                borderColor: 'info.main',
                bgcolor: 'background.paper',
                transition: 'all 0.3s',
                '&:hover': {
                  elevation: 4,
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                }
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                <Typography variant="subtitle1" fontWeight="bold" color="info.main">
                  Change Management
                </Typography>
                <Chip
                  label={`$${(investment.changeManagement.total / 1000).toFixed(0)}K`}
                  color="info"
                  size="small"
                />
              </Box>
              {investment.changeManagement.breakdown && Object.entries(investment.changeManagement.breakdown).map(([key, value]) => (
                <Box key={key} display="flex" justifyContent="space-between" sx={{ py: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    ${(value / 1000).toFixed(0)}K
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        )}

        {investment.contingency && (
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 2.5,
                borderLeft: '4px solid',
                borderColor: 'secondary.main',
                bgcolor: 'background.paper',
                transition: 'all 0.3s',
                '&:hover': {
                  elevation: 4,
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                }
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle1" fontWeight="bold" color="secondary.main">
                  Contingency
                </Typography>
                <Chip
                  label={`$${(investment.contingency / 1000).toFixed(0)}K`}
                  color="secondary"
                  size="small"
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                {((investment.contingency / investment.total) * 100).toFixed(0)}% buffer for unexpected costs
              </Typography>
            </Paper>
          </Grid>
        )}

        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
            <Typography variant="body2">Total Investment</Typography>
            <Typography variant="h5">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
              }).format(investment.total)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      </DashboardCard>

      <Divider sx={{ my: 3 }} />

      {/* ROI Projection */}
      {projectedReturns?.threeYear && (
        <DashboardCard 
          title="3-Year ROI Projection"
          action={
            <Box p={1.5} bgcolor="info.light" borderRadius={1}>
              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                <strong>Break-even Point:</strong> Month {projectedReturns.threeYear.breakEvenMonth}
              </Typography>
            </Box>
          }
        >
          <Grid container spacing={2} mb={2}>
            {['year1', 'year2', 'year3'].map((year) => {
              const yearData = projectedReturns.threeYear[year];
              if (!yearData) return null;
              return (
                <Grid item xs={12} md={4} key={year}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom textTransform="capitalize">
                      {year.replace('year', 'Year ')}
                    </Typography>
                    <Typography variant="body2" mb={1}>
                      Revenue Increase: ${(yearData.revenueIncrease / 1000).toFixed(0)}K
                    </Typography>
                    <Typography variant="body2" mb={1}>
                      Cost Savings: ${(yearData.costSavings / 1000).toFixed(0)}K
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="h6" color="success.main">
                      Net Benefit: ${(yearData.netBenefit / 1000).toFixed(0)}K
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center', bgcolor: 'success.main', color: 'white' }}>
                <Typography variant="h4">
                  ${(projectedReturns.threeYear.totalBenefit / 1000).toFixed(0)}K
                </Typography>
                <Typography variant="body2">Total 3-Year Benefit</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="h4">
                  {projectedReturns.threeYear.totalROI}%
                </Typography>
                <Typography variant="body2">Total ROI</Typography>
              </Paper>
            </Grid>
          </Grid>
        </DashboardCard>
      )}

      {/* Assumptions, SWOT Analysis, and Risk Assessment */}
      <Grid container spacing={3} mt={3}>
        {/* Key Assumptions */}
        {assumptions && assumptions.length > 0 && (
          <Grid item xs={12} md={4}>
            <DashboardCard title="Key Assumptions">
              <List dense>
                {assumptions.map((assumption, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.25 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                      <IconCheck size={14} color="green" />
                    </ListItemIcon>
                    <ListItemText primary={assumption} primaryTypographyProps={{ variant: 'body2' }} />
                  </ListItem>
                ))}
              </List>
            </DashboardCard>
          </Grid>
        )}

        {/* SWOT Analysis */}
        {swot && (
          <Grid item xs={12} md={4}>
            <DashboardCard title="SWOT Analysis">
              <SWOTAnalysis swot={swot} />
            </DashboardCard>
          </Grid>
        )}

        {/* Risk Assessment */}
        {risks && risks.length > 0 && (
          <Grid item xs={12} md={4}>
            <DashboardCard 
              title="Risk Assessment"
              action={
                <ToggleButtonGroup
                  value={riskView}
                  exclusive
                  onChange={handleRiskViewChange}
                  size="small"
                  aria-label="risk view toggle"
                >
                  <ToggleButton value="matrix" aria-label="matrix view">
                    <IconChartBar size={16} style={{ marginRight: 4 }} />
                    Matrix
                  </ToggleButton>
                  <ToggleButton value="list" aria-label="list view">
                    <IconList size={16} style={{ marginRight: 4 }} />
                    List
                  </ToggleButton>
                </ToggleButtonGroup>
              }
            >
              {riskView === 'matrix' ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                  <RiskMatrix risks={risks} />
                </Box>
              ) : (
                <Grid container spacing={1}>
                  {risks.map((risk, index) => (
                    <Grid item xs={12} key={index}>
                      <Paper elevation={1} sx={{ p: 1.5 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="start" mb={0.5}>
                          <Typography variant="subtitle2" fontWeight="bold">{risk.risk}</Typography>
                          <Box display="flex" gap={0.5}>
                            <Chip
                              label={risk.probability}
                              size="small"
                              color={risk.probability === 'High' ? 'error' : risk.probability === 'Medium' ? 'warning' : 'default'}
                            />
                            <Chip
                              label={risk.impact}
                              size="small"
                              color={risk.impact === 'High' ? 'error' : 'default'}
                            />
                          </Box>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          <strong>Mitigation:</strong> {risk.mitigation}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </DashboardCard>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default BusinessCaseSection;
