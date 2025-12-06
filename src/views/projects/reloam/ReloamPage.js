import React from 'react';
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
  Divider,
  Paper,
  Stack
} from '@mui/material';
import {
  IconCheck,
  IconCalendar,
  IconChartBar,
  IconRocket,
  IconAlertTriangle,
  IconFileText,
  IconExternalLink,
  IconCode,
  IconBulb,
  IconTrendingUp,
  IconUsers,
  IconWorld
} from '@tabler/icons';
import PageContainer from '../../../components/container/PageContainer.js';
import DashboardCard from '../../../components/shared/DashboardCard.js';
import UserFlowDiagram from '../../../components/diagrams/UserFlowDiagram';
import PageTableOfContents from '../../../components/navigation/PageTableOfContents.js';
import BackToTop from '../../../components/navigation/BackToTop.js';
import {
  ProjectHeroSection,
  ProblemDiscoverySection,
  TechnicalArchitectureSection,
  RequirementsSection,
  NotebookReflections,
  ProjectShowcaseSection,
  DesignProcessSection,
  SprintMetricsSection,
  QATestingSection,
  DevOpsSecuritySection,
  BacklogManagementSection
} from '../../../components/sections';
import { reloamProjectData } from '../../../data/projects/reloam.js';

const ReloamPage = () => {
  const project = reloamProjectData;
  const caseStudy = project.caseStudy;

  // Define table of contents sections
  const tocSections = [
    { id: 'project-showcase', title: 'Project Showcase', level: 1 },
    { id: 'key-stats', title: 'Key Stats', level: 1 },
    { id: 'problem-discovery', title: 'Problem Discovery & Solution', level: 1 },
    { id: 'product-vision', title: 'Product Vision & MVP Strategy', level: 1 },
    { id: 'user-research', title: 'User Research & Insights', level: 1 },
    { id: 'requirements', title: 'Requirements & User Stories', level: 1 },
    { id: 'sprint-metrics', title: 'Sprint Metrics & Velocity', level: 1 },
    { id: 'backlog-management', title: 'Backlog Management', level: 1 },
    { id: 'qa-testing', title: 'QA & Testing Strategy', level: 1 },
    { id: 'devops-security', title: 'DevOps & Security', level: 1 },
    { id: 'product-decisions', title: 'Product Decisions & Trade-offs', level: 1 },
    { id: 'technical-architecture', title: 'Technical Architecture', level: 1 },
    { id: 'design-process', title: 'Design Process', level: 1 },
    { id: 'user-flow', title: 'User Flow Diagram', level: 1 },
    { id: 'validation', title: 'Validation & Next Steps', level: 1 },
    { id: 'retrospective', title: 'Retrospective', level: 1 }
  ];

  return (
    <PageContainer 
      title={project.name} 
      description={project.description}
      action={
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            startIcon={<IconExternalLink size={16} />}
            href="https://ld.reloam.ainaeco.uk/"
            target="_blank"
            rel="noopener noreferrer"
            size="small"
          >
            Landlord Portal
          </Button>
          <Button
            variant="outlined"
            startIcon={<IconExternalLink size={16} />}
            href="https://tn.reloam.ainaeco.uk/"
            target="_blank"
            rel="noopener noreferrer"
            size="small"
          >
            Tenant Portal
          </Button>
        </Box>
      }
    >
      <Grid container spacing={3}>
        {/* Table of Contents - Sidebar */}
        <Grid item xs={12} md={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <PageTableOfContents sections={tocSections} />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          {/* Hero Section */}
          <Box id="hero-section" mb={3}>
            <ProjectHeroSection
            name={project.name}
            description={project.description}
            role={project.role}
            timeline={project.timeline}
            value="Solving $2B PropTech market gap in Africa"
            tags={project.tech_stack}
            showDeployment={true}
            deploymentStatus={{
              status: 'deployed',
              environment: 'beta',
              timestamp: '2024-12-15'
            }}
          />
          </Box>

          {/* Project Showcase */}
          <Box id="project-showcase" mb={3}>
            <ProjectShowcaseSection
            repository={{
              name: 'alfa2267/reloam-landing',
              full_name: 'alfa2267/reloam-landing',
              url: 'https://github.com/alfa2267/reloam-landing',
              stars: 0,
              stargazers_count: 0,
              language: 'TypeScript',
              updated_at: '2024-12-15T00:00:00Z',
              tech_stack: project.tech_stack,
              features: project.features
            }}
            demoImage={{
              url: `https://raw.githubusercontent.com/alfa2267/reloam-landing/main/demo.png`,
              alt: 'Reloam Demo',
              description: 'Overview of the Reloam platform'
            }}
            screenshots={[
              {
                url: 'https://raw.githubusercontent.com/alfa2267/reloam-landing/main/screenshots/login-landlord.png',
                title: 'Landlord Login Page',
                description: 'Sign-in interface for landlords at https://ld.reloam.ainaeco.uk/',
                type: 'screenshot',
                link: 'https://ld.reloam.ainaeco.uk/'
              },
              {
                url: 'https://raw.githubusercontent.com/alfa2267/reloam-landing/main/screenshots/dashboard.png',
                title: 'Landlord Dashboard',
                description: 'Main dashboard view showing tenant overview and financial summary',
                type: 'screenshot',
                link: 'https://ld.reloam.ainaeco.uk/'
              },
              {
                url: 'https://raw.githubusercontent.com/alfa2267/reloam-landing/main/screenshots/tenant-management.png',
                title: 'Tenant Management',
                description: 'Tenant list and profile management interface',
                type: 'screenshot',
                link: 'https://ld.reloam.ainaeco.uk/'
              },
              {
                url: 'https://raw.githubusercontent.com/alfa2267/reloam-landing/main/screenshots/financial-tracking.png',
                title: 'Financial Tracking',
                description: 'Rent collection and payment history tracking',
                type: 'screenshot'
              },
              {
                url: 'https://raw.githubusercontent.com/alfa2267/reloam-landing/main/screenshots/activity-log.png',
                title: 'Activity Log',
                description: 'Property activity logging and timeline view',
                type: 'screenshot'
              },
              {
                url: 'https://raw.githubusercontent.com/alfa2267/reloam-landing/main/screenshots/reports.png',
                title: 'Reports Dashboard',
                description: 'Financial summaries and analytics',
                type: 'screenshot'
              }
            ]}
            wireframes={[
              {
                title: 'Initial Wireframes',
                description: 'Wireframe: Dashboard Layout',
                icon: 'desktop',
                type: 'wireframe'
              },
              {
                title: 'User Flow Mockups',
                description: 'Mockup: Tenant Onboarding Flow',
                icon: 'document',
                type: 'mockup'
              }
            ]}
            showRepository={true}
            showDemoImage={true}
            showScreenshots={true}
            showWireframes={true}
            showTitle={false}
            screenshotsView="gallery"
          />
          </Box>

          {/* Key Stats */}
          <Box id="key-stats" mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <IconTrendingUp size={32} color="#1976d2" style={{ marginBottom: 8 }} />
                  <Typography variant="h4" color="primary" gutterBottom>
                    $2B
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Market Gap
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <IconRocket size={32} color="#2e7d32" style={{ marginBottom: 8 }} />
                  <Typography variant="h4" color="success.main" gutterBottom>
                    Beta
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Deployment Status
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <IconUsers size={32} color="#ed6c02" style={{ marginBottom: 8 }} />
                  <Typography variant="h4" color="warning.main" gutterBottom>
                    5-10
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Beta Landlords
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <IconWorld size={32} color="#9c27b0" style={{ marginBottom: 8 }} />
                  <Typography variant="h4" color="secondary" gutterBottom>
                    2024
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Launch Year
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* Problem Discovery & Solution */}
          <Box id="problem-discovery" mb={3}>
            <ProblemDiscoverySection
            title="Problem Discovery & Solution"
            problemStatement={{
              description: `After interviewing a ${caseStudy.problemDiscovery.initialResearch.interviewSubject}, I discovered a significant gap: existing property management tools focus on residential/commercial real estate. Agricultural properties have unique needs that aren't being served.`,
              challenges: [
                'Contract tracking across 20+ tenants (paper-based, prone to loss)',
                'No centralized communication channel',
                'Manual rent collection tracking (error-prone)',
                'No system for maintenance requests',
                'Can\'t track land utilization or productivity per plot'
              ],
              impact: [
                'Landlords spend 2 full days every month just tracking rent in notebooks and WhatsApp',
                'No real-time view of outstanding payments or portfolio financial health',
                'Maintenance issues discovered weeks late, affecting tenant harvests',
                'Missing data for strategic decisions (which crops, which tenants)'
              ],
              userPainPoints: caseStudy.problemDiscovery.initialResearch.quotes
            }}
            solutionOverview={{
              description: 'A digital platform empowering agricultural landlords to efficiently manage large-scale properties through tenant relationship management, financial operations, and activity tracking.',
              approach: [
                'Web-first MVP optimized for desktop data entry and reporting',
                'Manual payment tracking (validates core value without complex integrations)',
                'Single-tenant architecture for faster development and better security',
                'Focus on 80/20 principle: core workflows that solve 80% of pain with 20% of features'
              ],
              keyFeatures: [
                'Tenant database with profiles',
                'Rent payment tracking',
                'Financial reports',
                'Activity logging',
                'Dashboard overview'
              ],
              valueProposition: 'Transform chaotic notebook-based property management into organized, data-driven decision-making with clear visibility into tenants, finances, and property operations.'
            }}
            successCriteria={[
              { value: '5-10', label: 'Beta Landlords' },
              { value: '80%', label: 'Time Saved' },
              { value: '0', label: 'Paper Tracking' },
              { value: '$2B', label: 'Market Gap' }
            ]}
          />
          </Box>

        {/* Product Vision & MVP Strategy */}
          <Box id="product-vision" mb={3}>
          <DashboardCard title="Product Vision & MVP Strategy">
            <CardContent>
              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Vision Statement
                </Typography>
                <Typography variant="body1" fontStyle="italic" color="black">
                    "{caseStudy.productVision.visionStatement}"
                  </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                MVP Scope Decisions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={2} sx={{ p: 2, border: '2px solid', borderColor: 'success.main' }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <IconCheck size={20} color="green" style={{ marginRight: 8 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        MUST HAVE (Phase 1 - Built)
                      </Typography>
                    </Box>
                    <List dense>
                      {caseStudy.productVision.mvpScope.mustHave.items.map((item, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <IconCheck size={14} color="green" />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                    <Typography variant="caption" color="text.secondary" mt={1} display="block">
                      <strong>Rationale:</strong> {caseStudy.productVision.mvpScope.mustHave.rationale}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <IconCalendar size={20} style={{ marginRight: 8 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        SHOULD HAVE (Phase 2 - Planned)
                      </Typography>
                    </Box>
                    <List dense>
                      {caseStudy.productVision.mvpScope.shouldHave.items.map((item, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <IconFileText size={14} />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                    <Typography variant="caption" color="text.secondary" mt={1} display="block">
                      <strong>Rationale:</strong> {caseStudy.productVision.mvpScope.shouldHave.rationale}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <IconBulb size={20} style={{ marginRight: 8 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        COULD HAVE (Phase 3 - Future)
                      </Typography>
                    </Box>
                    <List dense>
                      {caseStudy.productVision.mvpScope.couldHave.items.map((item, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <IconBulb size={14} />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                    <Typography variant="caption" color="text.secondary" mt={1} display="block">
                      <strong>Rationale:</strong> {caseStudy.productVision.mvpScope.couldHave.rationale}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2, bgcolor: 'grey.100' }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <IconAlertTriangle size={20} style={{ marginRight: 8 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        WON'T HAVE (Out of Scope)
                      </Typography>
                    </Box>
                    <List dense>
                      {caseStudy.productVision.mvpScope.wontHave.items.map((item, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <IconAlertTriangle size={14} />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                    <Typography variant="caption" color="text.secondary" mt={1} display="block">
                      <strong>Rationale:</strong> {caseStudy.productVision.mvpScope.wontHave.rationale}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </DashboardCard>
          </Box>

          {/* User Research & Insights */}
          <Box id="user-research" mb={3}>
            <DashboardCard title="User Research & Insights">
              <CardContent>
                <Grid container spacing={1} mb={2}>
                  <Grid item xs={6} sm={3}>
                    <Paper elevation={1} sx={{ p: 1.5, textAlign: 'center' }}>
                      <Typography variant="h5">1</Typography>
                      <Typography variant="caption">Landlord Interview</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper elevation={1} sx={{ p: 1.5, textAlign: 'center' }}>
                      <Typography variant="h5">5</Typography>
                      <Typography variant="caption">Platforms Analyzed</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper elevation={1} sx={{ p: 1.5, textAlign: 'center' }}>
                      <Typography variant="h5">4</Typography>
                      <Typography variant="caption">Key Pain Points</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper elevation={1} sx={{ p: 1.5, textAlign: 'center' }}>
                      <Typography variant="h5">$2B</Typography>
                      <Typography variant="caption">Market Gap</Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                      Key Insights
                    </Typography>
                    <List dense>
                      <ListItem disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <IconChartBar size={16} color="#1976d2" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={caseStudy.problemDiscovery.initialResearch.insight} 
                          primaryTypographyProps={{ variant: 'body2' }} 
                        />
                      </ListItem>
                      <ListItem disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <IconChartBar size={16} color="#1976d2" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={`Market research: ${caseStudy.problemDiscovery.marketResearch.platformsAnalyzed} platforms analyzed - ${caseStudy.problemDiscovery.marketResearch.finding}`}
                          primaryTypographyProps={{ variant: 'body2' }} 
                        />
                      </ListItem>
                      <ListItem disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <IconChartBar size={16} color="#1976d2" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={caseStudy.problemDiscovery.marketResearch.opportunity}
                          primaryTypographyProps={{ variant: 'body2' }} 
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                      User Quotes
                    </Typography>
                    <List dense>
                      {caseStudy.problemDiscovery.initialResearch.quotes.map((quote, index) => (
                        <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                          <Paper elevation={1} sx={{ p: 1.5, width: '100%' }}>
                            <Typography variant="body2" fontStyle="italic" color="text.secondary">
                              {quote}
                            </Typography>
                          </Paper>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Target User Profile
                </Typography>
                <Paper elevation={1} sx={{ p: 2, mt: 1 }}>
                  <Typography variant="body2" paragraph>
                    <strong>Primary User:</strong> {caseStudy.problemDiscovery.initialResearch.interviewSubject}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Target Segment:</strong> {caseStudy.problemStatement.targetUser}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Opportunity:</strong> {caseStudy.problemStatement.opportunity}
                  </Typography>
                </Paper>
              </CardContent>
            </DashboardCard>
          </Box>

          {/* Requirements & User Stories */}
          <Box id="requirements" mb={3}>
            <RequirementsSection
            title="Requirements & User Stories"
            epics={caseStudy.requirements.epics}
          />
          </Box>

          {/* Sprint Metrics & Velocity */}
          <Box id="sprint-metrics" mb={3}>
            <SprintMetricsSection
            title="Sprint Metrics & Velocity"
            currentSprint={caseStudy.sprintMetrics.currentSprint}
            velocityHistory={caseStudy.sprintMetrics.velocityHistory}
            sprintGoal={caseStudy.sprintMetrics.sprintGoal}
          />
          </Box>

          {/* Backlog Management */}
          <Box id="backlog-management" mb={3}>
            <BacklogManagementSection
            title="Backlog Management & Prioritization"
            prioritizationFramework={caseStudy.backlogManagement.prioritizationFramework}
            backlogHealth={caseStudy.backlogManagement.backlogHealth}
            technicalDebt={caseStudy.backlogManagement.technicalDebt}
            refinementNotes={caseStudy.backlogManagement.refinementNotes}
          />
          </Box>

          {/* QA & Testing */}
          <Box id="qa-testing" mb={3}>
            <QATestingSection
            title="QA & Testing Strategy"
            testingApproach={caseStudy.qaAndTesting.testingApproach}
            testScenarios={caseStudy.qaAndTesting.testScenarios}
            bugMetrics={caseStudy.qaAndTesting.bugMetrics}
            acceptanceCriteria={caseStudy.qaAndTesting.acceptanceCriteria}
          />
          </Box>

          {/* DevOps & Security */}
          <Box id="devops-security" mb={3}>
            <DevOpsSecuritySection
            title="DevOps & Security"
            cicdPipeline={caseStudy.devOpsSecurity.cicdPipeline}
            securityScans={caseStudy.devOpsSecurity.securityScans}
            codeQuality={caseStudy.devOpsSecurity.codeQuality}
          />
          </Box>

          {/* Product Decisions & Trade-offs */}
          <Box id="product-decisions" mb={3}>
            <Typography variant="h5" gutterBottom>
              Product Decisions & Trade-offs
            </Typography>
            <Stack spacing={2}>
            {caseStudy.productDecisions.map((decision, index) => (
                  <Paper key={index} elevation={2} sx={{ p: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6">{decision.decision}</Typography>
                      <Chip label={decision.date} size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      <strong>Context:</strong> {decision.context}
                    </Typography>
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
                    <Box mt={2} p={2} bgcolor="success.light" borderRadius={1}>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        Decision: {decision.choice}
                      </Typography>
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
                    </Box>
                    <Grid container spacing={2} mt={2}>
                      <Grid item xs={12} md={6}>
                        <Paper elevation={1} sx={{ p: 1.5, bgcolor: 'success.light' }}>
                          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                            ✅ Benefit:
                          </Typography>
                          <Typography variant="body2">{decision.tradeoffs.benefit}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Paper elevation={1} sx={{ p: 1.5, bgcolor: 'warning.light' }}>
                          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                            ❌ Cost:
                          </Typography>
                          <Typography variant="body2">{decision.tradeoffs.cost}</Typography>
                        </Paper>
                      </Grid>
                    </Grid>
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

          {/* Technical Architecture */}
          <Box id="technical-architecture" mb={3}>
            <TechnicalArchitectureSection
            title="Technical Architecture"
            overview="MVP architecture optimized for fast iteration and learning, with a focus on simplicity over complexity while maintaining scalability for future growth."
            architecture={{
              title: "MVP System Architecture",
              components: [
                { name: 'Web App', type: 'client', layer: 'client', color: '#1976d2' },
                { name: 'React Frontend', type: 'gateway', layer: 'gateway', color: '#2e7d32' },
                { name: 'LocalStorage', type: 'database', layer: 'database', color: '#9c27b0' }
              ]
            }}
            technologyStack={{
              frontend: caseStudy.technicalImplementation.technologyChoices.frontend.stack,
              styling: caseStudy.technicalImplementation.technologyChoices.styling.stack,
              stateManagement: caseStudy.technicalImplementation.technologyChoices.stateManagement.stack,
              dataPersistence: caseStudy.technicalImplementation.technologyChoices.dataPersistence.stack
            }}
            keyDecisions={[
              'Component-based architecture for reusability and maintainability',
              'TypeScript for type safety and better developer experience',
              'LocalStorage for MVP data persistence (no backend needed, fast iteration)',
              'Web-first approach for desktop optimization (landlords spend 80% of time at desk)',
              'Single-tenant architecture for simpler data model and better security',
              'Modular component structure to enable future migration to multi-tenant SaaS'
            ]}
          />
          </Box>

          {/* Design Process */}
          <Box id="design-process" mb={3}>
            <DesignProcessSection
            title="Design Process"
            designProcess={caseStudy.designProcess}
          />
          </Box>

          {/* User Flow Diagram */}
          <Box id="user-flow" mb={3}>
            <DashboardCard title="User Flow Diagram">
            <CardContent>
              <Typography variant="body1" paragraph mb={4}>
                Visual representation of the key user flows in the Reloam platform:
              </Typography>
              
              <Grid container spacing={4}>
                {/* Tenant Onboarding Flow */}
                <Grid item xs={12}>
                  <UserFlowDiagram
                    title="Tenant Onboarding Flow"
                    steps={[
                      {
                        name: 'Navigate',
                        description: 'Go to Tenant Management page'
                      },
                      {
                        name: 'Add Tenant',
                        description: 'Click "Add New Tenant" button'
                      },
                      {
                        name: 'Enter Details',
                        description: 'Fill in name, contact, plot number'
                      },
                      {
                        name: 'Set Terms',
                        description: 'Configure rental terms and payment schedule'
                      },
                      {
                        name: 'Save',
                        description: 'Save tenant profile'
                      },
                      {
                        name: 'Complete',
                        description: 'Tenant appears in list as Active'
                      }
                    ]}
                  />
                </Grid>

                {/* Rent Payment Recording Flow */}
                <Grid item xs={12}>
                  <UserFlowDiagram
                    title="Rent Payment Recording Flow"
                    steps={[
                      {
                        name: 'Select Tenant',
                        description: 'Choose tenant from dashboard'
                      },
                      {
                        name: 'Record Payment',
                        description: 'Click "Record Payment" button'
                      },
                      {
                        name: 'Enter Details',
                        description: 'Input payment amount and date'
                      },
                      {
                        name: 'Submit',
                        description: 'Save payment record'
                      },
                      {
                        name: 'Update Status',
                        description: 'Tenant status shows "Paid"'
                      },
                      {
                        name: 'Dashboard Update',
                        description: 'Dashboard reflects new payment'
                      }
                    ]}
                  />
                </Grid>

                {/* Activity Logging Flow */}
                <Grid item xs={12}>
                  <UserFlowDiagram
                    title="Activity Logging Flow"
                    steps={[
                      {
                        name: 'Navigate',
                        description: 'Go to Activity Log page'
                      },
                      {
                        name: 'Select Property',
                        description: 'Choose property or tenant'
                      },
                      {
                        name: 'Log Activity',
                        description: 'Click "Add Activity" button'
                      },
                      {
                        name: 'Enter Details',
                        description: 'Fill in activity type, date, description'
                      },
                      {
                        name: 'Save',
                        description: 'Save activity entry'
                      },
                      {
                        name: 'View Timeline',
                        description: 'Activity appears in timeline view'
                      }
                    ]}
                  />
                </Grid>

                {/* Financial Reporting Flow */}
                <Grid item xs={12}>
                  <UserFlowDiagram
                    title="Financial Reporting Flow"
                    steps={[
                      {
                        name: 'Navigate',
                        description: 'Go to Reports page'
                      },
                      {
                        name: 'Select Range',
                        description: 'Choose date range (e.g., current month)'
                      },
                      {
                        name: 'Generate',
                        description: 'Click "Generate Report"'
                      },
                      {
                        name: 'Review',
                        description: 'Verify calculations and totals'
                      },
                      {
                        name: 'Export',
                        description: 'Export to CSV if needed'
                      },
                      {
                        name: 'Complete',
                        description: 'Report shows paid vs outstanding'
                      }
                    ]}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </DashboardCard>
          </Box>

          {/* Validation & Next Steps */}
          <Box id="validation" mb={3}>
            <DashboardCard title="Validation & Next Steps">
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Current Status
                  </Typography>
                  <List>
                    {caseStudy.validation.currentStatus.map((status, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <IconCheck size={20} color="green" />
                        </ListItemIcon>
                        <ListItemText primary={status} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Planned Validation
                  </Typography>
                  <List>
                    {caseStudy.validation.plannedValidation.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <IconChartBar size={20} color="#1976d2" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Next Steps (if Validated)
              </Typography>
              <List>
                {caseStudy.validation.nextSteps.map((step, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <IconRocket size={20} color="#1976d2" />
                    </ListItemIcon>
                    <ListItemText primary={step} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </DashboardCard>
          </Box>

          {/* Product Owner Reflections */}
          <Box id="retrospective" mb={3}>
            <NotebookReflections
            title="Retrospective"
            reflections={{
              stickyNotes: [
                {
                  color: '#FFF9C4',
                  title: 'User Research Gap',
                  content: 'Built MVP with 1 interview. Should have done 10-15 first. Risk: building features users don\'t need.',
                  icon: IconAlertTriangle
                },
                {
                  color: '#FFCCBC',
                  title: 'MVPs Should Be Simpler',
                  content: 'Built more features than needed. Could have started with just tenant tracking + payment logging.',
                  icon: IconBulb
                },
                {
                  color: '#C8E6C9',
                  title: 'What Worked',
                  content: 'Prototyping would have saved 3 weeks of dev time. Clickable prototypes > code for early validation.',
                  icon: IconCheck
                },
                {
                  color: '#BBDEFB',
                  title: 'Define Success Upfront',
                  content: 'Missing validation criteria. How do I know if it\'s succeeding? Need metrics from day 1.',
                  icon: IconChartBar
                }
              ],
              sketches: [
                {
                  title: 'Key Product Lessons',
                  items: [
                    'Always do 10+ user interviews before building',
                    'Ship fastest path to validation, add features only after users confirm value',
                    'Define success metrics before building (e.g., "5 landlords use it weekly for 3 months")',
                    'Start with sketches → wireframes → prototypes. Only code once validated.'
                  ]
                },
                {
                  title: 'Skills I Demonstrated',
                  items: [
                    'Problem Discovery - Identified market gap through user interviews',
                    'Product Strategy - Created phased roadmap (MVP → Growth → Scale)',
                    'Requirements Management - Translated pain points into user stories',
                    'Technical Fluency - Built with React/TypeScript, made architecture decisions',
                    'Self-Awareness - Honest reflection on what could be improved'
                  ]
                }
              ],
              timeline: caseStudy.lessonsLearned.whatWouldDoDifferently.timeline.map(phase => ({
                phase: `${phase.week}: ${phase.activity}`,
                items: phase.tasks
              })),
              keyTakeaway: "Building products is about learning, not just shipping. The riskiest assumption is that you know what users want. Always validate early and often. A week of user research saves months of wasted development."
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

export default ReloamPage;

