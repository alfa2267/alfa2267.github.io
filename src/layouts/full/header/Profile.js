import React from 'react';
import { Avatar, IconButton, Box } from '@mui/material';

// Use GitHub profile avatar
const PROFILE_AVATAR_URL = 'https://github.com/alfa2267.png';

const Profile = () => {
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="User profile"
        color="inherit"
      >
        <Avatar
          src={PROFILE_AVATAR_URL}
          alt="alfa2267"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
    </Box>
  );
};

export default Profile;
