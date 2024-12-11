import { Typography, Grid, Box } from '@mui/material';
import PageLayout from '@/components/PageLayout';
import ContactPageContent from '@/components/ContactPageContent';

export const metadata = {
  title: 'Contact Us - Mezbani',
  description: 'Get in touch with us for any questions or concerns about our chai and snacks.',
};

export default function Contact() {
  return (
    <PageLayout>
      <ContactPageContent />
    </PageLayout>
  );
}
