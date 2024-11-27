import { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { MenuItem, getMenuItems } from '../lib/firebase/firestore';
import LoadingSpinner from '../components/LoadingSpinner';

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const items = await getMenuItems();
      setMenuItems(items);
      setLoading(false);
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const chaiItems = menuItems.filter(item => item.category === 'chai');
  const foodItems = menuItems.filter(item => item.category === 'food');

  return (
    <Container 
      maxWidth="lg"
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        py: { xs: 4, md: 6 },
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
            fontWeight: 700,
            mb: 2,
          }}
        >
          Our Menu
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
          Experience the authentic taste of Bangladesh with our carefully curated selection of chai and traditional snacks.
        </Typography>
      </Box>

      {/* Chai Section */}
      <Box sx={{ width: '100%', mb: 8 }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem' },
            fontWeight: 700,
            mb: 4,
            textAlign: 'center',
          }}
        >
          Chai Selection
        </Typography>
        <Grid container spacing={3}>
          {chaiItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                }}
              >
                {item.imageUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.imageUrl}
                    alt={item.name}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {item.description}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    ${item.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Food Section */}
      <Box sx={{ width: '100%' }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem' },
            fontWeight: 700,
            mb: 4,
            textAlign: 'center',
          }}
        >
          Food & Snacks
        </Typography>
        <Grid container spacing={3}>
          {foodItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                }}
              >
                {item.imageUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.imageUrl}
                    alt={item.name}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {item.description}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    ${item.price.toFixed(2)}
                  </Typography>
                  {item.spiceLevel && (
                    <Typography variant="body2" color="error">
                      Spice Level: {'🌶️'.repeat(item.spiceLevel)}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Menu;
