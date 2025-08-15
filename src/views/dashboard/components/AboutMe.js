import React from 'react';
import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material';
import { IconBrandGithub, IconMail } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';

const GITHUB_AVATAR = 'https://github.com/alfa2267.png';

const AboutMe = () => {
  return (
    <DashboardCard title="About Me" fullHeight>
      <Stack spacing={2} alignItems="center" textAlign="center" sx={{ height: '100%', justifyContent: 'center' }}>
        <Avatar src={GITHUB_AVATAR} alt="alfa2267" sx={{ width: 72, height: 72 }} />
        <Box>
          <Typography variant="h6" fontWeight={700}>Oce A</Typography>
          <Typography variant="body2" color="textSecondary">Tech Enthusiast</Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          Building delightful web experiences. Passionate about React, design systems, and shipping useful tools.
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
          <Chip label="React" size="small" />
          <Chip label="TypeScript" size="small" />
          <Chip label="UI/UX" size="small" />
          <Chip label="Node.js" size="small" />
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<IconBrandGithub size={18} />}
            href="https://github.com/alfa2267"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Button>

          <Button
            variant="text"
            color="primary"
            startIcon={<IconMail size={18} />}
            href="mailto:hello@ainaeco.uk"
          >
            Email
          </Button>
        </Stack>
      </Stack>
    </DashboardCard>
  );
};

export default AboutMe;
