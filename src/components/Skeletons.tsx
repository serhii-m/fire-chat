import React from 'react';
import { Container } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const ShortenedFormSkeleton: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <Stack spacing={2}>
        <Skeleton variant="rectangular" animation="wave" height={56} />
        <Skeleton variant="rectangular" animation="wave" height={36} />
        <Skeleton variant="text" animation="wave" />
      </Stack>
    </Container>
  );
};

const FullFormSkeleton: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <Stack spacing={2}>
        <Skeleton variant="rectangular" animation="wave" height={36} />
        <Skeleton variant="rectangular" animation="wave" height={56} />
        <Skeleton variant="rectangular" animation="wave" height={56} />
        <Skeleton variant="rectangular" animation="wave" height={36} />
        <Skeleton variant="text" animation="wave" />
      </Stack>
    </Container>
  );
};

export { ShortenedFormSkeleton, FullFormSkeleton };
