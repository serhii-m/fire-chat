import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import firebase from 'firebase/compat';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Box, Container, Stack, Typography } from '@mui/material';

import { useFormik } from 'formik';

import { SubmitButton } from '../components/SubmitButton';
import { PasswordField } from '../components/PasswordField';
import { EmailField } from '../components/EmailField';
import { CustomAlert } from '../components/CustomAlert';

import {
  authErrorMessages,
  formikInitialValues,
  linkStyle,
  validationSchema,
} from '../consts';
import { assignAuthErrorMessage, handleMouseDownPassword } from '../util';
import { auth } from '../firebase';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: formikInitialValues,
    validationSchema,
    onSubmit: (values) => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
          if (auth?.currentUser?.emailVerified) {
            navigate('/chat');
          } else {
            setOpen(true);
            setErrorMessage(authErrorMessages.emailNotVerified);
          }
        })
        .catch((err: firebase.FirebaseError) => {
          setOpen(true);
          setErrorMessage(assignAuthErrorMessage(err.code));
        });
    },
  });

  const handleClickShowPassword = useCallback(
    () => setShowPassword(!showPassword),
    [showPassword],
  );

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" sx={{ color: '#fff' }}>
        Login with email and password
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <EmailField helperText={String(formik.errors.email)} {...formik} />
          <PasswordField
            type={showPassword ? 'text' : 'password'}
            helperText={String(formik.errors.password)}
            showPassword={showPassword}
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            {...formik}
          />
          <SubmitButton>login</SubmitButton>
        </Stack>
      </Box>
      <CustomAlert
        open={open}
        onClick={() => {
          setOpen(false);
        }}
      >
        {errorMessage}
      </CustomAlert>
      <Stack spacing={2}>
        {errorMessage && (
          <Link to="/signUp" style={linkStyle}>
            Sign up
          </Link>
        )}
        <Link to="/reset" style={linkStyle}>
          Forgot password?
        </Link>
        <Link to="/" style={linkStyle}>
          Back to main menu
        </Link>
      </Stack>
    </Container>
  );
};

export default Login;
