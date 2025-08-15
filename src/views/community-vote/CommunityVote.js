import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import GitHubService from '../../services/github.js';


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
      <Box sx={{ 
        mx: -3,
        '@media (min-width: 600px)': {
          mx: -4
        }
      }}>
        <DashboardCard 
          sx={{ 
            p: 0, 
            '& .MuiCardContent-root': { 
              p: 0,
              '&:last-child': {
                pb: 0
              }
            } 
          }}
        >
        {loading ? (
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
            dangerouslySetInnerHTML={{ __html: readmeHtml }}
          />
        )}
        </DashboardCard>
      </Box>
    </PageContainer>
  );
};

export default CommunityVote;
