import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid, IconButton, Chip, Box } from '@mui/material';
import { IconExternalLink } from '@tabler/icons';
import BlankCard from '../../../components/shared/BlankCard';

// Project snapshot cards. Photo can be an external URL (e.g., raw GitHub image).
const ecoCard = [
    // Add projects here as you add snapshot automation in each repo
];

const Blog = () => {
    return (
        <Box>
        <Typography variant="h4" gutterBottom>My Projects</Typography>
        <Grid container spacing={3}>
            {ecoCard.map((product, index) => (
                <Grid item xs={12} sm={6} key={index}>
                    <BlankCard sx={{ height: '100%', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' } }}>
                        <Box sx={{ p: 2 }}>
                            <Typography variant="h6" component={Link} to={product.href || '/'} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                {product.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                                {product.description || 'No description available'}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    {product.tags && product.tags.map((tag, i) => (
                                        <Chip key={i} label={tag} size="small" sx={{ mr: 1, mb: 1 }} />
                                    ))}
                                </Box>
                                <Box>
                                    <IconButton component={Link} to={product.href || '/'} size="small">
                                        <IconExternalLink size={18} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    </BlankCard>
                </Grid>
            ))}
        </Grid>
    </Box>
    );
};

export default Blog;
