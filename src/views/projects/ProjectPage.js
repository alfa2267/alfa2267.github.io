import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CardContent,
  Chip,
  Button,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Tabs,
  Tab,
  CircularProgress
} from '@mui/material';
import DOMPurify from 'dompurify';
import {
  IconExternalLink,
  IconBrandGithub,
  IconCheck,
  IconCalendar
} from '@tabler/icons';
import ProjectService from '../../services/projectService.js';
import GitHubService from '../../services/github.js';
import PageContainer from '../../components/container/PageContainer.js';
import DashboardCard from '../../components/shared/DashboardCard.js';

const ProjectPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readmeHtml, setReadmeHtml] = useState('');
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

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
        
        // Load README HTML
        setReadmeLoading(true);
        const github = new GitHubService('alfa2267');
        const repoName = projectData.github_data?.name || slug;
        const html = await github.fetchReadmeHtml(repoName);
        setReadmeHtml(html || '<p>README not found.</p>');
        setReadmeLoading(false);
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
            <Button href="/dashboard" sx={{ mt: 2 }}>
              Back to Dashboard
            </Button>
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

  return (
    <PageContainer title={project.name} description={project.description}>
      <Grid container spacing={3}>
        {/* Main Project Info */}
        <Grid item xs={12}>
          <DashboardCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Box>
                  <Typography variant="h4" gutterBottom>
                    {project.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                </Box>
                <Box display="flex" gap={1} flexDirection="column">
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

              <Box display="flex" gap={2} mb={3}>
              
                {project.repo_url && (
                  <Button
                    variant="outlined"
                    startIcon={<IconBrandGithub size={16} />}
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source Code
                  </Button>
                )}
              </Box>

              {/* Tech Stack */}
              {project.tech_stack.length > 0 && (
                <Box mb={3}>
                  <Typography variant="h6" gutterBottom>
                    Technology Stack
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {project.tech_stack.map((tech, index) => (
                      <Chip key={index} label={tech} size="small" />
                    ))}
                  </Box>
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              {/* Features */}
              {project.features.length > 0 && (
                <Box mb={3}>
                  <Typography variant="h6" gutterBottom>
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
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* GitHub Stats */}
        {project.github_data && (
          <Grid item xs={12} md={6}>
            <DashboardCard title="Repository Info">
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <IconBrandGithub size={20} />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {project.github_data.full_name}
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box textAlign="center">
                      <Typography variant="h6">
                        {project.github_data.stargazers_count}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Stars
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box textAlign="center">
                      <Typography variant="h6">
                        {project.github_data.language || 'N/A'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Language
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box mt={2}>
                  <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                    <IconCalendar size={16} />
                    <Box component="span" ml={1}>
                      Updated: {new Date(project.github_data.updated_at).toLocaleDateString()}
                    </Box>
                  </Typography>
                </Box>
              </CardContent>
            </DashboardCard>
          </Grid>
        )}

        {/* Screenshots placeholder */}
        {project.screenshots.length > 0 && (
          <Grid item xs={12} md={6}>
            <DashboardCard title="Screenshots">
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Screenshots will be displayed here once implemented
                </Typography>
                {/* TODO: Add image gallery component */}
              </CardContent>
            </DashboardCard>
          </Grid>
        )}

        {/* README Documentation */}
        <Grid item xs={12}>
          <DashboardCard>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
                <Tab label="README" />
              </Tabs>
            </Box>
            {currentTab === 0 && (
              <Box sx={{ p: 0 }}>
                {readmeLoading ? (
                  <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress size={24} />
                  </Box>
                ) : (
                  <Box
                    component="div"
                    sx={{
                      width: '100%',
                      maxWidth: '100%',
                      overflowX: 'auto',
                      px: 4,
                      py: 3,
                      '& img': { maxWidth: '100%' },
                      '& table': { width: '100%', borderCollapse: 'collapse' },
                      '& pre': { 
                        background: '#f6f8fa', 
                        padding: 2, 
                        overflow: 'auto',
                        margin: 0,
                        borderRadius: 0
                      },
                    }}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(readmeHtml) }}
                  />
                )}
              </Box>
            )}
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ProjectPage;