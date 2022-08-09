import React from 'react';
import { Stack, Typography } from '@mui/material';

const NotFoundPage: React.FC = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh' }}
    >
      <Typography variant="h4" sx={{ color: '#fff' }}>
        404 Page Not Found
      </Typography>
      <Typography variant="h5">&#128575;</Typography>
    </Stack>
  );
};

export default NotFoundPage;
