import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Card, CardContent, CardMedia, Box, Chip, Button, Stack } from '@mui/material';
import { IconCalendar, IconClock, IconExternalLink, IconTag } from '@tabler/icons';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

// Sample blog posts - in a real app, this would come from a CMS or API
const blogPosts = [
  {
    id: 1,
    title: 'Building Reloam: A Product Manager\'s Journey',
    excerpt: 'How I identified a market opportunity in African agricultural property management and built an MVP that addresses real pain points.',
    image: 'https://via.placeholder.com/600x300?text=Reloam+Case+Study',
    date: '2024-12-01',
    readTime: '8 min read',
    tags: ['Product Management', 'Case Study', 'MVP'],
    category: 'Product',
    slug: 'building-reloam-pm-journey'
  },
  {
    id: 2,
    title: 'The Art of Problem Discovery in Product Management',
    excerpt: 'Lessons learned from conducting user interviews and market research to identify genuine problems worth solving.',
    image: 'https://via.placeholder.com/600x300?text=Problem+Discovery',
    date: '2024-11-15',
    readTime: '6 min read',
    tags: ['Product Management', 'User Research', 'Strategy'],
    category: 'Product',
    slug: 'problem-discovery-pm'
  },
  {
    id: 3,
    title: 'From Idea to MVP: Making Scope Decisions',
    excerpt: 'How to decide what features make it into your MVP and what should wait for later phases.',
    image: 'https://via.placeholder.com/600x300?text=MVP+Decisions',
    date: '2024-11-01',
    readTime: '5 min read',
    tags: ['MVP', 'Product Strategy', 'Scoping'],
    category: 'Product',
    slug: 'idea-to-mvp-scope'
  },
  {
    id: 4,
    title: 'Technical Architecture Decisions for Modern Web Apps',
    excerpt: 'Exploring the technology choices behind building scalable, maintainable web applications.',
    image: 'https://via.placeholder.com/600x300?text=Tech+Architecture',
    date: '2024-10-20',
    readTime: '7 min read',
    tags: ['Technical', 'Architecture', 'Web Development'],
    category: 'Technical',
    slug: 'technical-architecture-decisions'
  }
];

const BlogPage = () => {
  return (
    <PageContainer 
      title="Blog" 
      description="Thoughts on product management, technical decisions, and building digital products"
    >
      <Grid container spacing={3}>
        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <Grid item xs={12}>
            <DashboardCard>
              <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100%' }}>
                <CardMedia
                  component="img"
                  sx={{ 
                    width: { xs: '100%', md: '40%' }, 
                    height: { xs: 250, md: 'auto' },
                    objectFit: 'cover'
                  }}
                  image={blogPosts[0].image}
                  alt={blogPosts[0].title}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
                      <Chip 
                        label={blogPosts[0].category} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                      />
                      <Chip 
                        icon={<IconCalendar size={14} />}
                        label={new Date(blogPosts[0].date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })} 
                        size="small" 
                        variant="outlined"
                      />
                      <Chip 
                        icon={<IconClock size={14} />}
                        label={blogPosts[0].readTime} 
                        size="small" 
                        variant="outlined"
                      />
                    </Stack>
                    <Typography variant="h4" component="h2" gutterBottom fontWeight={700}>
                      {blogPosts[0].title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {blogPosts[0].excerpt}
                    </Typography>
                    <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
                      {blogPosts[0].tags.map((tag, index) => (
                        <Chip 
                          key={index}
                          icon={<IconTag size={14} />}
                          label={tag} 
                          size="small" 
                        />
                      ))}
                    </Stack>
                    <Button 
                      variant="contained" 
                      endIcon={<IconExternalLink size={18} />}
                      component={Link}
                      to={`/blog/${blogPosts[0].slug}`}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Box>
              </Card>
            </DashboardCard>
          </Grid>
        )}

        {/* Blog Posts Grid */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom fontWeight={700}>
            Recent Posts
          </Typography>
        </Grid>

        {blogPosts.slice(1).map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { 
              transform: 'translateY(-4px)', 
              transition: 'transform 0.2s',
              boxShadow: 4
            } }}>
              <CardMedia
                component="img"
                height="200"
                image={post.image}
                alt={post.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
                  <Chip 
                    label={post.category} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                  <Chip 
                    icon={<IconCalendar size={12} />}
                    label={new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })} 
                    size="small" 
                    variant="outlined"
                  />
                </Stack>
                <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                  {post.excerpt}
                </Typography>
                <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
                  {post.tags.slice(0, 2).map((tag, index) => (
                    <Chip 
                      key={index}
                      label={tag} 
                      size="small" 
                      variant="outlined"
                    />
                  ))}
                </Stack>
                <Button 
                  variant="outlined" 
                  size="small"
                  endIcon={<IconExternalLink size={16} />}
                  component={Link}
                  to={`/blog/${post.slug}`}
                  fullWidth
                >
                  Read Article
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Newsletter CTA */}
        <Grid item xs={12}>
          <DashboardCard>
            <Box textAlign="center" py={4}>
              <Typography variant="h5" gutterBottom fontWeight={700}>
                Stay Updated
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Get notified when I publish new articles about product management and building digital products.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                component={Link}
                to="/dashboard#newsletter"
                sx={{ mt: 2 }}
              >
                Subscribe to Newsletter
              </Button>
            </Box>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default BlogPage;

