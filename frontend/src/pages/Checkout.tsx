import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';

interface OrderItem {
  id: string;
  quantity: number;
  name: string;
  price: number;
}

interface OrderData {
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  zipCode: string;
  distance: number;
}

// interface SquareBookingResponse {
//   bookingUrl: string;
// }

// Checkout steps
const steps = ['Order Review', 'Select Delivery Time', 'Sign Contract', 'Payment'];

// Function URLs - replace with your actual function URLs
const FUNCTION_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5001/mezbani-14d1e/us-east4'
  : 'https://us-east4-mezbani-14d1e.cloudfunctions.net';

const FUNCTION_NAME = 'getSquareBookingUrlHttp'; // Make sure to use the correct function name

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [bookingUrl, setBookingUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.orderData) {
      console.log('Raw order data:', location.state.orderData);
      
      // Ensure numeric values are properly converted
      const sanitizedOrderData: OrderData = {
        ...location.state.orderData,
        subtotal: Number(location.state.orderData.subtotal),
        deliveryFee: Number(location.state.orderData.deliveryFee),
        total: Number(location.state.orderData.total),
        items: location.state.orderData.items.map((item: OrderItem) => ({
          ...item,
          price: Number(item.price),
          quantity: Number(item.quantity)
        }))
      };
      
      console.log('Sanitized order data:', sanitizedOrderData);
      setOrderData(sanitizedOrderData);
      
      // Initialize Square booking
      initializeSquareBooking();
    } else {
      console.log('No order data in location state');
      navigate('/order'); // Redirect if no order data
    }
  }, [location, navigate]);

  const initializeSquareBooking = async () => {
    try {
      setIsLoading(true);
      const functionUrl = `${FUNCTION_BASE_URL}/${FUNCTION_NAME}`;
      console.log('Fetching from:', functionUrl);
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response not OK:', {
          url: functionUrl,
          status: response.status,
          statusText: response.statusText,
          errorText,
          headers: Object.fromEntries(response.headers.entries())
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Booking URL response:', data);
      if (!data.bookingUrl) {
        throw new Error('No booking URL in response');
      }
      setBookingUrl(data.bookingUrl);
    } catch (error) {
      console.error('Booking initialization error:', error);
      setError(error instanceof Error ? error.message : 'Failed to initialize booking');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center">
          {error}
        </Typography>
        <Box textAlign="center" mt={2}>
          <Button variant="contained" onClick={() => navigate('/order')}>
            Return to Order Page
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%', mt: 4 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
          {activeStep === 0 && orderData && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Order Summary
              </Typography>
              {orderData.items.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>
                    {item.quantity}x {item.name}
                  </Typography>
                  <Typography>
                    ${typeof item.price === 'number' && typeof item.quantity === 'number' 
                      ? (item.price * item.quantity).toFixed(2) 
                      : '0.00'}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ mt: 2, borderTop: 1, borderColor: 'divider', pt: 2 }}>
                <Typography>
                  Subtotal: ${typeof orderData.subtotal === 'number' ? orderData.subtotal.toFixed(2) : '0.00'}
                </Typography>
                <Typography>
                  Delivery Fee: ${typeof orderData.deliveryFee === 'number' ? orderData.deliveryFee.toFixed(2) : '0.00'}
                </Typography>
                <Typography variant="h6">
                  Total: ${typeof orderData.total === 'number' ? orderData.total.toFixed(2) : '0.00'}
                </Typography>
              </Box>
            </Box>
          )}

          {activeStep === 1 && bookingUrl && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Select Delivery Time
              </Typography>
              <iframe
                src={bookingUrl}
                style={{ width: '100%', height: '600px', border: 'none' }}
                title="Square Booking"
              />
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Sign Contract
              </Typography>
              {/* Contract signing component will go here */}
            </Box>
          )}

          {activeStep === 3 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Payment
              </Typography>
              {/* Payment component will go here */}
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
            >
              {activeStep === steps.length - 2 ? 'Proceed to Payment' : 'Next'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
