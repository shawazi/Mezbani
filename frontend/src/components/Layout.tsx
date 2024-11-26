import { useState } from 'react'
import { Link as RouterLink, useLocation, Outlet } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Link,
  IconButton,
  Drawer,
  List,
  ListItem,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { bangladeshGreen } from '../theme'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'Events', path: '/events' },
  { label: 'Contact', path: '/contact' },
  { label: 'FAQs', path: '/faqs' },
  { label: 'Order', path: '/order' },
]

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const location = useLocation()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <List>
      {navItems.map((item) => (
        <ListItem
          key={item.path}
          disablePadding
          sx={{
            color: 'black',
            '&.Mui-selected': {
              backgroundColor: 'rgba(0, 106, 78, 0.2)',
            },
            '&:hover': {
              backgroundColor: 'rgba(0, 106, 78, 0.1)',
            },
          }}
        >
          <Button
            component={RouterLink}
            to={item.path}
            onClick={handleDrawerToggle}
            fullWidth
            sx={{
              justifyContent: 'flex-start',
              px: 3,
              py: 1.5,
              color: 'black',
              textAlign: 'left',
              '&.Mui-selected': {
                backgroundColor: 'rgba(0, 106, 78, 0.2)',
              },
            }}
          >
            {item.label}
          </Button>
        </ListItem>
      ))}
    </List>
  )

  return (
    <Box 
      component="div"
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100%',
        margin: 0,
        padding: 0,
        bgcolor: 'background.default',
        color: 'text.primary',
        overflowX: 'hidden',
      }}
    >
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backgroundColor: bangladeshGreen,
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          width: '100%',
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            margin: '0 auto',
            px: { xs: 2, sm: 3 },
          }}
        >
          <Toolbar 
            disableGutters 
            variant="dense"
            sx={{ 
              justifyContent: 'space-between',
              minHeight: { xs: '40px', sm: '44px' },
              py: 0,
            }}
          >
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'black',
                fontWeight: 'bold',
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                lineHeight: 1,
              }}
            >
              Mezbani Chai House
            </Typography>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ 
                  color: 'black',
                  padding: '4px',
                }}
              >
                <MenuIcon fontSize="small" />
              </IconButton>
            ) : (
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 1.5,
                  alignItems: 'center',
                }}
              >
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: 'black',
                      opacity: location.pathname === item.path ? 1 : 0.8,
                      fontSize: { sm: '0.9rem', md: '1rem' },
                      textTransform: 'none',
                      py: 0.25,
                      minHeight: 0,
                      '&:hover': {
                        opacity: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            backgroundColor: 'background.paper',
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Outlet />
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{
          width: '100%',
          py: { xs: 1.5, sm: 2 },
          px: 2,
          mt: 'auto',
          backgroundColor: bangladeshGreen,
          color: 'white',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" align="center" sx={{ mb: 0.5 }}>
            {new Date().getFullYear()} Mezbani Chai House. All rights reserved.
          </Typography>
          <Typography variant="body2" align="center">
            <Link
              href="https://maps.google.com"
              target="_blank"
              rel="noopener"
              sx={{ 
                color: 'white',
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            >
              123 Main Street, Watertown, MA 02472
            </Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout
