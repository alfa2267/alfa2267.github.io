import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
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
  CircularProgress
} from '@mui/material';
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
        project.repo_url && (
          <Button
            variant="outlined"
            startIcon={<IconBrandGithub size={16} />}
            href={project.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
          >
            View Source Code
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

        {/* Repository Info */}
        {project.github_data && (
          <Grid item xs={12} md={4}>
            <DashboardCard title="Repository Info">
              {renderRepoInfo()}
            </DashboardCard>
          </Grid>
        )}

        {/* README Content */}
        <Grid item xs={12} md={project.github_data ? 8 : 12}>
          <DashboardCard title="README">
            {readmeLoading ? (
              <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress size={24} />
              </Box>
            ) : (
              <Box sx={{ p: 3 }}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    // Custom rendering for code blocks
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <Box 
                          component="pre" 
                          sx={{ 
                            background: theme => theme.palette.mode === 'dark' ? '#1E1E1E' : '#f6f8fa',
                            p: 2,
                            borderRadius: 1,
                            overflow: 'auto',
                            fontSize: '0.9em',
                            mb: 2
                          }}
                        >
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </Box>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    // Custom rendering for images
                    img: ({node, ...props}) => (
                      <Box 
                        component="img" 
                        {...props} 
                        style={{ maxWidth: '100%', height: 'auto' }} 
                        alt={props.alt || ''}
                      />
                    ),
                    // Custom rendering for tables
                    table: ({node, ...props}) => (
                      <Box component="div" sx={{ overflowX: 'auto', my: 2 }}>
                        <Box component="table" sx={{ borderCollapse: 'collapse', width: '100%' }} {...props} />
                      </Box>
                    ),
                    th: ({node, ...props}) => (
                      <Box 
                        component="th" 
                        sx={{ 
                          border: '1px solid', 
                          borderColor: 'divider', 
                          p: 1,
                          textAlign: 'left',
                          backgroundColor: theme => theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5'
                        }} 
                        {...props} 
                      />
                    ),
                    td: ({node, ...props}) => (
                      <Box 
                        component="td" 
                        sx={{ 
                          border: '1px solid', 
                          borderColor: 'divider', 
                          p: 1 
                        }} 
                        {...props} 
                      />
                    ),
                  }}
                >
                  {readmeHtml}
                </ReactMarkdown>
              </Box>
            )}
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ProjectPage;