import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  Skeleton,
  Paper,
  Divider
} from '@mui/material';
import {
  IconBrandGithub,
  IconCheck,
  IconCalendar,
  IconExternalLink,
  IconStar,
  IconCode,
  IconUsers,
  IconEye,
  IconFileText,
  IconBulb,
  IconAlertTriangle,
  IconChartBar
} from '@tabler/icons';
import ProjectService from '../../services/projectService.js';
import PageContainer from '../../components/container/PageContainer.js';
import DashboardCard from '../../components/shared/DashboardCard.js';
import DesignProcessSection from '../../components/sections/DesignProcessSection.js';
import ProjectShowcaseSection from '../../components/sections/ProjectShowcaseSection.js';
import ProblemDiscoverySection from '../../components/sections/ProblemDiscoverySection.js';
import RequirementsSection from '../../components/sections/RequirementsSection.js';

const ProjectPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const projectService = new ProjectService();
        const projectData = await projectService.getProjectBySlug(slug);
        
        if (!projectData) {
          setError('Project not found');
          return;
        }
        
        setProject(projectData);
        setError(null);
      } catch (err) {
        console.error('Error loading project:', err);
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadProject();
    }
  }, [slug]);

  if (loading) {
    return (
      <PageContainer title="Loading..." description="">
        <DashboardCard title="">
          <Box p={3}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="rectangular" height={200} sx={{ mt: 2 }} />
          </Box>
        </DashboardCard>
      </PageContainer>
    );
  }

  if (error || !project) {
    return (
      <PageContainer title="Project Not Found" description="">
        <DashboardCard title="Error">
          <Box p={3} textAlign="center">
            <Typography variant="h6" color="error">
              {error || 'Project not found'}
            </Typography>
          </Box>
        </DashboardCard>
      </PageContainer>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'maintenance': return 'warning';
      case 'archived': return 'error';
      default: return 'default';
    }
  };

  const renderRepoInfo = () => (
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
              {project.github_data.stargazers_count}
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

      <Box mb={3}>
        <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
          <IconCalendar size={16} />
          <Box component="span" ml={1}>
            Updated: {new Date(project.github_data.updated_at).toLocaleDateString()}
          </Box>
        </Typography>
      </Box>

      {project.tech_stack.length > 0 && (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Technology Stack
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
            {project.tech_stack.map((tech, index) => (
              <Chip key={index} label={tech} size="small" />
            ))}
          </Box>
        </Box>
      )}

      {project.features.length > 0 && (
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

  return (
    <PageContainer 
      title={project.name} 
      description={project.description}
      action={
        project.project_url && (
          <Button
            variant="contained"
            startIcon={<IconExternalLink size={16} />}
            href={project.project_url}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
          >
            View Demo
          </Button>
        )
      }
    >
      <Grid container spacing={3}>
        {/* Main Project Info */}
        <Grid item xs={12}>
          <DashboardCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                <Box>
                  <Typography variant="h4" gutterBottom>
                    {project.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {project.description}
                  </Typography>
                </Box>
                <Box display="flex" gap={1} alignItems="center">
                  <Chip 
                    label={project.status} 
                    color={getStatusColor(project.status)}
                    size="small"
                  />
                  <Chip 
                    label={project.category} 
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Key Stats */}
        {project.github_data && (
          <Grid item xs={12}>
            <Box id="key-stats" mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                    <IconStar size={32} color="#1976d2" style={{ marginBottom: 8 }} />
                    <Typography variant="h4" color="primary" gutterBottom>
                      {project.github_data.stargazers_count || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Stars
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                    <IconCode size={32} color="#2e7d32" style={{ marginBottom: 8 }} />
                    <Typography variant="h4" color="success.main" gutterBottom>
                      {project.github_data.language || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Language
                    </Typography>
                  </Paper>
                </Grid>
                {project.github_data.forks_count !== undefined && (
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                      <IconBrandGithub size={32} color="#ed6c02" style={{ marginBottom: 8 }} />
                      <Typography variant="h4" color="warning.main" gutterBottom>
                        {project.github_data.forks_count || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Forks
                      </Typography>
                    </Paper>
                  </Grid>
                )}
                {project.github_data.watchers_count !== undefined && (
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                      <IconEye size={32} color="#9c27b0" style={{ marginBottom: 8 }} />
                      <Typography variant="h4" color="secondary" gutterBottom>
                        {project.github_data.watchers_count || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Watchers
                      </Typography>
                    </Paper>
                  </Grid>
                )}
                {(!project.github_data.forks_count && !project.github_data.watchers_count) && (
                  <>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                        <IconCalendar size={32} color="#ed6c02" style={{ marginBottom: 8 }} />
                        <Typography variant="h4" color="warning.main" gutterBottom>
                          {project.github_data.updated_at ? new Date(project.github_data.updated_at).getFullYear() : 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Updated
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                        <IconCheck size={32} color="#9c27b0" style={{ marginBottom: 8 }} />
                        <Typography variant="h4" color="secondary" gutterBottom>
                          {project.status || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Status
                        </Typography>
                      </Paper>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          </Grid>
        )}

        {/* Problem Discovery & Solution */}
        {(project.caseStudy?.problemDiscovery || project.caseStudy?.executiveSummary) && (
          <Grid item xs={12}>
            <Box id="problem-discovery" mb={3}>
              <ProblemDiscoverySection
                title="Problem Discovery & Solution"
                problemStatement={
                  project.caseStudy?.problemDiscovery
                    ? {
                        description: project.caseStudy.problemDiscovery.initialResearch?.description || "",
                        challenges: project.caseStudy.problemDiscovery.problemStatement?.challenges || [],
                        impact: project.caseStudy.problemDiscovery.problemStatement?.impact || [],
                        userPainPoints: project.caseStudy.problemDiscovery.initialResearch?.quotes || []
                      }
                    : project.caseStudy?.executiveSummary
                    ? {
                        description: "Industry challenges:",
                        challenges: project.caseStudy.executiveSummary.problemStatement?.challenges || [],
                        impact: project.caseStudy.executiveSummary.problemStatement?.impact || []
                      }
                    : {}
                }
                solutionOverview={
                  project.caseStudy?.problemDiscovery
                    ? {
                        description: project.caseStudy.problemDiscovery.solutionOverview?.description || "",
                        approach: project.caseStudy.problemDiscovery.solutionOverview?.approach || [],
                        keyFeatures: project.caseStudy.problemDiscovery.solutionOverview?.keyFeatures || [],
                        valueProposition: project.caseStudy.problemDiscovery.solutionOverview?.valueProposition || ""
                      }
                    : project.caseStudy?.executiveSummary
                    ? {
                        description: project.caseStudy.executiveSummary.solutionOverview?.description || "",
                        approach: project.caseStudy.executiveSummary.solutionOverview?.technologyApproach || [],
                        keyFeatures: project.caseStudy.executiveSummary.solutionOverview?.components || [],
                        valueProposition: project.caseStudy.productVision?.visionStatement || ""
                      }
                    : {}
                }
                successCriteria={
                  project.caseStudy?.problemDiscovery?.successCriteria || []
                }
              />
            </Box>
          </Grid>
        )}

        {/* Product Vision & MVP Strategy */}
        {project.caseStudy?.productVision && (
          <Grid item xs={12}>
            <Box id="product-vision" mb={3}>
              <DashboardCard title="Product Vision & MVP Strategy">
                <CardContent>
                  <Box mb={3}>
                    <Typography variant="h6" gutterBottom>
                      Vision Statement
                    </Typography>
                    <Typography variant="body1" fontStyle="italic" color="black">
                      "{project.caseStudy.productVision.visionStatement}"
                    </Typography>
                  </Box>

                  {project.caseStudy.productVision.mvpScope && (
                    <>
                      <Divider sx={{ my: 3 }} />
                      <Typography variant="h6" gutterBottom>
                        MVP Scope Decisions
                      </Typography>
                      <Grid container spacing={2}>
                        {project.caseStudy.productVision.mvpScope.mustHave && (
                          <Grid item xs={12} md={6}>
                            <Paper elevation={2} sx={{ p: 2, border: '2px solid', borderColor: 'success.main' }}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconCheck size={20} color="green" style={{ marginRight: 8 }} />
                                <Typography variant="subtitle1" fontWeight="bold">
                                  MUST HAVE (Phase 1 - Built)
                                </Typography>
                              </Box>
                              <List dense>
                                {project.caseStudy.productVision.mvpScope.mustHave.items?.map((item, index) => (
                                  <ListItem key={index} disablePadding>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                      <IconCheck size={14} color="green" />
                                    </ListItemIcon>
                                    <ListItemText primary={item} />
                                  </ListItem>
                                ))}
                              </List>
                              {project.caseStudy.productVision.mvpScope.mustHave.rationale && (
                                <Typography variant="caption" color="text.secondary" mt={1} display="block">
                                  <strong>Rationale:</strong> {project.caseStudy.productVision.mvpScope.mustHave.rationale}
                                </Typography>
                              )}
                            </Paper>
                          </Grid>
                        )}
                        {project.caseStudy.productVision.mvpScope.shouldHave && (
                          <Grid item xs={12} md={6}>
                            <Paper elevation={1} sx={{ p: 2 }}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconCalendar size={20} style={{ marginRight: 8 }} />
                                <Typography variant="subtitle1" fontWeight="bold">
                                  SHOULD HAVE (Phase 2 - Planned)
                                </Typography>
                              </Box>
                              <List dense>
                                {project.caseStudy.productVision.mvpScope.shouldHave.items?.map((item, index) => (
                                  <ListItem key={index} disablePadding>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                      <IconFileText size={14} />
                                    </ListItemIcon>
                                    <ListItemText primary={item} />
                                  </ListItem>
                                ))}
                              </List>
                              {project.caseStudy.productVision.mvpScope.shouldHave.rationale && (
                                <Typography variant="caption" color="text.secondary" mt={1} display="block">
                                  <strong>Rationale:</strong> {project.caseStudy.productVision.mvpScope.shouldHave.rationale}
                                </Typography>
                              )}
                            </Paper>
                          </Grid>
                        )}
                        {project.caseStudy.productVision.mvpScope.couldHave && (
                          <Grid item xs={12} md={6}>
                            <Paper elevation={1} sx={{ p: 2 }}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconBulb size={20} style={{ marginRight: 8 }} />
                                <Typography variant="subtitle1" fontWeight="bold">
                                  COULD HAVE (Phase 3 - Future)
                                </Typography>
                              </Box>
                              <List dense>
                                {project.caseStudy.productVision.mvpScope.couldHave.items?.map((item, index) => (
                                  <ListItem key={index} disablePadding>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                      <IconBulb size={14} />
                                    </ListItemIcon>
                                    <ListItemText primary={item} />
                                  </ListItem>
                                ))}
                              </List>
                              {project.caseStudy.productVision.mvpScope.couldHave.rationale && (
                                <Typography variant="caption" color="text.secondary" mt={1} display="block">
                                  <strong>Rationale:</strong> {project.caseStudy.productVision.mvpScope.couldHave.rationale}
                                </Typography>
                              )}
                            </Paper>
                          </Grid>
                        )}
                        {project.caseStudy.productVision.mvpScope.wontHave && (
                          <Grid item xs={12} md={6}>
                            <Paper elevation={1} sx={{ p: 2, bgcolor: 'grey.100' }}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconAlertTriangle size={20} style={{ marginRight: 8 }} />
                                <Typography variant="subtitle1" fontWeight="bold">
                                  WON'T HAVE (Out of Scope)
                                </Typography>
                              </Box>
                              <List dense>
                                {project.caseStudy.productVision.mvpScope.wontHave.items?.map((item, index) => (
                                  <ListItem key={index} disablePadding>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                      <IconAlertTriangle size={14} />
                                    </ListItemIcon>
                                    <ListItemText primary={item} />
                                  </ListItem>
                                ))}
                              </List>
                              {project.caseStudy.productVision.mvpScope.wontHave.rationale && (
                                <Typography variant="caption" color="text.secondary" mt={1} display="block">
                                  <strong>Rationale:</strong> {project.caseStudy.productVision.mvpScope.wontHave.rationale}
                                </Typography>
                              )}
                            </Paper>
                          </Grid>
                        )}
                      </Grid>
                    </>
                  )}

                  {project.caseStudy.productVision.strategicObjectives && (
                    <>
                      <Divider sx={{ my: 3 }} />
                      <Typography variant="h6" gutterBottom>
                        Strategic Objectives
                      </Typography>
                      <Grid container spacing={2}>
                        {project.caseStudy.productVision.strategicObjectives.shortTerm && (
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                              Short-term
                            </Typography>
                            <List dense>
                              {project.caseStudy.productVision.strategicObjectives.shortTerm.map((obj, index) => (
                                <ListItem key={index} disablePadding sx={{ py: 0.25 }}>
                                  <ListItemIcon sx={{ minWidth: 24 }}>
                                    <IconCheck size={14} color="green" />
                                  </ListItemIcon>
                                  <ListItemText primary={obj} primaryTypographyProps={{ variant: 'body2' }} />
                                </ListItem>
                              ))}
                            </List>
                          </Grid>
                        )}
                        {project.caseStudy.productVision.strategicObjectives.midTerm && (
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                              Mid-term
                            </Typography>
                            <List dense>
                              {project.caseStudy.productVision.strategicObjectives.midTerm.map((obj, index) => (
                                <ListItem key={index} disablePadding sx={{ py: 0.25 }}>
                                  <ListItemIcon sx={{ minWidth: 24 }}>
                                    <IconCheck size={14} color="orange" />
                                  </ListItemIcon>
                                  <ListItemText primary={obj} primaryTypographyProps={{ variant: 'body2' }} />
                                </ListItem>
                              ))}
                            </List>
                          </Grid>
                        )}
                        {project.caseStudy.productVision.strategicObjectives.longTerm && (
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                              Long-term
                            </Typography>
                            <List dense>
                              {project.caseStudy.productVision.strategicObjectives.longTerm.map((obj, index) => (
                                <ListItem key={index} disablePadding sx={{ py: 0.25 }}>
                                  <ListItemIcon sx={{ minWidth: 24 }}>
                                    <IconCheck size={14} color="purple" />
                                  </ListItemIcon>
                                  <ListItemText primary={obj} primaryTypographyProps={{ variant: 'body2' }} />
                                </ListItem>
                              ))}
                            </List>
                          </Grid>
                        )}
                      </Grid>
                    </>
                  )}
                </CardContent>
              </DashboardCard>
            </Box>
          </Grid>
        )}

        {/* User Research & Insights */}
        {(project.caseStudy?.userResearch || project.caseStudy?.problemDiscovery) && (
          <Grid item xs={12}>
            <Box id="user-research" mb={3}>
              <DashboardCard title="User Research & Insights">
                <CardContent>
                  {project.caseStudy?.userResearch ? (
                    <>
                      <Grid container spacing={1} mb={2}>
                        {project.caseStudy.userResearch.interviews && (
                          <>
                            {project.caseStudy.userResearch.interviews.operationsStaff && (
                              <Grid item xs={6} sm={3}>
                                <Paper elevation={1} sx={{ p: 1.5, textAlign: 'center' }}>
                                  <Typography variant="h5">{project.caseStudy.userResearch.interviews.operationsStaff}</Typography>
                                  <Typography variant="caption">Operations Staff</Typography>
                                </Paper>
                              </Grid>
                            )}
                            {project.caseStudy.userResearch.interviews.customerService && (
                              <Grid item xs={6} sm={3}>
                                <Paper elevation={1} sx={{ p: 1.5, textAlign: 'center' }}>
                                  <Typography variant="h5">{project.caseStudy.userResearch.interviews.customerService}</Typography>
                                  <Typography variant="caption">Customer Service</Typography>
                                </Paper>
                              </Grid>
                            )}
                            {project.caseStudy.userResearch.interviews.management && (
                              <Grid item xs={6} sm={3}>
                                <Paper elevation={1} sx={{ p: 1.5, textAlign: 'center' }}>
                                  <Typography variant="h5">{project.caseStudy.userResearch.interviews.management}</Typography>
                                  <Typography variant="caption">Management</Typography>
                                </Paper>
                              </Grid>
                            )}
                            {project.caseStudy.userResearch.interviews.customerSurveys && (
                              <Grid item xs={6} sm={3}>
                                <Paper elevation={1} sx={{ p: 1.5, textAlign: 'center' }}>
                                  <Typography variant="h5">{project.caseStudy.userResearch.interviews.customerSurveys}+</Typography>
                                  <Typography variant="caption">Customer Surveys</Typography>
                                </Paper>
                              </Grid>
                            )}
                          </>
                        )}
                      </Grid>

                      <Grid container spacing={2}>
                        {project.caseStudy.userResearch.keyInsights && (
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                              Key Insights
                            </Typography>
                            <List dense>
                              {project.caseStudy.userResearch.keyInsights.map((insight, index) => (
                                <ListItem key={index} disablePadding sx={{ py: 0.25 }}>
                                  <ListItemIcon sx={{ minWidth: 24 }}>
                                    <IconChartBar size={16} color="#1976d2" />
                                  </ListItemIcon>
                                  <ListItemText primary={insight} primaryTypographyProps={{ variant: 'body2' }} />
                                </ListItem>
                              ))}
                            </List>
                          </Grid>
                        )}
                        {project.caseStudy.userResearch.personas && (
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                              User Personas
                            </Typography>
                            <Grid container spacing={1}>
                              {project.caseStudy.userResearch.personas.map((persona, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                  <Paper elevation={1} sx={{ p: 1.5 }}>
                                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>{persona.name}</Typography>
                                    <Typography variant="caption" color="text.secondary" display="block" mb={1}>{persona.role}</Typography>
                                    {persona.goals && persona.goals.length > 0 && (
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
                                    )}
                                  </Paper>
                                </Grid>
                              ))}
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    </>
                  ) : project.caseStudy?.problemDiscovery ? (
                    <>
                      <Grid container spacing={1} mb={2}>
                        <Grid item xs={6} sm={3}>
                          <Paper elevation={1} sx={{ p: 1.5, textAlign: 'center' }}>
                            <Typography variant="h5">1</Typography>
                            <Typography variant="caption">Landlord Interview</Typography>
                          </Paper>
                        </Grid>
                        {project.caseStudy.problemDiscovery.marketResearch && (
                          <Grid item xs={6} sm={3}>
                            <Paper elevation={1} sx={{ p: 1.5, textAlign: 'center' }}>
                              <Typography variant="h5">{project.caseStudy.problemDiscovery.marketResearch.platformsAnalyzed || '5'}</Typography>
                              <Typography variant="caption">Platforms Analyzed</Typography>
                            </Paper>
                          </Grid>
                        )}
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
                            {project.caseStudy.problemDiscovery.initialResearch?.insight && (
                              <ListItem disablePadding sx={{ py: 0.25 }}>
                                <ListItemIcon sx={{ minWidth: 24 }}>
                                  <IconChartBar size={16} color="#1976d2" />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={project.caseStudy.problemDiscovery.initialResearch.insight} 
                                  primaryTypographyProps={{ variant: 'body2' }} 
                                />
                              </ListItem>
                            )}
                            {project.caseStudy.problemDiscovery.marketResearch && (
                              <>
                                <ListItem disablePadding sx={{ py: 0.25 }}>
                                  <ListItemIcon sx={{ minWidth: 24 }}>
                                    <IconChartBar size={16} color="#1976d2" />
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary={`Market research: ${project.caseStudy.problemDiscovery.marketResearch.platformsAnalyzed || 5} platforms analyzed - ${project.caseStudy.problemDiscovery.marketResearch.finding || 'None addressed agricultural property-specific needs'}`}
                                    primaryTypographyProps={{ variant: 'body2' }} 
                                  />
                                </ListItem>
                                {project.caseStudy.problemDiscovery.marketResearch.opportunity && (
                                  <ListItem disablePadding sx={{ py: 0.25 }}>
                                    <ListItemIcon sx={{ minWidth: 24 }}>
                                      <IconChartBar size={16} color="#1976d2" />
                                    </ListItemIcon>
                                    <ListItemText 
                                      primary={project.caseStudy.problemDiscovery.marketResearch.opportunity}
                                      primaryTypographyProps={{ variant: 'body2' }} 
                                    />
                                  </ListItem>
                                )}
                              </>
                            )}
                          </List>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          {project.caseStudy.problemDiscovery.initialResearch?.quotes && (
                            <>
                              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                User Quotes
                              </Typography>
                              <List dense>
                                {project.caseStudy.problemDiscovery.initialResearch.quotes.map((quote, index) => (
                                  <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                                    <Paper elevation={1} sx={{ p: 1.5, width: '100%' }}>
                                      <Typography variant="body2" fontStyle="italic" color="text.secondary">
                                        {quote}
                                      </Typography>
                                    </Paper>
                                  </ListItem>
                                ))}
                              </List>
                            </>
                          )}
                        </Grid>
                      </Grid>

                      {project.caseStudy.problemStatement && (
                        <>
                          <Divider sx={{ my: 3 }} />
                          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                            Target User Profile
                          </Typography>
                          <Paper elevation={1} sx={{ p: 2, mt: 1 }}>
                            {project.caseStudy.problemDiscovery.initialResearch?.interviewSubject && (
                              <Typography variant="body2" paragraph>
                                <strong>Primary User:</strong> {project.caseStudy.problemDiscovery.initialResearch.interviewSubject}
                              </Typography>
                            )}
                            {project.caseStudy.problemStatement.targetUser && (
                              <Typography variant="body2" paragraph>
                                <strong>Target Segment:</strong> {project.caseStudy.problemStatement.targetUser}
                              </Typography>
                            )}
                            {project.caseStudy.problemStatement.opportunity && (
                              <Typography variant="body2">
                                <strong>Opportunity:</strong> {project.caseStudy.problemStatement.opportunity}
                              </Typography>
                            )}
                          </Paper>
                        </>
                      )}
                    </>
                  ) : null}
                </CardContent>
              </DashboardCard>
            </Box>
          </Grid>
        )}

        {/* Requirements & User Stories */}
        {project.caseStudy?.requirements?.epics && project.caseStudy.requirements.epics.length > 0 && (
          <Grid item xs={12}>
            <Box id="requirements" mb={3}>
              <RequirementsSection
                title="Requirements & User Stories"
                epics={project.caseStudy.requirements.epics}
              />
            </Box>
          </Grid>
        )}

        {/* Design Process */}
        {project.caseStudy?.designProcess && (
          <Grid item xs={12}>
            <DesignProcessSection
              title="Design Process"
              designProcess={project.caseStudy.designProcess}
            />
          </Grid>
        )}

        {/* Project Showcase */}
        <Grid item xs={12}>
          <ProjectShowcaseSection
            title=""
            showTitle={false}
            repository={project.github_data ? {
              name: project.github_data.full_name || project.github_data.name,
              full_name: project.github_data.full_name,
              url: project.repo_url || project.github_data.html_url,
              stars: project.github_data.stargazers_count,
              stargazers_count: project.github_data.stargazers_count,
              language: project.github_data.language,
              updated_at: project.github_data.updated_at,
              tech_stack: project.tech_stack || [],
              features: project.features || []
            } : null}
            demoImage={{
              url: `https://raw.githubusercontent.com/alfa2267/${project.github_data?.name || project.slug}/main/demo.png`,
              alt: `${project.name} Demo`,
              description: `Overview of ${project.name}`
            }}
            screenshots={project.screenshots || []}
            wireframes={project.caseStudy?.artifacts?.wireframes || []}
            screenshotsTitle=""
            showRepository={!!project.github_data}
            showDemoImage={true}
            showScreenshots={project.screenshots && project.screenshots.length > 0}
            showWireframes={project.caseStudy?.artifacts?.wireframes && project.caseStudy.artifacts.wireframes.length > 0}
              />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ProjectPage;