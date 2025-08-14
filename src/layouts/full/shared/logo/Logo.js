import { Link } from 'react-router-dom';
import { styled, Typography, Box } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Typography variant="h5" fontWeight={800} color="text.primary">
          Portfolio
        </Typography>
      </Box>
    </LinkStyled>
  )
};

export default Logo;
