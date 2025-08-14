import React from 'react';
import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material';
import { IconUser, IconMail } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';

const GITHUB_AVATAR = 'https://github.com/alfa2267.png';

const AboutMe = () => {
  return (
    <DashboardCard title="About Me">
      <Stack spacing={2} alignItems="center" textAlign="center">
        <Avatar src={GITHUB_AVATAR} alt="alfa2267" sx={{ width: 72, height: 72 }} />
        <Box>
          <Typography variant="h6" fontWeight={700}>Oceania Alfa</Typography>
          <Typography variant="body2" color="textSecondary">Software Engineer • Frontend / Full‑stack</Typography>
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
            startIcon={<IconUser size={18} />}
            href="https://github.com/alfa2267"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<IconUser size={18} />}
            href="https://www.linkedin.com/in/alfa2267"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </Button>
          <Button
            variant="text"
            color="primary"
            startIcon={<IconMail size={18} />}
            href="mailto:hello@alfa.dev"
          >
            Email
          </Button>
        </Stack>
      </Stack>
    </DashboardCard>
  );
};

export default AboutMe;
