import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Alert, Snackbar } from '@mui/material';
import { IconMail, IconCheck } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Scroll to newsletter section if hash is present
  React.useEffect(() => {
    if (window.location.hash === '#newsletter') {
      const element = document.getElementById('newsletter');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      // In a real app, this would call an API to subscribe the user
      console.log('Subscribing email:', email);
      setSubmitted(true);
      setOpenSnackbar(true);
      setEmail('');
      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <DashboardCard id="newsletter" title="Newsletter" fullHeight>
      <Box>
        {!submitted ? (
          <>
            <Typography variant="body2" color="text.secondary" paragraph>
              Get insights on product management, technical decisions, and building digital products delivered to your inbox.
            </Typography>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: <IconMail size={20} style={{ marginRight: 8, color: '#666' }} />,
                  }}
                  size="small"
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  startIcon={<IconMail size={18} />}
                >
                  Subscribe
                </Button>
              </Stack>
            </form>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
              No spam. Unsubscribe anytime.
            </Typography>
          </>
        ) : (
          <Box textAlign="center" py={2}>
            <IconCheck size={48} style={{ color: '#4caf50', marginBottom: 16 }} />
            <Typography variant="h6" gutterBottom>
              Thanks for subscribing!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You'll receive updates on new articles and insights.
            </Typography>
          </Box>
        )}
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Successfully subscribed to newsletter!
        </Alert>
      </Snackbar>
    </DashboardCard>
  );
};

export default Newsletter;

