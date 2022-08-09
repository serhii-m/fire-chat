import React from 'react';

import { IconButton, InputAdornment, TextField } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import { FormikProps, FormikValues } from 'formik';

import { TPasswordFieldProps } from '../types';

export const PasswordField: React.FC<
  FormikProps<FormikValues> & TPasswordFieldProps
> = ({ ...props }) => {
  return (
    <TextField
      variant="filled"
      id="password"
      name="password"
      label="Password"
      type={props.type}
      value={props.values.password}
      sx={{ backgroundColor: '#fff' }}
      onChange={props.handleChange}
      error={props.touched.password && Boolean(props.errors.password)}
      helperText={
        props.touched.password &&
        Boolean(props.errors.password) &&
        props.helperText
      }
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={props.onClick}
              onMouseDown={props.onMouseDown}
              edge="end"
            >
              {props.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
