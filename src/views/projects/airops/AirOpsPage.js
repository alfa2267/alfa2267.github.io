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
  Divider,
  Paper,
  Skeleton
} from '@mui/material';
import {
  IconCheck,
  IconCalendar,
  IconChartBar,
  IconAlertTriangle,
  IconBrandGithub,
  IconBulb
} from '@tabler/icons';
import PageContainer from '../../../components/container/PageContainer.js';
import DashboardCard from '../../../components/shared/DashboardCard.js';
import SystemArchitecture from '../../../components/diagrams/SystemArchitecture.js';
import UserFlowDiagram from '../../../components/diagrams/UserFlowDiagram.js';
import PersonaCard from '../../../components/personas/PersonaCard.js';
import PageTableOfContents from '../../../components/navigation/PageTableOfContents.js';
import BackToTop from '../../../components/navigation/BackToTop.js';
import {
  RoadmapSection,
  ProjectShowcaseSection,
  DesignProcessSection,
  SprintMetricsSection,
  QATestingSection,
  DevOpsSecuritySection,
  ProblemDiscoverySection,
  ProductDecisionsSection,
  RequirementsSection,
  BusinessCaseSection
} from '../../../components/sections';
import NotebookReflections from '../../../components/sections/NotebookReflections.js';
import ProjectService from '../../../services/projectService.js';

const AirOpsPage = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define table of contents sections
  const tocSections = [
    { id: 'project-showcase', title: 'Project Showcase', level: 1 },
    { id: 'problem-discovery', title: 'Problem Discovery & Solution', level: 1 },
    { id: 'business-case', title: 'Business Case & ROI', level: 1 },
    { id: 'product-vision', title: 'Product Vision & MVP Strategy', level: 1 },
    { id: 'product-decisions', title: 'Product Decisions & Trade-offs', level: 1 },
    { id: 'user-research', title: 'User Research & Insights', level: 1 },
    { id: 'design-process', title: 'Design Process', level: 1 },
    { id: 'user-flow', title: 'User Flow Diagram', level: 1 },
    { id: 'product-roadmap', title: 'Product Roadmap', level: 1 },
    { id: 'requirements', title: 'Requirements & User Stories', level: 1 },
    { id: 'technical-architecture', title: 'Technical Architecture', level: 1 },
    { id: 'sprint-metrics', title: 'Sprint Metrics & Velocity', level: 1 },
    { id: 'qa-testing', title: 'QA & Testing Strategy', level: 1 },
    { id: 'devops-security', title: 'Process & Compliance', level: 1 },
    { id: 'lessons-learned', title: 'Retrospectives', level: 1 }
  ];

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

  return (
    <PageContainer 
      title={project.name} 
      description={project.description}
    >
      <Grid container spacing={3}>
        {/* Table of Contents - Sidebar */}
        <Grid item xs={12} md={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <PageTableOfContents sections={tocSections} />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
        {/* Hero Section */}
          <Box id="hero-section" mb={6}>
            {/* Title - Outside Card */}
            <Typography variant="h3" gutterBottom mb={3}>
              {project.name}
            </Typography>
            
            <DashboardCard>
              <CardContent>
                <Box>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap" mt={2}>
                    <Chip label={project.role} color="primary" variant="outlined" size="small" />
                    <Chip label={project.timeline} icon={<IconCalendar size={16} />} size="small" />
                    <Chip label={project.value} color="success" size="small" />
                  </Box>
                </Box>
              </CardContent>
            </DashboardCard>
          </Box>

          {/* Project Showcase */}
          <Box id="project-showcase" mb={6}>
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
          </Box>


        {/* Problem Discovery & Solution */}
          <Box id="problem-discovery" mb={6}>
            <ProblemDiscoverySection
              title="Problem Discovery & Solution"
              problemStatement={{
                description: "Nigerian aviation industry challenges:",
                challenges: caseStudy.executiveSummary.problemStatement.challenges,
                impact: caseStudy.executiveSummary.problemStatement.impact
              }}
              solutionOverview={{
                description: caseStudy.executiveSummary.solutionOverview.description,
                approach: caseStudy.executiveSummary.solutionOverview.technologyApproach,
                keyFeatures: caseStudy.executiveSummary.solutionOverview.components,
                valueProposition: `Transform Air Peace into Africa's most digitally advanced airline, delivering seamless customer experiences while optimizing operational efficiency through integrated technology solutions.`
              }}
              successCriteria={[
                { value: '40%', label: 'Cost Reduction' },
                { value: '60%', label: 'Customer Satisfaction' },
                { value: '25%', label: 'Conversion Rate' },
                { value: 'Real-time', label: 'Operational Visibility' }
              ]}
            />
          </Box>

          {/* Risk Assessment */}
          {caseStudy.riskAssessment && caseStudy.riskAssessment.length > 0 && (
            <Box mb={5}>
              <Typography variant="h5" gutterBottom mb={3} sx={{ color: '#001f3f' }}>
                Risk Assessment
              </Typography>
              <DashboardCard>
                <CardContent sx={{ p: 0 }}>
                  <Grid container spacing={1} sx={{ p: 2 }}>
                    {caseStudy.riskAssessment.map((risk, index) => (
                      <Grid item xs={12} md={6} key={index}>
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
                </CardContent>
              </DashboardCard>
          </Box>
          )}

        {/* Business Case & ROI */}
          <Box id="business-case" mb={6}>
            <BusinessCaseSection
              title="Business Case & ROI Analysis"
              businessCase={caseStudy.businessCase}
              swot={caseStudy.swot}
            />
          </Box>

        {/* Product Vision & MVP Strategy */}
          <Box id="product-vision" mb={6}>
            <Typography variant="h5" gutterBottom mb={3} sx={{ color: '#001f3f' }}>
              Product Vision & MVP Strategy
            </Typography>
          <DashboardCard>
            <CardContent>
              <Box mb={6}>
                <Typography variant="h6" gutterBottom>
                  Vision Statement
                </Typography>
                <Typography variant="body1" fontStyle="italic" color="black">
                  "{caseStudy.productVision.visionStatement}"
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Strategic Objectives
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

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Success Metrics & KPIs
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {caseStudy.productVision.successMetrics.map((metric, index) => (
                  <Chip key={index} label={metric} size="small" variant="outlined" />
                ))}
              </Box>
            </CardContent>
          </DashboardCard>
          </Box>

          {/* Product Decisions & Trade-offs */}
          {caseStudy.productDecisions && caseStudy.productDecisions.length > 0 && (
            <Box id="product-decisions" mb={6}>
              <ProductDecisionsSection
                title="Product Decisions & Trade-offs"
                decisions={caseStudy.productDecisions}
              />
            </Box>
          )}

        {/* User Research & Insights */}
          <Box id="user-research" mb={6}>
            <Typography variant="h5" gutterBottom mb={3} sx={{ color: '#001f3f' }}>
              User Research & Insights
            </Typography>
            <DashboardCard>
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
                <Grid item xs={12}>
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
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    User Personas
                  </Typography>
                  <Grid container spacing={3}>
                    {caseStudy.userResearch.personas.map((persona, index) => (
                      <Grid item xs={12} key={index}>
                        <PersonaCard persona={persona} index={index} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </DashboardCard>
          </Box>

          {/* Design Process */}
          <Box id="design-process" mb={6}>
            <DesignProcessSection
            title="Design Process"
            designProcess={caseStudy.designProcess}
          />
          </Box>

          {/* User Flow Diagram */}
          {caseStudy.designProcess?.userFlows && caseStudy.designProcess.userFlows.length > 0 && (
            <Box id="user-flow" mb={6}>
              <Typography variant="h5" gutterBottom mb={3} sx={{ color: '#001f3f' }}>
                User Flow Diagram
              </Typography>
              <DashboardCard>
                <CardContent sx={{ p: 0 }}>
                  <Typography variant="body1" paragraph mb={4} sx={{ px: 2, pt: 2 }}>
                    Visual representation of the key user flows in the AirOps platform:
                  </Typography>
                  <Grid container spacing={4} sx={{ px: 2, pb: 2 }}>
                    {caseStudy.designProcess.userFlows.map((flowDescription, index) => {
                      // Parse flow description to extract title and steps
                      const [title, ...stepDescriptions] = flowDescription.split(': ');
                      const steps = stepDescriptions.length > 0 
                        ? stepDescriptions[0].split(' → ').map((step, i) => ({
                            name: step.trim(),
                            description: `Step ${i + 1} in ${title.toLowerCase()} flow`
                          }))
                        : [
                            { name: 'Start', description: 'User initiates flow' },
                            { name: 'Action', description: 'User performs main action' },
                            { name: 'Review', description: 'User reviews information' },
                            { name: 'Complete', description: 'Flow completed successfully' }
                          ];
                      
                      return (
                        <Grid item xs={12} key={index}>
                          <UserFlowDiagram
                            title={title}
                            steps={steps}
                          />
                        </Grid>
                      );
                    })}
              </Grid>
            </CardContent>
          </DashboardCard>
          </Box>
          )}

        {/* Product Roadmap */}
          <Box id="product-roadmap" mb={6}>
          <RoadmapSection
            title="Product Roadmap"
            phases={caseStudy.roadmap}
            showTimeline={true}
            showDetailedBreakdown={false}
            timelineTitle=""
            columnsPerRow={2}
          />
          
          {/* Launch Phases */}
          {caseStudy.goToMarket?.launchPhases && caseStudy.goToMarket.launchPhases.length > 0 && (
            <Box mt={4}>
              <Typography variant="h5" gutterBottom mb={3} sx={{ color: '#001f3f' }}>
                Launch Phases
              </Typography>
              <DashboardCard>
                <CardContent>
                  <Grid container spacing={2}>
                    {caseStudy.goToMarket.launchPhases.map((phase, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <Paper elevation={1} sx={{ p: 2 }}>
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="subtitle1" fontWeight="bold">{phase.phase}</Typography>
                            <Chip label={phase.duration} size="small" color="primary" />
                          </Box>
                          <Typography variant="body2" color="text.secondary" paragraph>
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
                </CardContent>
              </DashboardCard>
            </Box>
          )}
          </Box>

        {/* Requirements & User Stories */}
          <Box id="requirements" mb={6}>
            <RequirementsSection
            title="Requirements & User Stories"
            epics={caseStudy.requirements.epics}
          />
          </Box>

        {/* Technical Architecture */}
          <Box id="technical-architecture" mb={6}>
            <Typography variant="h5" gutterBottom mb={3} sx={{ color: '#001f3f' }}>
              Technical Architecture
            </Typography>
          <DashboardCard>
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
          </Box>

          {/* Sprint Metrics & Velocity */}
          <Box id="sprint-metrics" mb={6}>
            <SprintMetricsSection
            title="Sprint Metrics & Velocity"
            currentSprint={caseStudy.sprintMetrics.currentSprint}
            velocityHistory={caseStudy.sprintMetrics.velocityHistory}
            epics={caseStudy.requirements?.epics || []}
            userStories={caseStudy.sprintMetrics.userStories || []}
            burnDownData={caseStudy.sprintMetrics.burnDownData || []}
            backlogManagement={caseStudy.backlogManagement}
            />
          </Box>

          {/* QA & Testing */}
          <Box id="qa-testing" mb={6}>
            <QATestingSection
            title="QA & Testing Strategy"
            testingApproach={caseStudy.qaAndTesting.testingApproach}
            testScenarios={caseStudy.qaAndTesting.testScenarios}
            bugMetrics={caseStudy.qaAndTesting.bugMetrics}
            acceptanceCriteria={caseStudy.qaAndTesting.acceptanceCriteria}
          />
          </Box>

          {/* DevOps & Security */}
          <Box id="devops-security" mb={6}>
            <DevOpsSecuritySection
            title="Process & Compliance"
            cicdPipeline={caseStudy.devOpsSecurity.cicdPipeline}
            securityScans={caseStudy.devOpsSecurity.securityScans}
            codeQuality={caseStudy.devOpsSecurity.codeQuality}
          />
          
          {/* Communication Plan & Training Strategy */}
          {caseStudy.goToMarket && (
            <Box mt={4}>
              <Grid container spacing={3}>
                {caseStudy.goToMarket.communicationPlan && caseStudy.goToMarket.communicationPlan.length > 0 && (
                  <Grid item xs={12} md={6}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
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
                    </Paper>
                  </Grid>
                )}
                {caseStudy.goToMarket.trainingStrategy && caseStudy.goToMarket.trainingStrategy.length > 0 && (
                  <Grid item xs={12} md={6}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
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
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
          </Box>

        {/* Retrospectives */}
          <Box id="lessons-learned" mb={6}>
            <NotebookReflections
              title="Retrospectives"
              reflections={{
                stickyNotes: [
                  {
                    color: '#C8E6C9',
                    title: 'Key Insights',
                    content: caseStudy.lessonsLearned.insights.slice(0, 2).join(' • '),
                    icon: IconCheck
                  },
                  {
                    color: '#FFCCBC',
                    title: 'What I\'d Do Differently',
                    content: caseStudy.lessonsLearned.whatWouldDoDifferently.slice(0, 2).join(' • '),
                    icon: IconAlertTriangle
                  },
                  {
                    color: '#BBDEFB',
                    title: 'More Insights',
                    content: caseStudy.lessonsLearned.insights.slice(2).join(' • '),
                    icon: IconBulb
                  },
                  {
                    color: '#FFF9C4',
                    title: 'Additional Learnings',
                    content: caseStudy.lessonsLearned.whatWouldDoDifferently.slice(2).join(' • '),
                    icon: IconChartBar
                  }
                ],
                sketches: [
                  {
                    title: 'Key Takeaways',
                    items: caseStudy.lessonsLearned.keyTakeaways
                  },
                  {
                    title: 'Product Management Lessons',
                    items: [
                      'Product management in aviation requires deep understanding of operational constraints',
                      'Digital transformation is as much about people as it is about technology',
                      'Comprehensive documentation and planning are essential for large-scale initiatives',
                      'ROI must be clearly communicated to secure executive buy-in'
                    ]
                  }
                ],
                keyTakeaway: "Building products in complex industries like aviation requires balancing innovation with operational continuity. The most successful transformations happen when technology, people, and processes are aligned from day one."
              }}
          />
              </Box>

        </Grid>
      </Grid>

      {/* Back to Top Button */}
      <BackToTop />
    </PageContainer>
  );
};

export default AirOpsPage;

