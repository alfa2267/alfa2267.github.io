import React from 'react';
import { Box, Typography, Stack, Chip, Paper, LinearProgress } from '@mui/material';
import {
  IconBrandGit,
  IconCoffee,
  IconCode,
  IconBug
} from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';
import GitHubService from '../../../services/github';
import ProjectService from '../../../services/projectService';

const DevOpsQuirks = () => {
  const githubService = new GitHubService();
  const projectService = new ProjectService();
  const [weeklyCommits, setWeeklyCommits] = React.useState(0);
  const [repoStats, setRepoStats] = React.useState({ totalRepos: 0 });
  const [projectCount, setProjectCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [commits, prs, repos, projects] = await Promise.all([
          githubService.getWeeklyCommitStats(),
          githubService.getPullRequestStats(),
          githubService.getRepositoryStats(),
          projectService.getProjectStats()
        ]);
        
        setWeeklyCommits(commits);
        setPrStats(prs);
        setRepoStats(repos);
        setProjectCount(projects.total);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Calculate dynamic max values based on actual data
  const weeklyCommitsMax = Math.max(weeklyCommits, 50); // At least 50, or higher if actual is more
  const featuresShipped = projectCount; // Use project count as features shipped
  const featuresMax = Math.max(featuresShipped, 15);

  // Fun, personality-driven metrics
  const quirkyMetrics = [
    {
      icon: IconBrandGit,
      label: 'Commits This Week',
      value: loading ? '...' : weeklyCommits,
      maxValue: weeklyCommitsMax,
      color: '#5D87FF',
      subtitle: 'Keep shipping!'
    },
    {
      icon: IconCoffee,
      label: 'Coffee Consumed',
      value: '∞',
      color: '#795548',
      subtitle: 'Powered by caffeine'
    },
    {
      icon: IconBug,
      label: 'Projects Active',
      value: loading ? '...' : projectCount,
      maxValue: featuresMax,
      color: '#13DEB9',
      subtitle: 'Portfolio projects'
    },
    {
      icon: IconCode,
      label: 'Repositories',
      value: loading ? '...' : repoStats.totalRepos,
      maxValue: Math.max(repoStats.totalRepos, 20),
      color: '#9C27B0',
      subtitle: 'On GitHub'
    }
  ];


  return (
    <DashboardCard title="DevOps DNA" subtitle="The numbers behind the hustle">
      <Stack spacing={3}>
        {/* Quirky Metrics */}
        <Box>
          <Stack spacing={2}>
            {quirkyMetrics.map((metric, index) => {
              const Icon = metric.icon;
              const percentage = metric.maxValue ? (metric.value / metric.maxValue) * 100 : 100;

              return (
                <Box key={index}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Icon size={18} color={metric.color} />
                      <Typography variant="body2" fontWeight={600}>
                        {metric.label}
                      </Typography>
                    </Box>
                    <Typography variant="h6" color={metric.color} fontWeight={700}>
                      {metric.value}
                    </Typography>
                  </Stack>

                  {metric.maxValue && typeof metric.value === 'number' && (
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{
                        height: 6,
                        borderRadius: 1,
                        backgroundColor: '#F2F6FA',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: metric.color
                        }
                      }}
                    />
                  )}

                  <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    {metric.subtitle}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>

        {/* Personal Touch */}
        <Box
          sx={{
            p: 2,
            backgroundColor: '#ECF2FF',
            borderRadius: 1,
            borderLeft: '4px solid #5D87FF'
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            💡 "I believe the best products are built at the intersection of user needs, technical feasibility, and business value. That's where I thrive."
          </Typography>
        </Box>
      </Stack>
    </DashboardCard>
  );
};

export default DevOpsQuirks;
