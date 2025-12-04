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
  Skeleton
} from '@mui/material';
import {
  IconBrandGithub,
  IconCheck,
  IconCalendar,
  IconExternalLink
} from '@tabler/icons';
import ProjectService from '../../services/projectService.js';
import PageContainer from '../../components/container/PageContainer.js';
import DashboardCard from '../../components/shared/DashboardCard.js';

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

        {/* Demo Image */}
        <Grid item xs={12} md={project.github_data ? 8 : 12}>
          
          
              <Box
                component="img"
                src={`https://raw.githubusercontent.com/alfa2267/${project.github_data?.name || project.slug}/main/demo.png`}
                alt={`${project.name} Demo`}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 1,
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 4,
                    transition: 'box-shadow 0.3s ease-in-out'
                  }
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Demo image not available</p>';
                }}
              />
          
       
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ProjectPage;