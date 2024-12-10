'use client';

import { useState } from 'react';
import {
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
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { bangladeshGreen, bangladeshRed } from '@/theme';
import PageLayout from '@/components/PageLayout';
import LoadingSpinner from '@/components/LoadingSpinner';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface OrderItem {
  id: string;
  quantity: number;
}

interface OrderFormData {
  chaiItems: OrderItem[];
  foodItems: OrderItem[];
  distance?: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  zipCode?: string;
}

// Mock menu items for now
const mockMenuItems = {
  chai: [
    { id: '1', name: 'Classic Masala Chai', price: 3.99, category: 'chai' },
    { id: '2', name: 'Ginger Chai', price: 4.49, category: 'chai' },
  ],
  food: [
    { id: '3', name: 'Samosa', price: 5.99, category: 'food' },
    { id: '4', name: 'Pakora', price: 6.99, category: 'food' },
  ],
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

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
  );
}

const DELIVERY_THRESHOLD = 30; // miles
const DELIVERY_FEE = 20; // dollars per 30 mile increment

export default function Order() {
  const [tabValue, setTabValue] = useState(0);
  const [loading] = useState(false);
  const [zipError, setZipError] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<OrderFormData>({
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
  });

  const { fields: chaiFields, append: appendChai, remove: removeChai } = useFieldArray({
    control,
    name: 'chaiItems',
  });

  const { fields: foodFields, append: appendFood, remove: removeFood } = useFieldArray({
    control,
    name: 'foodItems',
  });

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const onSubmit = async (data: OrderFormData) => {
    console.log('Form submitted:', data);
    // TODO: Implement order submission with Square
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <PageLayout>
      <Typography
        variant="h2"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          fontWeight: 500,
          mb: { xs: 3, sm: 4 },
          color: 'common.white',
        }}
      >
        Place Your Order
      </Typography>

      <Paper 
        elevation={3} 
        sx={{ 
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="order tabs"
            sx={{
              '& .MuiTab-root': {
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: bangladeshGreen,
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: bangladeshGreen,
              },
            }}
          >
            <Tab label="Delivery Order" />
            <Tab label="Pickup Order" />
          </Tabs>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color={bangladeshGreen}>
                  Chai Selection
                </Typography>
                {chaiFields.map((field, index) => (
                  <Box key={field.id} sx={{ mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name={`chaiItems.${index}.id`}
                          control={control}
                          render={({ field }) => (
                            <FormControl fullWidth>
                              <InputLabel>Chai Type</InputLabel>
                              <Select {...field} label="Chai Type">
                                {mockMenuItems.chai.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.name} - ${item.price}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Controller
                          name={`chaiItems.${index}.quantity`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              type="number"
                              label="Quantity"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <IconButton
                          onClick={() => removeChai(index)}
                          disabled={chaiFields.length === 1}
                        >
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
                <Button
                  startIcon={<Add />}
                  onClick={() => appendChai({ id: '', quantity: 16 })}
                  sx={{ mt: 1 }}
                >
                  Add Chai
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color={bangladeshGreen}>
                  Snacks Selection
                </Typography>
                {foodFields.map((field, index) => (
                  <Box key={field.id} sx={{ mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name={`foodItems.${index}.id`}
                          control={control}
                          render={({ field }) => (
                            <FormControl fullWidth>
                              <InputLabel>Snack Type</InputLabel>
                              <Select {...field} label="Snack Type">
                                {mockMenuItems.food.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.name} - ${item.price}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Controller
                          name={`foodItems.${index}.quantity`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              type="number"
                              label="Quantity"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <IconButton
                          onClick={() => removeFood(index)}
                          disabled={foodFields.length === 1}
                        >
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
                <Button
                  startIcon={<Add />}
                  onClick={() => appendFood({ id: '', quantity: 1 })}
                  sx={{ mt: 1 }}
                >
                  Add Snack
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color={bangladeshGreen}>
                  Contact Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} label="Full Name" fullWidth required />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Email"
                          type="email"
                          fullWidth
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Phone"
                          type="tel"
                          fullWidth
                          required
                        />
                      )}
                    />
                  </Grid>
                  {tabValue === 0 && (
                    <>
                      <Grid item xs={12}>
                        <Controller
                          name="address"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Delivery Address"
                              fullWidth
                              required
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="zipCode"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="ZIP Code"
                              fullWidth
                              required
                              error={!!zipError}
                              helperText={zipError}
                            />
                          )}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 3,
                    backgroundColor: bangladeshRed,
                    '&:hover': {
                      backgroundColor: bangladeshRed,
                      filter: 'brightness(1.1)',
                    },
                  }}
                >
                  Place Order
                </Button>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {/* Pickup order form - similar to delivery but without address fields */}
            {/* Will be implemented when we add Square integration */}
          </TabPanel>
        </form>
      </Paper>
    </PageLayout>
  );
}
