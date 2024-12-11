import { Container } from '@mui/material';
import MenuPageContent from '@/components/MenuPageContent';

export const metadata = {
  title: 'Our Menu - Mezbani',
  description: 'Explore our selection of authentic chai and delicious snacks.',
};

export default function Menu() {
  return (
    <Container maxWidth="lg">
      <MenuPageContent />
    </Container>
  );
}
