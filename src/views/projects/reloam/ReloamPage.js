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
  IconBulb
} from '@tabler/icons';
import PageContainer from '../../../components/container/PageContainer.js';
import DashboardCard from '../../../components/shared/DashboardCard.js';
import UserFlowDiagram from '../../../components/diagrams/UserFlowDiagram.js';
import {
  ProjectHeroSection,
  ProblemDiscoverySection,
  TechnicalArchitectureSection,
  FeatureShowcaseSection,
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
        {/* Hero Section */}
        <Grid item xs={12}>
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
        </Grid>

        {/* Project Showcase */}
        <Grid item xs={12}>
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
        </Grid>

        {/* Problem Discovery & Solution */}
        <Grid item xs={12}>
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
        </Grid>

        {/* Product Vision & MVP Strategy */}
        <Grid item xs={12}>
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
        </Grid>

        {/* Requirements & User Stories */}
        <Grid item xs={12}>
          <RequirementsSection
            title="Requirements & User Stories"
            epics={caseStudy.requirements.epics}
          />
        </Grid>

        {/* Sprint Metrics & Velocity */}
        <Grid item xs={12}>
          <SprintMetricsSection
            title="Sprint Metrics & Velocity"
            currentSprint={caseStudy.sprintMetrics.currentSprint}
            velocityHistory={caseStudy.sprintMetrics.velocityHistory}
            sprintGoal={caseStudy.sprintMetrics.sprintGoal}
          />
        </Grid>

        {/* Backlog Management */}
        <Grid item xs={12}>
          <BacklogManagementSection
            title="Backlog Management & Prioritization"
            prioritizationFramework={caseStudy.backlogManagement.prioritizationFramework}
            backlogHealth={caseStudy.backlogManagement.backlogHealth}
            technicalDebt={caseStudy.backlogManagement.technicalDebt}
            refinementNotes={caseStudy.backlogManagement.refinementNotes}
          />
        </Grid>

        {/* QA & Testing */}
        <Grid item xs={12}>
          <QATestingSection
            title="QA & Testing Strategy"
            testingApproach={caseStudy.qaAndTesting.testingApproach}
            testScenarios={caseStudy.qaAndTesting.testScenarios}
            bugMetrics={caseStudy.qaAndTesting.bugMetrics}
            acceptanceCriteria={caseStudy.qaAndTesting.acceptanceCriteria}
          />
        </Grid>

        {/* DevOps & Security */}
        <Grid item xs={12}>
          <DevOpsSecuritySection
            title="DevOps & Security"
            cicdPipeline={caseStudy.devOpsSecurity.cicdPipeline}
            securityScans={caseStudy.devOpsSecurity.securityScans}
            codeQuality={caseStudy.devOpsSecurity.codeQuality}
          />
        </Grid>

        {/* Product Decisions & Trade-offs */}
        <Grid item xs={12}>
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
        </Grid>

        {/* Technical Architecture */}
        <Grid item xs={12}>
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
        </Grid>

        {/* Design Process */}
        <Grid item xs={12}>
          <DesignProcessSection
            title="Design Process"
            designProcess={caseStudy.designProcess}
          />
        </Grid>


        {/* User Flow Diagram */}
        <Grid item xs={12}>
          <DashboardCard title="User Flow Diagram">
            <CardContent>
              <UserFlowDiagram
                title="Reloam User Journey"
                steps={[
                  {
                    name: 'Login',
                    description: 'Landlord authentication'
                  },
                  {
                    name: 'Dashboard',
                    description: 'Overview of tenants and finances'
                  },
                  {
                    name: 'Manage Tenants',
                    description: 'Add/edit tenant profiles'
                  },
                  {
                    name: 'Track Payments',
                    description: 'Record and monitor rent collection'
                  },
                  {
                    name: 'View Reports',
                    description: 'Financial summaries and insights'
                  }
                ]}
              />
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Feature Showcase */}
        <Grid item xs={12}>
          <FeatureShowcaseSection
            title="What I Built - Feature Showcase"
            features={caseStudy.features}
          />
        </Grid>

        {/* Validation & Next Steps */}
        <Grid item xs={12}>
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
        </Grid>

        {/* Product Owner Reflections */}
        <Grid item xs={12}>
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
        </Grid>

      </Grid>
    </PageContainer>
  );
};

export default ReloamPage;

