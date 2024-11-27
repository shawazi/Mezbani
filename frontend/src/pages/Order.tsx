import { useState, useEffect } from 'react'
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
  // Alert,
} from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { bangladeshGreen, bangladeshRed } from '../theme'
import { getMenuItems, MenuItem as MenuItemType } from '../lib/firebase/firestore'
import LoadingSpinner from '../components/LoadingSpinner'
import { calculateDistanceFromWatertown, ZipCodeError } from '../utils/zipcode'
import { useNavigate } from 'react-router-dom';

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
const DELIVERY_FEE = 20 // dollars per 30 mile increment
// const ADDITIONAL_FEE = 25 // dollars

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
  const [deliverySubtotal, setDeliverySubtotal] = useState<string>('0.00')
  const [cartSubtotal, setCartSubtotal] = useState<string>('0.00')
  const [deliveryFee, setDeliveryFee] = useState<number>(0)
  const [cartFee, setCartFee] = useState<number>(0)
  const [zipError, setZipError] = useState<string | null>(null)
  const [cartZipError, setCartZipError] = useState<string | null>(null)
  const navigate = useNavigate();

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

  const handleDeliverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = chaiDeliveryForm.getValues();
    
    // Prepare order data
    const orderData = {
      items: [
        ...formData.chaiItems.map(item => ({
          ...item,
          name: menuItems.chai.find(i => i.id === item.id)?.name || '',
          price: menuItems.chai.find(i => i.id === item.id)?.price || 0,
        })),
        ...formData.foodItems.map(item => ({
          ...item,
          name: menuItems.food.find(i => i.id === item.id)?.name || '',
          price: menuItems.food.find(i => i.id === item.id)?.price || 0,
        }))
      ],
      subtotal: deliverySubtotal,
      deliveryFee: calculateDeliveryFee(formData.distance),
      total: deliveryTotal,
      zipCode: formData.zipCode,
      distance: formData.distance,
    };

    // Navigate to checkout with order data
    navigate('/checkout', { state: { orderData } });
  };

  const handleCartSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = chaiCartForm.getValues();
    
    // Prepare order data
    const orderData = {
      items: [
        ...formData.chaiItems.map(item => ({
          ...item,
          name: menuItems.chai.find(i => i.id === item.id)?.name || '',
          price: menuItems.chai.find(i => i.id === item.id)?.price || 0,
        })),
        ...formData.foodItems.map(item => ({
          ...item,
          name: menuItems.food.find(i => i.id === item.id)?.name || '',
          price: menuItems.food.find(i => i.id === item.id)?.price || 0,
        }))
      ],
      subtotal: cartSubtotal,
      deliveryFee: calculateDeliveryFee(formData.distance),
      total: cartTotal,
      zipCode: formData.zipCode,
      distance: formData.distance,
    };

    // Navigate to checkout with order data
    navigate('/checkout', { state: { orderData } });
  };

  const handleZipCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zipCode = e.target.value.trim();
    chaiDeliveryForm.setValue('zipCode', zipCode);
    
    if (zipCode.length === 5) {
      try {
        setZipError(null);
        const distance = await calculateDistanceFromWatertown(zipCode);
        chaiDeliveryForm.setValue('distance', distance);
        void updateDeliveryTotal();
      } catch (error: unknown) {
        if (error instanceof ZipCodeError) {
          setZipError(error.message);
        } else if (error instanceof Error) {
          setZipError(error.message);
        } else {
          setZipError('Error calculating distance');
        }
        chaiDeliveryForm.setValue('distance', undefined);
      }
    } else {
      chaiDeliveryForm.setValue('distance', undefined);
    }
  };

  const handleCartZipCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zipCode = e.target.value.trim();
    chaiCartForm.setValue('zipCode', zipCode);
    
    if (zipCode.length === 5) {
      try {
        setCartZipError(null);
        const distance = await calculateDistanceFromWatertown(zipCode);
        chaiCartForm.setValue('distance', distance);
        void updateCartTotal();
      } catch (error: unknown) {
        if (error instanceof ZipCodeError) {
          setCartZipError(error.message);
        } else if (error instanceof Error) {
          setCartZipError(error.message);
        } else {
          setCartZipError('Error calculating distance');
        }
        chaiCartForm.setValue('distance', undefined);
      }
    } else {
      chaiCartForm.setValue('distance', undefined);
    }
  };

  const calculateDeliveryFee = (distance: number | undefined): number => {
    if (!distance) return 0;
    const increments = Math.floor(distance / DELIVERY_THRESHOLD);
    return increments * DELIVERY_FEE;
  };

  const calculateSubtotal = async (
    chaiItems: OrderItem[],
    foodItems: OrderItem[],
  ): Promise<number> => {
    let total = 0;

    // Calculate chai total
    for (const item of chaiItems) {
      const menuItem = menuItems.chai.find((i) => i.id === item.id);
      if (menuItem) {
        total += menuItem.price * item.quantity;
      }
    }

    // Calculate food total
    for (const item of foodItems) {
      const menuItem = menuItems.food.find((i) => i.id === item.id);
      if (menuItem) {
        total += menuItem.price * item.quantity;
      }
    }

    return total;
  };

  const calculateTotal = async (
    chaiItems: OrderItem[],
    foodItems: OrderItem[],
    zipCode?: string
  ): Promise<{ subtotal: number; deliveryFee: number; total: number }> => {
    const subtotal = await calculateSubtotal(chaiItems, foodItems);
    let distance = chaiDeliveryForm.getValues('distance') ?? 0;
    
    if (zipCode && distance === 0) {
      try {
        distance = await calculateDistanceFromWatertown(zipCode);
      } catch (error) {
        console.error('Error calculating distance:', error);
      }
    }

    const deliveryFee = calculateDeliveryFee(distance);
    const total = subtotal + deliveryFee;

    return { subtotal, deliveryFee, total };
  };

  const updateDeliveryTotal = async () => {
    const { subtotal, deliveryFee, total } = await calculateTotal(
      chaiDeliveryForm.getValues('chaiItems') ?? [],
      chaiDeliveryForm.getValues('foodItems') ?? [],
      chaiDeliveryForm.getValues('zipCode')
    );
    setDeliveryTotal(total.toFixed(2));
    setDeliverySubtotal(subtotal.toFixed(2));
    setDeliveryFee(deliveryFee);
  };

  const updateCartTotal = async () => {
    const { subtotal, deliveryFee, total } = await calculateTotal(
      chaiCartForm.getValues('chaiItems') ?? [],
      chaiCartForm.getValues('foodItems') ?? [],
      chaiCartForm.getValues('zipCode')
    );
    setCartTotal(total.toFixed(2));
    setCartSubtotal(subtotal.toFixed(2));
    setCartFee(deliveryFee);
  };

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

  const removeChaiDeliveryItemHandler = (index: number) => {
    removeChaiDeliveryItem(index);
    void updateDeliveryTotal();
  };

  const removeFoodDeliveryItemHandler = (index: number) => {
    removeFoodDeliveryItem(index);
    void updateDeliveryTotal();
  };

  const removeChaiCartItemHandler = (index: number) => {
    removeChaiCartItem(index);
    void updateCartTotal();
  };

  const removeFoodCartItemHandler = (index: number) => {
    removeFoodCartItem(index);
    void updateCartTotal();
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      const chaiItems = await getMenuItems('chai')
      const foodItems = await getMenuItems('food')
      setMenuItems({ chai: chaiItems, food: foodItems })
      setLoading(false)
    }

    fetchMenuItems()
  }, [])

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
            <Grid container spacing={4}>
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
                        aria-label="delete"
                        onClick={() => removeChaiDeliveryItemHandler(index)}
                        sx={{ color: 'error.main' }}
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
                        aria-label="delete"
                        onClick={() => removeFoodDeliveryItemHandler(index)}
                        sx={{ color: 'error.main' }}
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

              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
                  Delivery Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} sx={{ px: 3 }}>
                    <TextField
                      fullWidth
                      label="Zip Code"
                      type="text"
                      onChange={handleZipCodeChange}
                      error={!!zipError}
                      helperText={zipError}
                      inputProps={{ 
                        maxLength: 5,
                        pattern: "[0-9]*",
                        'aria-label': 'Zip Code',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ px: 3 }}>
                    <TextField
                      fullWidth
                      label="Distance from Watertown, MA (miles)"
                      type="number"
                      {...chaiDeliveryForm.register('distance')}
                      InputLabelProps={{ 
                        shrink: true
                      }}
                      InputProps={{ 
                        readOnly: true,
                        inputProps: { 
                          'aria-label': 'Distance in miles',
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ p: 3, textAlign: 'right' }}>
              <Typography variant="body1" gutterBottom>
                Subtotal: ${deliverySubtotal}
              </Typography>
              {deliveryFee > 0 && (
                <Typography variant="body1" color="warning.main" gutterBottom>
                  Delivery Fee: ${deliveryFee.toFixed(2)} 
                  ({Math.floor((chaiDeliveryForm.getValues('distance') ?? 0) / DELIVERY_THRESHOLD)} x ${DELIVERY_FEE} per {DELIVERY_THRESHOLD} miles)
                </Typography>
              )}
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
            <Grid container spacing={4}>
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
                        aria-label="delete"
                        onClick={() => removeChaiCartItemHandler(index)}
                        sx={{ color: 'error.main' }}
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
                        aria-label="delete"
                        onClick={() => removeFoodCartItemHandler(index)}
                        sx={{ color: 'error.main' }}
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

              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
                  Delivery Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} sx={{ px: 3 }}>
                    <TextField
                      fullWidth
                      label="Zip Code"
                      type="text"
                      onChange={handleCartZipCodeChange}
                      error={!!cartZipError}
                      helperText={cartZipError}
                      inputProps={{ 
                        maxLength: 5,
                        pattern: "[0-9]*",
                        'aria-label': 'Zip Code',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ px: 3 }}>
                    <TextField
                      fullWidth
                      label="Distance from Watertown, MA (miles)"
                      type="number"
                      {...chaiCartForm.register('distance')}
                      InputLabelProps={{ 
                        shrink: true
                      }}
                      InputProps={{ 
                        readOnly: true,
                        inputProps: { 
                          'aria-label': 'Distance in miles',
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ p: 3, textAlign: 'right' }}>
              <Typography variant="body1" gutterBottom>
                Subtotal: ${cartSubtotal}
              </Typography>
              {cartFee > 0 && (
                <Typography variant="body1" color="warning.main" gutterBottom>
                  Delivery Fee: ${cartFee.toFixed(2)} 
                  ({Math.floor((chaiCartForm.getValues('distance') ?? 0) / DELIVERY_THRESHOLD)} x ${DELIVERY_FEE} per {DELIVERY_THRESHOLD} miles)
                </Typography>
              )}
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