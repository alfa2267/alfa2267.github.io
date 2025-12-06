import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CardContent,
  Chip,
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
  Stack,
  Skeleton
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
  IconFileText,
  IconBrandGithub
} from '@tabler/icons';
import PageContainer from '../../../components/container/PageContainer.js';
import DashboardCard from '../../../components/shared/DashboardCard.js';
import SystemArchitecture from '../../../components/diagrams/SystemArchitecture.js';
import BusinessCaseInfographic from '../../../components/diagrams/BusinessCaseInfographic.js';
import LessonsLearnedSection from '../../../components/sections/LessonsLearnedSection.js';
import RoadmapSection from '../../../components/sections/RoadmapSection.js';
import ProjectShowcaseSection from '../../../components/sections/ProjectShowcaseSection.js';
import DesignProcessSection from '../../../components/sections/DesignProcessSection.js';
import ProjectService from '../../../services/projectService.js';

const AirOpsPage = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const projectService = new ProjectService();
        const projectData = await projectService.getProjectBySlug('airops');
        setProject(projectData);
      } catch (err) {
        console.error('Error loading project:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, []);

  if (loading || !project) {
    return (
      <PageContainer title="Loading..." description="">
        <DashboardCard title="">
          <Box p={3}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={30} />
          </Box>
        </DashboardCard>
      </PageContainer>
    );
  }

  const caseStudy = project.caseStudy;

  const renderRepoInfo = () => {
    if (!project.github_data) return null;
    
    return (
      <Box sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <IconBrandGithub size={24} />
          <Typography variant="h6" sx={{ ml: 1 }}>
            {project.github_data.full_name}
          </Typography>
        </Box>
        
        <Grid container spacing={2} mb={3}>
          <Grid item xs={6}>
            <Box textAlign="center">
              <Typography variant="h4">
                {project.github_data.stargazers_count || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stars
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="center">
              <Typography variant="h4">
                {project.github_data.language || 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Language
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {project.github_data.updated_at && (
          <Box mb={3}>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
              <IconCalendar size={16} />
              <Box component="span" ml={1}>
                Updated: {new Date(project.github_data.updated_at).toLocaleDateString()}
              </Box>
            </Typography>
          </Box>
        )}

        {project.tech_stack && project.tech_stack.length > 0 && (
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              Technology Stack
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {project.tech_stack.map((tech, index) => (
                <Chip key={index} label={tech} size="small" />
              ))}
            </Box>
          </Box>
        )}

        {project.features && project.features.length > 0 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Key Features
            </Typography>
            <List dense>
              {project.features.map((feature, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <IconCheck size={16} color="green" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    );
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
                    <Chip label={project.role} color="primary" variant="outlined" size="small" />
                    <Chip label={project.timeline} icon={<IconCalendar size={16} />} size="small" />
                    <Chip label={project.value} color="success" size="small" />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Project Showcase */}
        <Grid item xs={12}>
          <ProjectShowcaseSection
            repository={{
              name: 'alfa2267/airops-strategy',
              full_name: 'alfa2267/airops-strategy',
              url: null, // Private repository
              stars: 0,
              stargazers_count: 0,
              language: 'Markdown',
              updated_at: '2024-12-15T00:00:00Z',
              tech_stack: project.tech_stack,
              features: project.features
            }}
            demoImage={{
              url: `https://raw.githubusercontent.com/alfa2267/airops-strategy/main/demo.png`,
              alt: 'AirOps Strategy Demo',
              description: 'Overview of the AirOps digital transformation strategy'
            }}
            screenshots={project.screenshots || []}
            wireframes={project.caseStudy?.artifacts?.wireframes || []}
            showRepository={true}
            showDemoImage={true}
            showScreenshots={project.screenshots && project.screenshots.length > 0}
            showWireframes={project.caseStudy?.artifacts?.wireframes && project.caseStudy.artifacts.wireframes.length > 0}
            showTitle={false}
          />
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

        {/* Design Process */}
        <Grid item xs={12}>
          <DesignProcessSection
            title="Design Process"
            designProcess={caseStudy.designProcess}
          />
        </Grid>

        {/* Executive Summary */}
        <Grid item xs={12}>
          <DashboardCard title="Executive Summary">
            <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="error">
                        Problem Statement
                      </Typography>
                      <Typography variant="body1" paragraph>
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
                      <Typography variant="subtitle1" fontWeight="bold" mt={2} mb={1}>
                        Impact:
                      </Typography>
                      <List dense>
                        {caseStudy.executiveSummary.problemStatement.impact.map((item, index) => (
                          <ListItem key={index} disablePadding>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <IconAlertTriangle size={16} color="orange" />
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
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Product Vision & Strategy */}
        <Grid item xs={12}>
          <DashboardCard title="Product Vision & Strategy">
            <CardContent>
              <Typography variant="body1" paragraph mb={2}>
                "{caseStudy.productVision.visionStatement}"
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Short-term
                  </Typography>
                  <List dense>
                    {caseStudy.productVision.strategicObjectives.shortTerm.map((obj, index) => (
                      <ListItem key={index} disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <IconCheck size={14} color="green" />
                        </ListItemIcon>
                        <ListItemText primary={obj} primaryTypographyProps={{ variant: 'body2' }} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Mid-term
                  </Typography>
                  <List dense>
                    {caseStudy.productVision.strategicObjectives.midTerm.map((obj, index) => (
                      <ListItem key={index} disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <IconCheck size={14} color="orange" />
                        </ListItemIcon>
                        <ListItemText primary={obj} primaryTypographyProps={{ variant: 'body2' }} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Long-term
                  </Typography>
                  <List dense>
                    {caseStudy.productVision.strategicObjectives.longTerm.map((obj, index) => (
                      <ListItem key={index} disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <IconCheck size={14} color="purple" />
                        </ListItemIcon>
                        <ListItemText primary={obj} primaryTypographyProps={{ variant: 'body2' }} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Success Metrics & KPIs
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {caseStudy.productVision.successMetrics.map((metric, index) => (
                  <Chip key={index} label={metric} size="small" variant="outlined" />
                ))}
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* User Research & Insights */}
        <Grid item xs={12}>
          <DashboardCard title="User Research & Insights">
            <CardContent>
              <Grid container spacing={1} mb={2}>
                <Grid item xs={6} sm={3}>
                  <Paper elevation={1} sx={{ p: 1.5, textAlign: 'center' }}>
                    <Typography variant="h5">{caseStudy.userResearch.interviews.operationsStaff}</Typography>
                    <Typography variant="caption">Operations Staff</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper elevation={1} sx={{ p: 1.5, textAlign: 'center' }}>
                    <Typography variant="h5">{caseStudy.userResearch.interviews.customerService}</Typography>
                    <Typography variant="caption">Customer Service</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper elevation={1} sx={{ p: 1.5, textAlign: 'center' }}>
                    <Typography variant="h5">{caseStudy.userResearch.interviews.management}</Typography>
                    <Typography variant="caption">Management</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper elevation={1} sx={{ p: 1.5, textAlign: 'center' }}>
                    <Typography variant="h5">{caseStudy.userResearch.interviews.customerSurveys}+</Typography>
                    <Typography variant="caption">Customer Surveys</Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Key Insights
                  </Typography>
                  <List dense>
                    {caseStudy.userResearch.keyInsights.map((insight, index) => (
                      <ListItem key={index} disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <IconChartBar size={16} color="#1976d2" />
                        </ListItemIcon>
                        <ListItemText primary={insight} primaryTypographyProps={{ variant: 'body2' }} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    User Personas
                  </Typography>
                  <Grid container spacing={1}>
                    {caseStudy.userResearch.personas.map((persona, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper elevation={1} sx={{ p: 1.5 }}>
                          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>{persona.name}</Typography>
                          <Typography variant="caption" color="text.secondary" display="block" mb={1}>{persona.role}</Typography>
                          <List dense>
                            {persona.goals.slice(0, 2).map((goal, gIndex) => (
                              <ListItem key={gIndex} disablePadding sx={{ py: 0.25 }}>
                                <ListItemIcon sx={{ minWidth: 20 }}>
                                  <IconCheck size={12} color="green" />
                                </ListItemIcon>
                                <ListItemText primary={goal} primaryTypographyProps={{ variant: 'caption' }} />
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Product Roadmap */}
        <Grid item xs={12}>
          <RoadmapSection
            title="Product Roadmap"
            phases={caseStudy.roadmap}
            showTimeline={true}
            showDetailedBreakdown={true}
            timelineTitle="Implementation Timeline"
            breakdownTitle="Detailed Phase Breakdown"
            columnsPerRow={2}
          />
        </Grid>

        {/* Requirements Documentation */}
        <Grid item xs={12}>
          <DashboardCard title="Requirements Documentation">
            <CardContent>
              <Grid container spacing={2}>
                {caseStudy.requirements.epics.map((epic, epicIndex) => (
                  <Grid item xs={12} md={6} key={epicIndex}>
                    <Accordion>
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
                  </Grid>
                ))}
              </Grid>
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
          <Typography variant="h5" gutterBottom>
            Business Case & ROI Analysis
          </Typography>
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
        </Grid>

        {/* Risk Assessment & Go-to-Market Strategy */}
        <Grid item xs={12}>
          <DashboardCard title="Risk Assessment & Go-to-Market Strategy">
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Launch Phases
                  </Typography>
                  <Grid container spacing={1} mb={2}>
                    {caseStudy.goToMarket.launchPhases.map((phase, index) => (
                      <Grid item xs={12} key={index}>
                        <Paper elevation={1} sx={{ p: 1.5 }}>
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                            <Typography variant="subtitle2" fontWeight="bold">{phase.phase}</Typography>
                            <Chip label={phase.duration} size="small" />
                          </Box>
                          <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                            {phase.scope}
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={0.5}>
                            {phase.goals.map((goal, gIndex) => (
                              <Chip key={gIndex} label={goal} size="small" variant="outlined" />
                            ))}
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Risk Assessment
                  </Typography>
                  <Grid container spacing={1}>
                    {caseStudy.riskAssessment.map((risk, index) => (
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
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Communication Plan
                  </Typography>
                  <List dense>
                    {caseStudy.goToMarket.communicationPlan.map((item, index) => (
                      <ListItem key={index} disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <IconCheck size={14} color="green" />
                        </ListItemIcon>
                        <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2' }} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Training Strategy
                  </Typography>
                  <List dense>
                    {caseStudy.goToMarket.trainingStrategy.map((item, index) => (
                      <ListItem key={index} disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <IconCheck size={14} color="green" />
                        </ListItemIcon>
                        <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2' }} />
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
          <LessonsLearnedSection
            title="Lessons Learned & Reflections"
            whatILearned={caseStudy.lessonsLearned.insights}
            whatWouldDoDifferently={{ items: caseStudy.lessonsLearned.whatWouldDoDifferently }}
            keyTakeaways={caseStudy.lessonsLearned.keyTakeaways}
          />
        </Grid>

        {/* Strategy Document Preview */}
        <Grid item xs={12}>
          <DashboardCard title="Strategy Document Preview">
            <CardContent>
              <Typography variant="body2" paragraph mb={2}>
                Summaries of 5 key sections from the comprehensive 194-page strategy document.
              </Typography>
              <Grid container spacing={2}>
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
                    <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                      <Typography variant="subtitle1" gutterBottom color="primary" fontWeight="bold">
                        {index + 1}. {section.title}
                      </Typography>
                      <Typography variant="body2" paragraph color="text.secondary" sx={{ mb: 1, fontSize: '0.875rem' }}>
                        {section.summary}
                      </Typography>
                      <List dense>
                        {section.keyPoints.map((point, pIndex) => (
                          <ListItem key={pIndex} disablePadding sx={{ py: 0.25 }}>
                            <ListItemIcon sx={{ minWidth: 24 }}>
                              <IconCheck size={12} color="green" />
                            </ListItemIcon>
                            <ListItemText primary={point} primaryTypographyProps={{ variant: 'body2', fontSize: '0.875rem' }} />
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
                </Typography>
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>

      </Grid>
    </PageContainer>
  );
};

export default AirOpsPage;

