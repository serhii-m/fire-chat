import React from 'react';
import { Button } from '@mui/material';

import { TSubmitButtonProps } from '../types';

export const SubmitButton: React.FC<TSubmitButtonProps> = ({ children }) => {
  return (
    <Button type="submit" variant="contained">
      {children}
    </Button>
  );
};
