import { useState, useEffect, useCallback } from 'react'
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
  IconButton,
} from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { bangladeshGreen, bangladeshRed } from '../theme'
import { getMenuItems, MenuItem as MenuItemType } from '../lib/firebase/firestore'
import LoadingSpinner from '../components/LoadingSpinner'

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

const DELIVERY_THRESHOLD = 30 // miles
const ADDITIONAL_FEE = 25 // dollars

interface OrderItem {
  id: string
  quantity: number
}

interface OrderFormData {
  chaiItems: OrderItem[]
  foodItems: OrderItem[]
  distance?: number
  name: string
  email: string
  phone: string
  address?: string
  zipCode?: string
}

const Order = () => {
  const [tabValue, setTabValue] = useState(0)
  const [menuItems, setMenuItems] = useState<{
    chai: MenuItemType[]
    food: MenuItemType[]
  }>({ chai: [], food: [] })
  const [loading, setLoading] = useState(true)
  const [deliveryTotal, setDeliveryTotal] = useState<string>('0.00')
  const [cartTotal, setCartTotal] = useState<string>('0.00')

  const chaiDeliveryForm = useForm<OrderFormData>({
    defaultValues: {
      chaiItems: [{ id: '', quantity: 16 }],
      foodItems: [{ id: '', quantity: 1 }],
      distance: 0,
      name: '',
      email: '',
      phone: '',
      address: '',
      zipCode: '',
    },
  })

  const chaiCartForm = useForm<OrderFormData>({
    defaultValues: {
      chaiItems: [{ id: '', quantity: 16 }],
      foodItems: [{ id: '', quantity: 1 }],
    },
  })

  const handleDeliverySubmit = chaiDeliveryForm.handleSubmit((data) => {
    console.log(`Delivery Order submitted: ${JSON.stringify(data)}`)
    // Future integration with SquareUp for delivery
  })

  const handleCartSubmit = chaiCartForm.handleSubmit((data) => {
    console.log(`Cart Order submitted: ${JSON.stringify(data)}`)
    // Future integration with SquareUp for cart
  })

  const calculateDistanceFromZip = useCallback(async (zipCode: string) => {
    // Placeholder function to calculate distance from zip code 02472
    // In a real-world scenario, you would use an API to calculate the distance
    if (zipCode === '02472') return 0
    return 10 // Assume 10 miles for other zip codes for demonstration
  }, [])

  const calculateTotal = useCallback(async (chaiItems: OrderItem[], foodItems: OrderItem[], zipCode?: string) => {
    let total = 0

    chaiItems.forEach(item => {
      const chaiItem = menuItems.chai.find(chai => chai.id === item.id)
      if (chaiItem) {
        total += chaiItem.price * item.quantity
      }
    })

    foodItems.forEach(item => {
      const foodItem = menuItems.food.find(food => food.id === item.id)
      if (foodItem) {
        total += foodItem.price * item.quantity
      }
    })

    if (zipCode) {
      const distance = await calculateDistanceFromZip(zipCode)
      if (distance > DELIVERY_THRESHOLD) {
        total += ADDITIONAL_FEE
      }
    }

    return total
  }, [menuItems, calculateDistanceFromZip])

  const { fields: chaiDeliveryFields, append: appendChaiDeliveryItem, remove: removeChaiDeliveryItem } = useFieldArray({
    control: chaiDeliveryForm.control,
    name: 'chaiItems',
  })

  const { fields: foodDeliveryFields, append: appendFoodDeliveryItem, remove: removeFoodDeliveryItem } = useFieldArray({
    control: chaiDeliveryForm.control,
    name: 'foodItems',
  })

  const { fields: chaiCartFields, append: appendChaiCartItem, remove: removeChaiCartItem } = useFieldArray({
    control: chaiCartForm.control,
    name: 'chaiItems',
  })

  const { fields: foodCartFields, append: appendFoodCartItem, remove: removeFoodCartItem } = useFieldArray({
    control: chaiCartForm.control,
    name: 'foodItems',
  })

  useEffect(() => {
    const fetchMenuItems = async () => {
      const chaiItems = await getMenuItems('chai')
      const foodItems = await getMenuItems('food')
      setMenuItems({ chai: chaiItems, food: foodItems })
      setLoading(false)
    }

    fetchMenuItems()
  }, [])

  const updateDeliveryTotal = async () => {
    const total = await calculateTotal(
      chaiDeliveryForm.getValues('chaiItems') ?? [],
      chaiDeliveryForm.getValues('foodItems') ?? [],
      chaiDeliveryForm.getValues('zipCode')
    )
    setDeliveryTotal(total.toFixed(2))
  }

  const updateCartTotal = async () => {
    const total = await calculateTotal(
      chaiCartForm.getValues('chaiItems') ?? [],
      chaiCartForm.getValues('foodItems') ?? []
    )
    setCartTotal(total.toFixed(2))
  }

  if (loading) {
    return <LoadingSpinner />
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

      <Paper elevation={3} sx={{ mt: 4, width: '100%' }}>
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

        <form onSubmit={handleDeliverySubmit} noValidate autoComplete="on">
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom sx={{ color: bangladeshGreen }}>
                  Chai Selection
                </Typography>
                {chaiDeliveryFields.map((field, index) => (
                  <Grid container spacing={2} key={field.id} sx={{ mb: 2, px: 3 }}>
                    <Grid item xs={7}>
                      <FormControl fullWidth required>
                        <InputLabel>Chai Type</InputLabel>
                        <Controller
                          name={`chaiItems.${index}.id`}
                          control={chaiDeliveryForm.control}
                          rules={{ required: true }}
                          render={({ field: selectField }) => (
                            <Select
                              {...selectField}
                              label="Chai Type"
                              onChange={(e) => {
                                selectField.onChange(e);
                                void updateDeliveryTotal();
                              }}
                            >
                              {menuItems.chai.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name} - ${item.price.toFixed(2)}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name={`chaiItems.${index}.quantity`}
                        control={chaiDeliveryForm.control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <FormControl fullWidth required>
                            <InputLabel>Cups</InputLabel>
                            <Select
                              {...field}
                              label="Cups"
                              onChange={(e) => {
                                field.onChange(e);
                                void updateDeliveryTotal();
                              }}
                            >
                              {[16, 32, 50, 66, 82, 100].map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option} cups
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton 
                        onClick={() => removeChaiDeliveryItem(index)}
                        color="error"
                        aria-label="Delete item"
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Grid item xs={12} sx={{ px: 3, mb: 2 }}>
                  <Button 
                    startIcon={<Add />} 
                    onClick={() => appendChaiDeliveryItem({ id: '', quantity: 16 })}
                    variant="outlined"
                  >
                    Add Another Chai
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ px: 3 }}>
                  <TextField
                    fullWidth
                    label="Distance from Watertown, MA (miles)"
                    type="number"
                    {...chaiDeliveryForm.register('distance', { 
                      min: 0,
                      valueAsNumber: true 
                    })}
                    InputProps={{ 
                      inputProps: { 
                        min: 0,
                        'aria-label': 'Distance in miles',
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ px: 3 }}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    type="text"
                    {...chaiDeliveryForm.register('zipCode')}
                    InputProps={{ 
                      inputProps: { 
                        'aria-label': 'Zip Code',
                      }
                    }}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom sx={{ color: bangladeshRed }}>
                  Food Selection
                </Typography>
                {foodDeliveryFields.map((field, index) => (
                  <Grid container spacing={2} key={field.id} sx={{ mb: 2, px: 3 }}>
                    <Grid item xs={7}>
                      <FormControl fullWidth required>
                        <InputLabel>Food Item</InputLabel>
                        <Controller
                          name={`foodItems.${index}.id`}
                          control={chaiDeliveryForm.control}
                          rules={{ required: true }}
                          render={({ field: selectField }) => (
                            <Select
                              {...selectField}
                              label="Food Item"
                              onChange={(e) => {
                                selectField.onChange(e);
                                void updateDeliveryTotal();
                              }}
                            >
                              {menuItems.food.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name} - ${item.price.toFixed(2)}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name={`foodItems.${index}.quantity`}
                        control={chaiDeliveryForm.control}
                        rules={{ required: true, min: 1, max: 100 }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Quantity"
                            type="number"
                            onChange={(e) => {
                              field.onChange(e);
                              void updateDeliveryTotal();
                            }}
                            inputProps={{ min: 1, max: 100 }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton 
                        onClick={() => removeFoodDeliveryItem(index)}
                        color="error"
                        aria-label="Delete item"
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Grid item xs={12} sx={{ px: 3, mb: 2 }}>
                  <Button 
                    startIcon={<Add />} 
                    onClick={() => appendFoodDeliveryItem({ id: '', quantity: 1 })}
                    variant="outlined"
                  >
                    Add Another Food Item
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ p: 3, textAlign: 'right' }}>
              <Typography variant="h5" gutterBottom>
                Total: ${deliveryTotal}
              </Typography>
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
          </TabPanel>

        </form>

        <form onSubmit={handleCartSubmit} noValidate autoComplete="on">
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom sx={{ color: bangladeshGreen }}>
                  Chai Cart Selection
                </Typography>
                {chaiCartFields.map((field, index) => (
                  <Grid container spacing={2} key={field.id} sx={{ mb: 2, px: 3 }}>
                    <Grid item xs={7}>
                      <FormControl fullWidth required>
                        <InputLabel>Chai Type</InputLabel>
                        <Controller
                          name={`chaiItems.${index}.id`}
                          control={chaiCartForm.control}
                          rules={{ required: true }}
                          render={({ field: selectField }) => (
                            <Select
                              {...selectField}
                              label="Chai Type"
                              onChange={(e) => {
                                selectField.onChange(e);
                                void updateCartTotal();
                              }}
                            >
                              {menuItems.chai.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name} - ${item.price.toFixed(2)}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name={`chaiItems.${index}.quantity`}
                        control={chaiCartForm.control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <FormControl fullWidth required>
                            <InputLabel>Cups</InputLabel>
                            <Select
                              {...field}
                              label="Cups"
                              onChange={(e) => {
                                field.onChange(e);
                                void updateCartTotal();
                              }}
                            >
                              {[16, 32, 50, 66, 82, 100].map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option} cups
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton 
                        onClick={() => removeChaiCartItem(index)}
                        color="error"
                        aria-label="Delete item"
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Grid item xs={12} sx={{ px: 3, mb: 2 }}>
                  <Button 
                    startIcon={<Add />} 
                    onClick={() => appendChaiCartItem({ id: '', quantity: 16 })}
                    variant="outlined"
                  >
                    Add Another Chai
                  </Button>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom sx={{ color: bangladeshRed }}>
                  Food Cart Selection
                </Typography>
                {foodCartFields.map((field, index) => (
                  <Grid container spacing={2} key={field.id} sx={{ mb: 2, px: 3 }}>
                    <Grid item xs={7}>
                      <FormControl fullWidth required>
                        <InputLabel>Food Item</InputLabel>
                        <Controller
                          name={`foodItems.${index}.id`}
                          control={chaiCartForm.control}
                          rules={{ required: true }}
                          render={({ field: selectField }) => (
                            <Select
                              {...selectField}
                              label="Food Item"
                              onChange={(e) => {
                                selectField.onChange(e);
                                void updateCartTotal();
                              }}
                            >
                              {menuItems.food.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name} - ${item.price.toFixed(2)}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name={`foodItems.${index}.quantity`}
                        control={chaiCartForm.control}
                        rules={{ required: true, min: 1, max: 100 }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Quantity"
                            type="number"
                            onChange={(e) => {
                              field.onChange(e);
                              void updateCartTotal();
                            }}
                            inputProps={{ min: 1, max: 100 }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton 
                        onClick={() => removeFoodCartItem(index)}
                        color="error"
                        aria-label="Delete item"
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Grid item xs={12} sx={{ px: 3, mb: 2 }}>
                  <Button 
                    startIcon={<Add />} 
                    onClick={() => appendFoodCartItem({ id: '', quantity: 1 })}
                    variant="outlined"
                  >
                    Add Another Food Item
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ p: 3, textAlign: 'right' }}>
              <Typography variant="h5" gutterBottom>
                Total: ${cartTotal}
              </Typography>
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
          </TabPanel>

        </form>

      </Paper>
    </Container>
  )
}

export default Order