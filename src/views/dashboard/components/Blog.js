import React from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Typography, Grid, Rating, Tooltip, Fab } from '@mui/material';
import { Stack } from '@mui/system';
import { IconBasket } from '@tabler/icons';
import BlankCard from '../../../components/shared/BlankCard';

// Project snapshot cards. Photo can be an external URL (e.g., raw GitHub image).
const ecoCard = [
    {
        title: 'Community Vote',
        subheader: 'Latest snapshot',
        // Replace with actual path created by CI in the Community Vote repo
        photo: 'https://raw.githubusercontent.com/alfa2267/community-vote/main/assets/snapshots/home.png',
        href: 'https://github.com/alfa2267/community-vote',
        price: 0,
        salesPrice: 0,
        rating: 5,
    },
    // Add more projects here as you add snapshot automation in each repo
];

const Blog = () => {
    return (
        <Grid container spacing={3}>
            {ecoCard.map((product, index) => (
                <Grid item sm={12} md={4} lg={3} key={index}>
                    <BlankCard>
                        <Typography component={Link} to={product.href || '/'}>
                            <img src={product.photo} alt={product.title} width="100%" />
                        </Typography>
                        <Tooltip title="Add To Cart">
                            <Fab
                                size="small"
                                color="primary"
                                sx={{ bottom: '75px', right: '15px', position: 'absolute' }}
                            >
                                <IconBasket size="16" />
                            </Fab>
                        </Tooltip>
                        <CardContent sx={{ p: 3, pt: 2 }}>
                            <Typography variant="h6">{product.title}</Typography>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="h6">${product.price}</Typography>
                                    <Typography color="textSecondary" ml={1} sx={{ textDecoration: 'line-through' }}>
                                        ${product.salesPrice}
                                    </Typography>
                                </Stack>
                                <Rating name="read-only" size="small" value={product.rating} readOnly />
                            </Stack>
                        </CardContent>
                    </BlankCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default Blog;
