import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons';
import ProjectService from '../../services/projectService';

const SampleProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const projectService = new ProjectService();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await projectService.fetchProjects();
        setProjects(data || []);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Sample Projects
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          These are sample projects loaded from mock data for development purposes.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Grid item xs={12} md={6} key={project.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {project.name}
                    </Typography>
                    <Chip
                      label={project.status}
                      color={
                        project.status === 'active'
                          ? 'success'
                          : project.status === 'maintenance'
                          ? 'warning'
                          : 'default'
                      }
                      size="small"
                    />
                  </Box>

                  <Typography variant="body1" color="textSecondary" paragraph>
                    {project.description}
                  </Typography>

                  {project.tags && project.tags.length > 0 && (
                    <Box mb={2}>
                      {project.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{ mr: 1, mb: 1 }}
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  )}

                  {project.github_data && (
                    <Box display="flex" alignItems="center" mb={2}>
                      <Box display="flex" alignItems="center" mr={2}>
                        <IconBrandGithub size={16} style={{ marginRight: 4 }} />
                        <Typography variant="body2">
                          {project.github_data.stargazers_count} Stars
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <Typography variant="body2">
                          {project.github_data.forks_count} Forks
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </CardContent>

                <Box p={2} sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
                  <Grid container spacing={1}>
                    {project.repo_url && (
                      <Grid item>
                        <Button
                          size="small"
                          startIcon={<IconBrandGithub size={16} />}
                          href={project.repo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outlined"
                        >
                          Source
                        </Button>
                      </Grid>
                    )}
                    {project.demo_url && (
                      <Grid item>
                        <Button
                          size="small"
                          startIcon={<IconExternalLink size={16} />}
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="contained"
                          color="primary"
                        >
                          Live Demo
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary" align="center">
              No projects found. Make sure you have set up your mock data correctly.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default SampleProjectsPage;
