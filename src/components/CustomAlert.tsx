import React from 'react';

import { Alert, Box, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { TCustomAlertProps } from '../types';

export const CustomAlert: React.FC<TCustomAlertProps> = ({
  open,
  onClick,
  children,
}) => {
  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Collapse in={open}>
        <Alert
          variant="filled"
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClick}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mt: 2 }}
        >
          {children}
        </Alert>
      </Collapse>
    </Box>
  );
};
