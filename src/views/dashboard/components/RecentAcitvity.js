import React from 'react';
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
import { Link, Typography } from '@mui/material';

const RecentActivity = () => {
  return (
    <DashboardCard title="Recent Activity" fullHeight>
      <>
        <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
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
          <TimelineItem>
            <TimelineOppositeContent>09:10 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Pushed 3 commits to <Typography component="span" fontWeight={600}>alfa2267.github.io</Typography></TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>08:35 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              Opened PR <Link href="https://github.com/alfa2267/community-vote/pulls" underline="none" target="_blank" rel="noreferrer">#42</Link>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>Yesterday</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Merged PR on <Typography component="span" fontWeight={600}>community-vote</Typography></TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>2 days ago</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="warning" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Published new post on portfolio blog</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>3 days ago</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="error" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Starred repository <Link href="https://github.com/vercel/next.js" target="_blank" rel="noreferrer" underline="none">vercel/next.js</Link></TimelineContent>
          </TimelineItem>
      </Timeline>
      </>
    </DashboardCard>
  );
};

export default RecentActivity;
