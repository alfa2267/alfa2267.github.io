import React, { useState, useEffect } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Link, Typography, CircularProgress, Box } from '@mui/material';
import GitHubService from '../../../services/github.js';

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecentActivity = async () => {
      try {
        setLoading(true);
        const githubService = new GitHubService();
        
        // Fetch recent activity from GitHub
        // This would need to be implemented in GitHubService
        // For now, use fallback static data
        const staticActivities = [
          {
            id: 1,
            type: 'push',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            description: 'Pushed commits to portfolio',
            repository: 'alfa2267.github.io',
            color: 'primary'
          },
          {
            id: 2,
            type: 'pr',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
            description: 'Opened pull request',
            repository: 'various projects',
            color: 'secondary'
          },
          {
            id: 3,
            type: 'merge',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
            description: 'Merged pull request',
            repository: 'project repository',
            color: 'success'
          },
          {
            id: 4,
            type: 'publish',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            description: 'Published new content',
            repository: 'portfolio blog',
            color: 'warning'
          },
          {
            id: 5,
            type: 'star',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            description: 'Starred interesting repository',
            repository: 'open source project',
            color: 'error'
          }
        ];

        setActivities(staticActivities);
        setError(null);
      } catch (err) {
        console.error('Error loading recent activity:', err);
        setError(err);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    loadRecentActivity();
  }, []);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = diff / (1000 * 60 * 60);
    const days = diff / (1000 * 60 * 60 * 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${Math.floor(hours)}h ago`;
    if (days < 2) return 'Yesterday';
    return `${Math.floor(days)} days ago`;
  };

  if (loading) {
    return (
      <DashboardCard title="Recent Activity" fullHeight>
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress size={24} />
        </Box>
      </DashboardCard>
    );
  }

  if (error || activities.length === 0) {
    return (
      <DashboardCard title="Recent Activity" fullHeight>
        <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
          No recent activity available
        </Typography>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title="Recent Activity" fullHeight>
      <Timeline
        className="theme-timeline"
        sx={{
          p: 0,
          mb: '-40px',
          '& .MuiTimelineConnector-root': {
            width: '1px',
            backgroundColor: '#efefef'
          },
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.5,
            paddingLeft: 0,
          },
        }}
      >
        {activities.map((activity, index) => (
          <TimelineItem key={activity.id}>
            <TimelineOppositeContent>
              {formatTimestamp(activity.timestamp)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color={activity.color} variant="outlined" />
              {index < activities.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              {activity.description}{' '}
              <Typography component="span" fontWeight={600}>
                {activity.repository}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </DashboardCard>
  );
};

export default RecentActivity;
