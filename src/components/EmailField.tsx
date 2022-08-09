import React from 'react';
import { TextField } from '@mui/material';
import { FormikProps, FormikValues } from 'formik';

import { TEmailFieldProps } from '../types';

export const EmailField: React.FC<
  FormikProps<FormikValues> & TEmailFieldProps
> = ({ ...props }) => {
  return (
    <TextField
      variant="filled"
      id="email"
      name="email"
      label="Email"
      value={props.values.email}
      sx={{ backgroundColor: '#fff' }}
      onChange={props.handleChange}
      error={props.touched.email && Boolean(props.errors.email)}
      helperText={
        props.touched.email && Boolean(props.errors.email) && props.helperText
      }
    />
  );
};
