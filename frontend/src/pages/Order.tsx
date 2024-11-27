import { useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Tab,
  Tabs,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { bangladeshGreen, bangladeshRed } from '../theme'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`order-tabpanel-${index}`}
      aria-labelledby={`order-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const chaiOptions = [16, 32, 50, 66, 82, 100]
const chaiTypes = ['Classic', 'Masala', 'Elaichi', 'Ginger', 'Mint']
const DELIVERY_THRESHOLD = 30 // miles
const ADDITIONAL_FEE = 25 // dollars
const PRICE_PER_CUP = 3.5

interface OrderFormData {
  chaiType: string
  quantity: number
  distance?: number
  name: string
  email: string
  phone: string
  address?: string
}

const Order = () => {
  const [tabValue, setTabValue] = useState(0)
  const { control, watch, handleSubmit } = useForm<OrderFormData>({
    defaultValues: {
      chaiType: '',
      quantity: 16,
      distance: 0,
      name: '',
      email: '',
      phone: '',
      address: '',
    },
  })

  const quantity = watch('quantity')
  const distance = watch('distance')

  const calculateTotal = (quantity: number, distance?: number) => {
    let total = quantity * PRICE_PER_CUP
    if (distance && distance > DELIVERY_THRESHOLD) {
      total += ADDITIONAL_FEE
    }
    return total
  }

  const onSubmit = (data: OrderFormData) => {
    console.log(`Order submitted: ${JSON.stringify(data)}`)
    // Here you would typically send the order to your backend
  }

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
      <Typography variant="h1" component="h1" align="center" gutterBottom>
        Place Your Order
      </Typography>
      <Paper elevation={3} sx={{ mt: 4 }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          centered
          sx={{
            '& .MuiTabs-indicator': { backgroundColor: bangladeshRed },
          }}
          aria-label="Order type tabs"
        >
          <Tab label="Chai Delivery" id="order-tab-0" aria-controls="order-tabpanel-0" />
          <Tab label="Chai Cart" id="order-tab-1" aria-controls="order-tabpanel-1" />
        </Tabs>

        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="on">
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="chaiType"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth required>
                      <InputLabel id="chai-type-label-delivery">Chai Type</InputLabel>
                      <Select
                        {...field}
                        labelId="chai-type-label-delivery"
                        id="chai-type-select-delivery"
                        label="Chai Type"
                      >
                        {chaiTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="quantity"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth required>
                      <InputLabel id="quantity-label-delivery">Number of Cups</InputLabel>
                      <Select
                        {...field}
                        labelId="quantity-label-delivery"
                        id="quantity-select-delivery"
                        label="Number of Cups"
                      >
                        {chaiOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option} cups
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="distance"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Distance from Watertown, MA (miles)"
                      type="number"
                      InputProps={{ 
                        inputProps: { 
                          min: 0,
                          'aria-label': 'Distance in miles',
                        }
                      }}
                      id="distance-input"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  Total: ${calculateTotal(quantity, distance || 0).toFixed(2)}
                  {distance && distance > DELIVERY_THRESHOLD && (
                    <Typography variant="caption" color="error" component="div" display="block">
                      * Includes ${ADDITIONAL_FEE} delivery fee for distance over {DELIVERY_THRESHOLD} miles
                    </Typography>
                  )}
                </Typography>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="chaiType"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth required>
                      <InputLabel id="chai-type-label-cart">Chai Type</InputLabel>
                      <Select
                        {...field}
                        labelId="chai-type-label-cart"
                        id="chai-type-select-cart"
                        label="Chai Type"
                      >
                        {chaiTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="quantity"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth required>
                      <InputLabel id="quantity-label-cart">Number of Cups</InputLabel>
                      <Select
                        {...field}
                        labelId="quantity-label-cart"
                        id="quantity-select-cart"
                        label="Number of Cups"
                      >
                        {chaiOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option} cups
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  Total: ${calculateTotal(quantity).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </TabPanel>

          <Box sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Contact Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Name"
                      required
                      id="name-input"
                      autoComplete="name"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true, pattern: /^\S+@\S+$/i }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      required
                      type="email"
                      id="email-input"
                      autoComplete="email"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Phone"
                      required
                      type="tel"
                      id="phone-input"
                      autoComplete="tel"
                    />
                  )}
                />
              </Grid>
              {tabValue === 0 && (
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="address"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Delivery Address"
                        required
                        id="address-input"
                        autoComplete="street-address"
                      />
                    )}
                  />
                </Grid>
              )}
            </Grid>
          </Box>

          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: bangladeshGreen,
                '&:hover': {
                  backgroundColor: bangladeshRed,
                },
              }}
            >
              Place Order
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default Order
