'use client';

import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { bangladeshGreen, bangladeshRed } from '@/theme';
import PageLayout from '@/components/PageLayout';

const faqs = [
  {
    question: 'What makes Mezbani Chai unique?',
    answer:
      'Mezbani Chai offers authentic Bangladeshi-style chai made with premium ingredients and traditional brewing methods. Our recipes have been passed down through generations, ensuring an authentic and delicious experience with every cup.',
  },
  {
    question: 'Do you offer catering services?',
    answer:
      'Yes, we provide catering services for various events including corporate meetings, weddings, private parties, and cultural events. We offer customizable packages to suit your specific needs and guest count.',
  },
  {
    question: 'What are your delivery areas?',
    answer:
      'We deliver within a 30-mile radius of our location in Watertown, MA. Deliveries beyond 30 miles incur an additional fee. Please check our Order page for specific delivery fees and minimum order requirements.',
  },
  {
    question: 'How far in advance should I place a bulk order?',
    answer:
      'For bulk orders (more than 50 cups), we recommend placing your order at least 48 hours in advance. This allows us to ensure we have all necessary ingredients and can properly prepare for your order.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, digital payments (Apple Pay, Google Pay), and cash for in-person purchases. For catering and bulk orders, we also accept corporate checks and bank transfers.',
  },
  {
    question: 'Do you offer any dairy-free options?',
    answer:
      'Yes, we can prepare our chai with various non-dairy alternatives including oat milk, almond milk, and soy milk. Please specify your preference when placing your order.',
  },
  {
    question: 'How do you ensure the chai stays hot during delivery?',
    answer:
      'We use professional-grade thermal containers that keep the chai hot for up to 4 hours. For large orders, we also provide commercial dispensers to maintain the perfect serving temperature.',
  },
  {
    question: 'Can I customize the sweetness level?',
    answer:
      'Yes, you can request your preferred sweetness level when placing an order. We offer options from unsweetened to extra sweet to accommodate different preferences.',
  },
];

export default function FAQs() {
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
          color: 'common.white'
        }}
      >
        Frequently Asked Questions
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph align="center">
        Find answers to common questions about our services and products
      </Typography>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 3,
          bgcolor: 'background.paper',
        }}
      >
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            sx={{
              bgcolor: 'background.paper',
              '&:before': {
                display: 'none',
              },
              '&:not(:last-child)': {
                borderBottom: 1,
                borderColor: 'divider',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: bangladeshRed }} />}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 106, 78, 0.05)',
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: bangladeshGreen, fontSize: '1.1rem' }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </PageLayout>
  );
}
