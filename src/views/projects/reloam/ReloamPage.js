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
import ProblemStatementSection from '../../../components/sections/ProblemStatementSection.js';
import FeatureShowcaseSection from '../../../components/sections/FeatureShowcaseSection.js';
import RequirementsSection from '../../../components/sections/RequirementsSection.js';
import LessonsLearnedSection from '../../../components/sections/LessonsLearnedSection.js';
import ArtifactsSection from '../../../components/sections/ArtifactsSection.js';
import ProjectShowcaseSection from '../../../components/sections/ProjectShowcaseSection.js';
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
                    <Chip label={project.status.toUpperCase()} color="success" />
                    <Chip label={project.technology} />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Problem Discovery */}
        <Grid item xs={12}>
          <DashboardCard title="Problem Discovery">
            <CardContent>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Initial Insight (Q3 2024)
              </Typography>
              <Typography variant="body2" paragraph>
                Met with a <strong>{caseStudy.problemDiscovery.initialResearch.interviewSubject}</strong> divided among 20+ tenant farmers. Key frustrations:
              </Typography>
              {caseStudy.problemDiscovery.initialResearch.quotes && caseStudy.problemDiscovery.initialResearch.quotes.map((quote, index) => (
                <Box key={index} mb={1.5} p={1.5} bgcolor="grey.50" borderRadius={1}>
                  <Typography variant="body2" fontStyle="italic" color="text.secondary">
                    {quote}
                  </Typography>
                </Box>
              ))}
              <Box mt={2} mb={2} p={1.5} bgcolor="info.light" borderRadius={1}>
                <Typography variant="body2">
                  <strong>Key Insight:</strong> {caseStudy.problemDiscovery.initialResearch.insight}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Market Research
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={1} sx={{ p: 1.5 }}>
                    <Typography variant="h6">{caseStudy.problemDiscovery.marketResearch.platformsAnalyzed}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Existing platforms analyzed
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={1} sx={{ p: 1.5 }}>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Finding
                    </Typography>
                    <Typography variant="body2">{caseStudy.problemDiscovery.marketResearch.finding}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Problem Statement */}
        <Grid item xs={12}>
          <ProblemStatementSection
            title="Problem Statement"
            targetUser={caseStudy.problemStatement.targetUser}
            painPoints={[
              {
                number: 1,
                title: 'Tenant Relationship Management',
                items: caseStudy.problemStatement.painPoints.tenantManagement,
                color: 'error',
                iconColor: 'red'
              },
              {
                number: 2,
                title: 'Financial Visibility',
                items: caseStudy.problemStatement.painPoints.financialVisibility,
                color: 'warning.main',
                iconColor: 'orange'
              },
              {
                number: 3,
                title: 'Property Operations',
                items: caseStudy.problemStatement.painPoints.propertyOperations,
                color: 'info.main',
                iconColor: '#1976d2'
              }
            ]}
            opportunity={caseStudy.problemStatement.opportunity}
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

        {/* Technical Implementation */}
        <Grid item xs={12}>
          <DashboardCard title="Technical Implementation">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Technology Choices
              </Typography>
              <Grid container spacing={3} mb={3}>
                {Object.entries(caseStudy.technicalImplementation.technologyChoices).map(([category, data]) => (
                  <Grid item xs={12} md={6} key={category}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom textTransform="capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        <strong>Stack:</strong> {data.stack.join(', ')}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Rationale:</strong> {data.rationale}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Architecture Decisions
              </Typography>
              <List>
                {caseStudy.technicalImplementation.architectureDecisions.map((decision, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <IconCode size={20} color="#1976d2" />
                    </ListItemIcon>
                    <ListItemText primary={decision} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Project Showcase */}
        <Grid item xs={12}>
          <ProjectShowcaseSection
            title="Project Showcase"
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

        {/* Lessons Learned */}
        <Grid item xs={12}>
          <LessonsLearnedSection
            title="Product Owner Lessons"
            whatILearned={caseStudy.lessonsLearned.whatILearned}
            whatWouldDoDifferently={caseStudy.lessonsLearned.whatWouldDoDifferently}
            skillsDemonstrated={caseStudy.lessonsLearned.skillsDemonstrated}
            keyTakeaways={caseStudy.lessonsLearned.keyTakeaways}
          />
        </Grid>

        {/* Artifacts */}
        <Grid item xs={12}>
          <ArtifactsSection
            title="Artifacts"
            artifacts={caseStudy.artifacts}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ReloamPage;

