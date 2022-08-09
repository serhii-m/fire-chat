import React from 'react';
import { Link } from 'react-router-dom';

import { sendPasswordResetEmail } from 'firebase/auth';

import { useFormik } from 'formik';

import { Alert, Box, Container, Stack } from '@mui/material';

import { EmailField } from '../components/EmailField';
import { CustomAlert } from '../components/CustomAlert';
import { SubmitButton } from '../components/SubmitButton';

import {
  authErrorMessages,
  formikInitialValues,
  linkStyle,
  resetPasswordInfo,
  resetValidationSchema,
} from '../consts';
import { auth } from '../firebase';
import { assignAuthErrorMessage } from '../util';

const ResetPassword: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [isRegisteredUser, setRegisteredUser] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const formik = useFormik({
    initialValues: formikInitialValues,
    validationSchema: resetValidationSchema,
    onSubmit: (values) => {
      sendPasswordResetEmail(auth, values.email)
        .then(() => {
          setRegisteredUser(true);
          setOpen(false);
        })
        .catch((err) => {
          setOpen(true);
          setErrorMessage(assignAuthErrorMessage(err.code));
        });
    },
  });

  return (
    <Container maxWidth="xs">
      {isRegisteredUser && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {resetPasswordInfo.text}
        </Alert>
      )}
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mb: 3 }}>
        <Stack spacing={2}>
          <EmailField helperText={String(formik.errors.email)} {...formik} />
          <SubmitButton>send password reset email</SubmitButton>
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
        {errorMessage === authErrorMessages.userNotFound && (
          <Link to="/signUp" style={linkStyle}>
            Sign up
          </Link>
        )}
        <Link to="/login" style={linkStyle}>
          Back to login
        </Link>
      </Stack>
    </Container>
  );
};

export default ResetPassword;
