import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { IconExternalLink } from '@tabler/icons';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import GitHubService from '../../services/github.js';

const DEMO_URL = 'https://alfa2267.github.io/community-vote/';

const CommunityVote = () => {
  const [readmeHtml, setReadmeHtml] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReadme = async () => {
      try {
        setLoading(true);
        const github = new GitHubService('alfa2267');
        const html = await github.fetchReadmeHtml('community-vote');
        setReadmeHtml(html || '<p>README not found.</p>');
      } catch (e) {
        console.error('Failed to load README:', e);
        setReadmeHtml('<p>Failed to load README.</p>');
      } finally {
        setLoading(false);
      }
    };
    loadReadme();
  }, []);

  return (
    <PageContainer title="Community Vote" description="Community Vote project details">
      <DashboardCard
        title={
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Box component="span">Community Vote</Box>
            <Button
              variant="contained"
              size="small"
              startIcon={<IconExternalLink size={16} />}
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Demo
            </Button>
          </Box>
        }
      >
        <Box p={2}>
          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <Box
              sx={{
                '& img': { maxWidth: '100%' },
                '& table': { width: '100%', borderCollapse: 'collapse' },
                '& pre': { background: '#f6f8fa', padding: 2, overflow: 'auto' },
              }}
              dangerouslySetInnerHTML={{ __html: readmeHtml }}
            />
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default CommunityVote;
