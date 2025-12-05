import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Stack, Rating } from '@mui/material';
import { IconQuote } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Product Lead',
    company: 'TechCorp',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'Oceania has an exceptional ability to translate complex user needs into actionable product requirements. Their attention to detail and user-centric approach made a significant impact on our product roadmap.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Engineering Manager',
    company: 'StartupXYZ',
    avatar: 'https://i.pravatar.cc/150?img=2',
    rating: 5,
    text: 'Working with Oceania was a pleasure. They have a unique talent for balancing business objectives with technical feasibility, always finding the right solution that serves both users and the business.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Design Director',
    company: 'DesignStudio',
    avatar: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    text: 'Oceania\'s product thinking is outstanding. They consistently bring fresh perspectives to design challenges and have a deep understanding of how to create products that users actually want to use.',
  },
];

const Testimonials = () => {
  return (
    <DashboardCard title="Testimonials" fullHeight>
      <Stack spacing={3}>
        {testimonials.map((testimonial) => (
          <Card 
            key={testimonial.id} 
            elevation={0}
            sx={{ 
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                boxShadow: 2,
                transition: 'box-shadow 0.2s'
              }
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="flex-start" gap={2}>
                <IconQuote size={24} style={{ color: '#1976d2', marginTop: 4 }} />
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary" paragraph sx={{ fontStyle: 'italic' }}>
                    "{testimonial.text}"
                  </Typography>
                  <Box display="flex" alignItems="center" gap={2} mt={2}>
                    <Avatar 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      sx={{ width: 48, height: 48 }}
                    />
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonial.role} at {testimonial.company}
                      </Typography>
                      <Rating value={testimonial.rating} readOnly size="small" sx={{ mt: 0.5 }} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </DashboardCard>
  );
};

export default Testimonials;

