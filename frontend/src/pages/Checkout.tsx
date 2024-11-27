import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  CircularProgress,
} from '@mui/material';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Define types for our order data
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

interface SquareBookingResponse {
  bookingUrl: string;
}

// Checkout steps
const steps = ['Order Review', 'Select Delivery Time', 'Sign Contract', 'Payment'];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [bookingUrl, setBookingUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get order data from location state
    if (location.state?.orderData) {
      setOrderData(location.state.orderData);
      // Initialize Square booking
      initializeSquareBooking();
    } else {
      navigate('/order'); // Redirect if no order data
    }
  }, [location, navigate]);

  const initializeSquareBooking = async () => {
    try {
      setIsLoading(true);
      const functions = getFunctions();
      const getBookingUrl = httpsCallable<unknown, SquareBookingResponse>(functions, 'getSquareBookingUrl');
      const result = await getBookingUrl();
      setBookingUrl(result.data.bookingUrl);
    } catch (err) {
      setError('Failed to initialize booking. Please try again.');
      console.error('Booking initialization error:', err);
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
                  <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
                </Box>
              ))}
              <Box sx={{ mt: 2, borderTop: 1, borderColor: 'divider', pt: 2 }}>
                <Typography>Subtotal: ${orderData.subtotal.toFixed(2)}</Typography>
                <Typography>Delivery Fee: ${orderData.deliveryFee.toFixed(2)}</Typography>
                <Typography variant="h6">Total: ${orderData.total.toFixed(2)}</Typography>
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
