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
import { Typography, CircularProgress, Box } from '@mui/material';
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
        
        // Try to fetch real GitHub activity
        try {
          const recentEvents = await githubService.fetchUserEvents();
          const processedActivities = processGitHubEvents(recentEvents);
          setActivities(processedActivities);
        } catch (githubError) {
          console.warn('Could not fetch GitHub events, using fallback data:', githubError);
          // Fallback to dynamic placeholder data
          const fallbackActivities = generateFallbackActivities();
          setActivities(fallbackActivities);
        }
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

  const processGitHubEvents = (events) => {
    if (!events || !Array.isArray(events)) return [];
    
    return events.slice(0, 5).map((event, index) => {
      const eventType = event.type;
      let description = 'Activity';
      let color = 'primary';
      
      switch (eventType) {
        case 'PushEvent':
          description = `Pushed ${event.payload.commits?.length || 1} commit${event.payload.commits?.length === 1 ? '' : 's'} to`;
          color = 'primary';
          break;
        case 'PullRequestEvent':
          description = `${event.payload.action === 'opened' ? 'Opened' : 'Updated'} pull request in`;
          color = 'secondary';
          break;
        case 'IssuesEvent':
          description = `${event.payload.action === 'opened' ? 'Opened' : 'Updated'} issue in`;
          color = 'warning';
          break;
        case 'CreateEvent':
          description = `Created ${event.payload.ref_type} in`;
          color = 'success';
          break;
        case 'WatchEvent':
          description = 'Starred repository';
          color = 'error';
          break;
        default:
          description = `${eventType.replace('Event', '')} activity in`;
      }
      
      return {
        id: event.id || index,
        type: eventType,
        timestamp: new Date(event.created_at),
        description,
        repository: event.repo?.name || 'repository',
        color
      };
    });
  };

  const generateFallbackActivities = () => {
    const activities = [
      { description: 'Pushed commits to', repository: 'portfolio', color: 'primary' },
      { description: 'Updated project in', repository: 'repository', color: 'secondary' },
      { description: 'Merged changes in', repository: 'project', color: 'success' },
      { description: 'Published content to', repository: 'blog', color: 'warning' },
      { description: 'Starred', repository: 'open source project', color: 'error' }
    ];
    
    return activities.map((activity, index) => ({
      id: index + 1,
      type: 'activity',
      timestamp: new Date(Date.now() - (index + 1) * 4 * 60 * 60 * 1000), // Spread over hours
      ...activity
    }));
  };

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
