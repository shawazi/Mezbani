import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material'
import { bangladeshGreen, bangladeshRed } from '../theme'

const menuItems = [
  {
    name: 'Classic Chai',
    description:
      'Our signature blend of premium black tea with a perfect balance of milk and spices.',
    price: '$3.50',
    image: 'https://placehold.co/400x300',
  },
  {
    name: 'Masala Chai',
    description:
      'A robust blend of black tea with aromatic Indian spices, cardamom, and ginger.',
    price: '$3.50',
    image: 'https://placehold.co/400x300',
  },
  {
    name: 'Elaichi Chai',
    description:
      'Fragrant cardamom-infused chai that brings out the subtle sweetness of premium tea leaves.',
    price: '$3.50',
    image: 'https://placehold.co/400x300',
  },
  {
    name: 'Ginger Chai',
    description:
      'A warming blend with fresh ginger that adds a spicy kick to our classic chai.',
    price: '$3.50',
    image: 'https://placehold.co/400x300',
  },
  {
    name: 'Mint Chai',
    description:
      'Refreshing mint leaves combined with our classic chai for a cooling experience.',
    price: '$3.50',
    image: 'https://placehold.co/400x300',
  },
]

const Menu = () => {
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
          align="center"
          gutterBottom
          sx={{ color: bangladeshGreen }}
        >
          Our Menu
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Discover our selection of handcrafted chai beverages
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.name}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  sx={{ color: bangladeshGreen }}
                >
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {item.description}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: bangladeshRed, fontWeight: 'bold' }}
                >
                  {item.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="body1" color="text.secondary">
          All our chai is served hot and made fresh to order.
          <br />
          Bulk orders available for events and gatherings.
        </Typography>
      </Box>
    </Container>
  )
}

export default Menu
