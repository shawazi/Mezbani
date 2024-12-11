import { Container, Skeleton, Box } from '@mui/material';

export default function Loading() {
  return (
    <Container maxWidth="lg">
      {/* Banner skeleton */}
      <Box sx={{ width: '100%', height: '300px', mb: 4 }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>

      {/* Menu sections skeletons */}
      {[1, 2].map((section) => (
        <Box key={section} sx={{ mb: 6 }}>
          <Skeleton variant="text" width="200px" height={40} sx={{ mb: 2 }} />
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
            {[1, 2, 3, 4].map((item) => (
              <Box key={item} sx={{ p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="60%" height={20} />
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Container>
  );
}
