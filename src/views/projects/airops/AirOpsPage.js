import React, { useState } from 'react';
import {
  Box,
  Typography,
  CardContent,
  Chip,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Paper,
  Stack
} from '@mui/material';
import {
  IconChevronDown,
  IconCheck,
  IconCalendar,
  IconTrendingUp,
  IconUsers,
  IconChartBar,
  IconRocket,
  IconAlertTriangle,
  IconFileText
} from '@tabler/icons';
import PageContainer from '../../../components/container/PageContainer.js';
import DashboardCard from '../../../components/shared/DashboardCard.js';
import SystemArchitecture from '../../../components/diagrams/SystemArchitecture.js';
import RoadmapTimeline from '../../../components/diagrams/RoadmapTimeline.js';
import BusinessCaseInfographic from '../../../components/diagrams/BusinessCaseInfographic.js';
import { airopsProjectData } from '../../../data/projects/airops.js';

const AirOpsPage = () => {
  const [expandedSection, setExpandedSection] = useState('executive-summary');
  const project = airopsProjectData;
  const caseStudy = project.caseStudy;

  const handleSectionChange = (section) => (event, isExpanded) => {
    setExpandedSection(isExpanded ? section : false);
  };

  const StatCard = ({ icon: Icon, label, value, color = 'primary' }) => (
    <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
      <Icon size={32} color={color} style={{ marginBottom: 8 }} />
      <Typography variant="h4" color={color} gutterBottom>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Paper>
  );

  return (
    <PageContainer 
      title={project.name} 
      description={project.description}
    >
      <Grid container spacing={3}>
        {/* Hero Section */}
        <Grid item xs={12}>
          <DashboardCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2}>
                <Box flex={1}>
                  <Typography variant="h3" gutterBottom>
                    {project.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap" mt={2}>
                    <Chip label={project.role} color="primary" variant="outlined" />
                    <Chip label={project.timeline} icon={<IconCalendar size={16} />} />
                    <Chip label={project.value} color="success" />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Key Stats */}
        <Grid item xs={12} md={3}>
          <StatCard 
            icon={IconFileText} 
            label="Strategy Document" 
            value="194 pages" 
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard 
            icon={IconUsers} 
            label="Stakeholder Interviews" 
            value="78+" 
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard 
            icon={IconTrendingUp} 
            label="Projected ROI" 
            value="285%" 
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard 
            icon={IconRocket} 
            label="Break-even" 
            value="Month 18" 
            color="#9c27b0"
          />
        </Grid>

        {/* Executive Summary */}
        <Grid item xs={12}>
          <DashboardCard title="Executive Summary">
            <CardContent>
              <Accordion expanded={expandedSection === 'executive-summary'} onChange={handleSectionChange('executive-summary')}>
                <AccordionSummary expandIcon={<IconChevronDown />}>
                  <Typography variant="h6">Problem Statement & Solution</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="error">
                        Problem Statement
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Nigerian aviation industry challenges:
                      </Typography>
                      <List dense>
                        {caseStudy.executiveSummary.problemStatement.challenges.map((item, index) => (
                          <ListItem key={index} disablePadding>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <IconAlertTriangle size={16} color="red" />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                      <Typography variant="subtitle2" fontWeight="bold" mt={2} mb={1}>
                        Impact:
                      </Typography>
                      <List dense>
                        {caseStudy.executiveSummary.problemStatement.impact.map((item, index) => (
                          <ListItem key={index} disablePadding>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <IconAlertTriangle size={14} color="orange" />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="success.main">
                        Solution Overview
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {caseStudy.executiveSummary.solutionOverview.description}
                      </Typography>
                      <List dense>
                        {caseStudy.executiveSummary.solutionOverview.components.map((item, index) => (
                          <ListItem key={index} disablePadding>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <IconCheck size={16} color="green" />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                      <Typography variant="subtitle2" fontWeight="bold" mt={2} mb={1}>
                        Technology Approach:
                      </Typography>
                      <List dense>
                        {caseStudy.executiveSummary.solutionOverview.technologyApproach.map((item, index) => (
                          <ListItem key={index} disablePadding>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <IconRocket size={14} color="#1976d2" />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    Business Impact
                  </Typography>
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h5" color="primary">40%</Typography>
                        <Typography variant="body2">Cost Reduction</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h5" color="success.main">60%</Typography>
                        <Typography variant="body2">Customer Satisfaction ↑</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h5" color="info.main">25%</Typography>
                        <Typography variant="body2">Conversion Rate ↑</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h5" color="warning.main">Real-time</Typography>
                        <Typography variant="body2">Operational Visibility</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Product Vision & Strategy */}
        <Grid item xs={12}>
          <DashboardCard title="Product Vision & Strategy">
            <CardContent>
              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Vision Statement
                </Typography>
                <Paper elevation={1} sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                  <Typography variant="body1" fontStyle="italic">
                    "{caseStudy.productVision.visionStatement}"
                  </Typography>
                </Paper>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Short-term Objectives
                  </Typography>
                  <List dense>
                    {caseStudy.productVision.strategicObjectives.shortTerm.map((obj, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <IconCheck size={16} color="green" />
                        </ListItemIcon>
                        <ListItemText primary={obj} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Mid-term Objectives
                  </Typography>
                  <List dense>
                    {caseStudy.productVision.strategicObjectives.midTerm.map((obj, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <IconCheck size={16} color="orange" />
                        </ListItemIcon>
                        <ListItemText primary={obj} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Long-term Objectives
                  </Typography>
                  <List dense>
                    {caseStudy.productVision.strategicObjectives.longTerm.map((obj, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <IconCheck size={16} color="purple" />
                        </ListItemIcon>
                        <ListItemText primary={obj} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Success Metrics & KPIs
              </Typography>
              <Grid container spacing={2}>
                {caseStudy.productVision.successMetrics.map((metric, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Chip label={metric} variant="outlined" sx={{ width: '100%', justifyContent: 'flex-start' }} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* User Research & Insights */}
        <Grid item xs={12}>
          <DashboardCard title="User Research & Insights">
            <CardContent>
              <Grid container spacing={2} mb={3}>
                <Grid item xs={6} md={3}>
                  <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4">{caseStudy.userResearch.interviews.operationsStaff}</Typography>
                    <Typography variant="body2">Operations Staff</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4">{caseStudy.userResearch.interviews.customerService}</Typography>
                    <Typography variant="body2">Customer Service</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4">{caseStudy.userResearch.interviews.management}</Typography>
                    <Typography variant="body2">Management</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4">{caseStudy.userResearch.interviews.customerSurveys}+</Typography>
                    <Typography variant="body2">Customer Surveys</Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Key Insights
              </Typography>
              <List>
                {caseStudy.userResearch.keyInsights.map((insight, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <IconChartBar size={20} color="#1976d2" />
                    </ListItemIcon>
                    <ListItemText primary={insight} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                User Personas
              </Typography>
              <Grid container spacing={2}>
                {caseStudy.userResearch.personas.map((persona, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>{persona.name}</Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>{persona.role}</Typography>
                      <Typography variant="subtitle2" fontWeight="bold" mt={2}>Goals:</Typography>
                      <List dense>
                        {persona.goals.map((goal, gIndex) => (
                          <ListItem key={gIndex} disablePadding>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <IconCheck size={14} color="green" />
                            </ListItemIcon>
                            <ListItemText primary={goal} />
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Product Roadmap */}
        <Grid item xs={12}>
          <DashboardCard title="Product Roadmap">
            <CardContent>
              {/* Visual Roadmap Timeline */}
              <Box mb={4}>
                <RoadmapTimeline
                  title="Implementation Timeline"
                  phases={caseStudy.roadmap}
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Detailed Roadmap */}
              <Typography variant="h6" gutterBottom>
                Detailed Phase Breakdown
              </Typography>
              <Stack spacing={2}>
                {caseStudy.roadmap.map((phase, index) => (
                  <Paper key={index} elevation={2} sx={{ p: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6">{phase.phase}</Typography>
                      <Chip label={phase.duration} color="primary" size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Focus:</strong> {phase.focus}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight="bold" mt={2} mb={1}>
                      Deliverables:
                    </Typography>
                    <List dense>
                      {phase.deliverables.map((deliverable, dIndex) => (
                        <ListItem key={dIndex} disablePadding>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <IconCheck size={16} color="green" />
                          </ListItemIcon>
                          <ListItemText primary={deliverable} />
                        </ListItem>
                      ))}
                    </List>
                    {phase.keyMetrics && (
                      <>
                        <Typography variant="subtitle2" fontWeight="bold" mt={2} mb={1}>
                          Key Metrics:
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                          {phase.keyMetrics.map((metric, mIndex) => (
                            <Chip key={mIndex} label={metric} size="small" variant="outlined" />
                          ))}
                        </Box>
                      </>
                    )}
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Requirements Documentation */}
        <Grid item xs={12}>
          <DashboardCard title="Requirements Documentation">
            <CardContent>
              <Stack spacing={3}>
                {caseStudy.requirements.epics.map((epic, epicIndex) => (
                  <Accordion key={epicIndex}>
                    <AccordionSummary expandIcon={<IconChevronDown />}>
                      <Box>
                        <Typography variant="h6">{epic.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{epic.description}</Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack spacing={2}>
                        {epic.userStories.map((story, storyIndex) => (
                          <Paper key={storyIndex} elevation={1} sx={{ p: 2 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {story.title} ({story.id})
                              </Typography>
                              <Chip 
                                label={story.priority} 
                                size="small" 
                                color={story.priority === 'P0' ? 'error' : 'default'}
                              />
                            </Box>
                            <Typography variant="body2" fontStyle="italic" mb={1}>
                              As a <strong>{story.as}</strong>, I want <strong>{story.want}</strong>, so that <strong>{story.so}</strong>.
                            </Typography>
                            <Typography variant="subtitle2" fontWeight="bold" mt={2} mb={1}>
                              Acceptance Criteria:
                            </Typography>
                            <List dense>
                              {story.acceptanceCriteria.map((criteria, cIndex) => (
                                <ListItem key={cIndex} disablePadding>
                                  <ListItemIcon sx={{ minWidth: 32 }}>
                                    <IconCheck size={14} color="green" />
                                  </ListItemIcon>
                                  <ListItemText primary={criteria} />
                                </ListItem>
                              ))}
                            </List>
                            <Box mt={1}>
                              <Chip label={`Effort: ${story.effort}`} size="small" variant="outlined" />
                            </Box>
                          </Paper>
                        ))}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Technical Architecture */}
        <Grid item xs={12}>
          <DashboardCard title="Technical Architecture">
            <CardContent>
              <Typography variant="body1" paragraph>
                {caseStudy.technicalArchitecture.overview}
              </Typography>
              
              {/* System Architecture Diagram */}
              <Box mb={4}>
                <SystemArchitecture
                  title="System Architecture Overview"
                  components={[
                    { name: 'Web App', type: 'client', layer: 'client', color: '#1976d2' },
                    { name: 'Mobile App', type: 'client', layer: 'client', color: '#1976d2' },
                    { name: 'API Gateway', type: 'gateway', layer: 'gateway', color: '#2e7d32' },
                    { name: 'Booking Service', type: 'service', layer: 'service', color: '#ed6c02' },
                    { name: 'Operations Service', type: 'service', layer: 'service', color: '#ed6c02' },
                    { name: 'Analytics Service', type: 'service', layer: 'service', color: '#ed6c02' },
                    { name: 'PostgreSQL', type: 'database', layer: 'database', color: '#9c27b0' },
                    { name: 'Redis Cache', type: 'database', layer: 'database', color: '#9c27b0' },
                    { name: 'Payment Gateway', type: 'external', layer: 'external', color: '#d32f2f' },
                    { name: 'Legacy Systems', type: 'external', layer: 'external', color: '#d32f2f' }
                  ]}
                />
              </Box>

              <Divider sx={{ my: 3 }} />
              
              <Grid container spacing={3} mt={1}>
                {Object.entries(caseStudy.technicalArchitecture.technologyStack).map(([category, techs]) => (
                  <Grid item xs={12} md={6} key={category}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom textTransform="capitalize">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {techs.map((tech, index) => (
                        <Chip key={index} label={tech} size="small" />
                      ))}
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Key Architecture Decisions
              </Typography>
              <List>
                {caseStudy.technicalArchitecture.keyDecisions.map((decision, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <IconCheck size={20} color="#1976d2" />
                    </ListItemIcon>
                    <ListItemText primary={decision} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Business Case & ROI */}
        <Grid item xs={12}>
          <DashboardCard title="Business Case & ROI Analysis">
            <CardContent>
              {/* Business Case Infographic */}
              <Box mb={4}>
                <BusinessCaseInfographic
                  title="ROI Overview"
                  data={{
                    investment: caseStudy.businessCase.investment.total,
                    totalBenefit: caseStudy.businessCase.projectedReturns.threeYear.totalBenefit,
                    roi: caseStudy.businessCase.projectedReturns.threeYear.totalROI,
                    breakEven: caseStudy.businessCase.projectedReturns.threeYear.breakEvenMonth,
                    costSavings: caseStudy.businessCase.projectedReturns.threeYear.costSavings,
                    revenueIncrease: caseStudy.businessCase.projectedReturns.threeYear.revenueIncrease
                  }}
                />
              </Box>

              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Investment Breakdown: $2.9M over 12 months
              </Typography>
              <Grid container spacing={2} mb={3}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Development: ${(caseStudy.businessCase.investment.development.total / 1000000).toFixed(1)}M
                    </Typography>
                    {caseStudy.businessCase.investment.development.breakdown && Object.entries(caseStudy.businessCase.investment.development.breakdown).map(([key, value]) => (
                      <Typography key={key} variant="body2" sx={{ ml: 2 }}>
                        • {key.replace(/([A-Z])/g, ' $1').trim()}: ${(value / 1000).toFixed(0)}K
                      </Typography>
                    ))}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Infrastructure: ${(caseStudy.businessCase.investment.infrastructure.total / 1000000).toFixed(1)}M
                    </Typography>
                    {caseStudy.businessCase.investment.infrastructure.breakdown && Object.entries(caseStudy.businessCase.investment.infrastructure.breakdown).map(([key, value]) => (
                      <Typography key={key} variant="body2" sx={{ ml: 2 }}>
                        • {key.replace(/([A-Z])/g, ' $1').trim()}: ${(value / 1000).toFixed(0)}K
                      </Typography>
                    ))}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Change Management: ${(caseStudy.businessCase.investment.changeManagement.total / 1000000).toFixed(1)}M
                    </Typography>
                    {caseStudy.businessCase.investment.changeManagement.breakdown && Object.entries(caseStudy.businessCase.investment.changeManagement.breakdown).map(([key, value]) => (
                      <Typography key={key} variant="body2" sx={{ ml: 2 }}>
                        • {key.replace(/([A-Z])/g, ' $1').trim()}: ${(value / 1000).toFixed(0)}K
                      </Typography>
                    ))}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Contingency: ${(caseStudy.businessCase.investment.contingency / 1000000).toFixed(1)}M
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      (14% buffer)
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                    <Typography variant="body2">Total Investment</Typography>
                    <Typography variant="h5">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0
                      }).format(caseStudy.businessCase.investment.total)}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                3-Year ROI Projection
              </Typography>
              <Grid container spacing={2} mb={2}>
                {['year1', 'year2', 'year3'].map((year) => {
                  const yearData = caseStudy.businessCase.projectedReturns.threeYear[year];
                  if (!yearData) return null;
                  return (
                    <Grid item xs={12} md={4} key={year}>
                      <Paper elevation={1} sx={{ p: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom textTransform="capitalize">
                          {year.replace('year', 'Year ')}
                        </Typography>
                        <Typography variant="body2" mb={1}>
                          Revenue Increase: ${(yearData.revenueIncrease / 1000000).toFixed(1)}M
                        </Typography>
                        <Typography variant="body2" mb={1}>
                          Cost Savings: ${(yearData.costSavings / 1000000).toFixed(1)}M
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="h6" color="success.main">
                          Net Benefit: ${(yearData.netBenefit / 1000000).toFixed(1)}M
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
                      ${(caseStudy.businessCase.projectedReturns.threeYear.totalBenefit / 1000000).toFixed(1)}M
                    </Typography>
                    <Typography variant="body2">Total 3-Year Benefit</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={2} sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                    <Typography variant="h4">
                      {caseStudy.businessCase.projectedReturns.threeYear.totalROI}%
                    </Typography>
                    <Typography variant="body2">Total ROI</Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Box mt={3} p={2} bgcolor="info.light" borderRadius={1}>
                <Typography variant="body1">
                  <strong>Break-even Point:</strong> Month {caseStudy.businessCase.projectedReturns.threeYear.breakEvenMonth}
                </Typography>
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Risk Assessment */}
        <Grid item xs={12}>
          <DashboardCard title="Risk Assessment & Mitigation">
            <CardContent>
              <Grid container spacing={2}>
                {caseStudy.riskAssessment.map((risk, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="subtitle1" fontWeight="bold">{risk.risk}</Typography>
                        <Box display="flex" gap={1}>
                          <Chip 
                            label={`${risk.probability} Probability`} 
                            size="small" 
                            color={risk.probability === 'High' ? 'error' : risk.probability === 'Medium' ? 'warning' : 'default'}
                          />
                          <Chip 
                            label={`${risk.impact} Impact`} 
                            size="small" 
                            color={risk.impact === 'High' ? 'error' : 'default'}
                          />
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Mitigation:</strong> {risk.mitigation}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Go-to-Market Strategy */}
        <Grid item xs={12}>
          <DashboardCard title="Go-to-Market Strategy">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Launch Phases
              </Typography>
              <Stack spacing={2} mb={3}>
                {caseStudy.goToMarket.launchPhases.map((phase, index) => (
                  <Paper key={index} elevation={1} sx={{ p: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="subtitle1" fontWeight="bold">{phase.phase}</Typography>
                      <Chip label={phase.duration} size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      <strong>Scope:</strong> {phase.scope}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight="bold" mt={1} mb={0.5}>
                      Goals:
                    </Typography>
                    <List dense>
                      {phase.goals.map((goal, gIndex) => (
                        <ListItem key={gIndex} disablePadding>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <IconCheck size={14} color="green" />
                          </ListItemIcon>
                          <ListItemText primary={goal} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                ))}
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Communication Plan
                  </Typography>
                  <List dense>
                    {caseStudy.goToMarket.communicationPlan.map((item, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <IconCheck size={16} color="green" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Training Strategy
                  </Typography>
                  <List dense>
                    {caseStudy.goToMarket.trainingStrategy.map((item, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <IconCheck size={16} color="green" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Lessons Learned */}
        <Grid item xs={12}>
          <DashboardCard title="Lessons Learned & Reflections">
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Product Strategy Insights
                  </Typography>
                  <List>
                    {caseStudy.lessonsLearned.insights.map((insight, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <IconChartBar size={20} color="#1976d2" />
                        </ListItemIcon>
                        <ListItemText primary={insight} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    What I'd Do Differently
                  </Typography>
                  <List>
                    {caseStudy.lessonsLearned.whatWouldDoDifferently.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <IconAlertTriangle size={20} color="#ed6c02" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Key Takeaways
              </Typography>
              <Grid container spacing={2}>
                {caseStudy.lessonsLearned.keyTakeaways.map((takeaway, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Typography variant="body2">{takeaway}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Strategy Document Preview */}
        <Grid item xs={12}>
          <DashboardCard title="Strategy Document Preview">
            <CardContent>
              <Typography variant="body1" paragraph>
                Below are summaries of 5 key sections from the comprehensive 194-page AirOps Digital Transformation Strategy document.
              </Typography>
              <Grid container spacing={3}>
                {[
                  {
                    title: 'Executive Summary',
                    summary: 'Overview of the digital transformation initiative, problem statement, solution approach, and expected business impact. Highlights the $2.9M investment and 285% ROI projection over 3 years.',
                    keyPoints: [
                      '40% operational cost reduction',
                      '60% customer satisfaction improvement',
                      '25% booking conversion increase',
                      'Real-time operational visibility'
                    ]
                  },
                  {
                    title: 'Current State Analysis',
                    summary: 'Comprehensive assessment of existing systems, processes, and pain points. Includes stakeholder interviews with 78+ participants across operations, customer service, management, and customers.',
                    keyPoints: [
                      'Fragmented legacy systems identified',
                      'Manual processes causing inefficiencies',
                      'Data silos preventing integrated decision-making',
                      'Poor customer experience across touchpoints'
                    ]
                  },
                  {
                    title: 'Technical Architecture Design',
                    summary: 'Detailed system architecture using microservices approach with API-first design. Includes technology stack recommendations, integration points, security considerations, and scalability approach.',
                    keyPoints: [
                      'Cloud-native architecture (AWS)',
                      'Microservices for scalability',
                      'API-first for future integrations',
                      'Event-driven real-time updates'
                    ]
                  },
                  {
                    title: 'Implementation Roadmap',
                    summary: '4-phase implementation plan spanning 12 months with detailed deliverables, timelines, and success metrics for each phase. Includes risk mitigation strategies and go-to-market approach.',
                    keyPoints: [
                      'Phase 1: Foundation (Months 1-3)',
                      'Phase 2: Operations & Mobile (Months 4-6)',
                      'Phase 3: Analytics & UX (Months 7-9)',
                      'Phase 4: Advanced Features (Months 10-12)'
                    ]
                  },
                  {
                    title: 'Business Case & Financial Analysis',
                    summary: 'Detailed ROI analysis with investment breakdown, 3-year financial projections, break-even analysis, and risk assessment. Includes cost-benefit analysis and value proposition for stakeholders.',
                    keyPoints: [
                      '$2.9M total investment',
                      '$9.7M total 3-year benefit',
                      '285% ROI',
                      '18-month break-even period'
                    ]
                  }
                ].map((section, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                      <Typography variant="h6" gutterBottom color="primary">
                        {index + 1}. {section.title}
                      </Typography>
                      <Typography variant="body2" paragraph color="text.secondary">
                        {section.summary}
                      </Typography>
                      <Typography variant="subtitle2" fontWeight="bold" mt={2} mb={1}>
                        Key Points:
                      </Typography>
                      <List dense>
                        {section.keyPoints.map((point, pIndex) => (
                          <ListItem key={pIndex} disablePadding>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <IconCheck size={14} color="green" />
                            </ListItemIcon>
                            <ListItemText primary={point} />
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              <Box mt={3} p={2} bgcolor="info.light" borderRadius={1}>
                <Typography variant="body2">
                  <strong>Full Document:</strong> The complete 194-page strategy document includes additional sections on user research findings, detailed requirements, security architecture, change management plan, and comprehensive risk assessment. 
                  <Button
                    variant="text"
                    size="small"
                    href="https://docs.google.com/document/d/14m9lwPWDC4cN3LnkGNcUpE4KIPc4WGCx4W641AVQ4Y0/edit"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ ml: 1 }}
                  >
                    View Full Document →
                  </Button>
                </Typography>
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Artifacts */}
        <Grid item xs={12}>
          <DashboardCard title="Artifacts">
            <CardContent>
              <Grid container spacing={2}>
                {caseStudy.artifacts.map((artifact, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <IconFileText size={24} style={{ marginRight: 8 }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          {artifact.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {artifact.description}
                      </Typography>
                      {artifact.preview && (
                        <Typography variant="caption" color="text.secondary">
                          {artifact.preview}
                        </Typography>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AirOpsPage;

