import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { useUpdateProfile } from 'react-firebase-hooks/auth';

import { Alert, Box, Container, Stack, Typography } from '@mui/material';

import { useFormik } from 'formik';

import { AnimatedLink } from '../components/AnimatedLink';
import { SubmitButton } from '../components/SubmitButton';
import { EmailField } from '../components/EmailField';
import { PasswordField } from '../components/PasswordField';
import { CustomAlert } from '../components/CustomAlert';

import {
  authErrorMessages,
  formikInitialValues,
  linkStyle,
  validationSchema,
  verificationInfo,
} from '../consts';
import { assignAuthErrorMessage, handleMouseDownPassword } from '../util';
import { auth } from '../firebase';

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailVerified, setEmailVerified] = useState<boolean | undefined>(
    false,
  );

  const navigate = useNavigate();
  const [updateProfile] = useUpdateProfile(auth);

  const formik = useFormik({
    initialValues: formikInitialValues,
    validationSchema,
    onSubmit: (values) => {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(async (user) => {
          await sendEmailVerification(user?.user);
        })
        .then(async () => {
          await updateProfile({
            displayName: auth?.currentUser?.email?.split('@')[0],
          });
        })
        .catch((err) => {
          setOpen(true);
          setErrorMessage(assignAuthErrorMessage(err.code));
        });
    },
  });

  const handleClickShowPassword = useCallback(
    () => setShowPassword(!showPassword),
    [showPassword],
  );

  const refreshUser = async () => {
    if (!isEmailVerified) {
      await auth?.currentUser?.reload().then(() => {
        setEmailVerified(auth?.currentUser?.emailVerified);
      });
    }
  };

  useEffect(() => {
    if (isEmailVerified) {
      navigate('/login');
    }
  }, [isEmailVerified, navigate]);

  return (
    <Container maxWidth="xs">
      {auth?.currentUser && !isEmailVerified && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {verificationInfo.text}
        </Alert>
      )}
      <Typography variant="h5" sx={{ color: '#fff' }}>
        Sign Up with email and password
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
          <SubmitButton>sign up</SubmitButton>
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
        {(auth?.currentUser ||
          errorMessage === authErrorMessages.emailAlreadyInUse) && (
          <AnimatedLink
            onClick={auth?.currentUser ? refreshUser : () => navigate('/login')}
          />
        )}
        <Link to="/" style={linkStyle}>
          Back to main menu
        </Link>
      </Stack>
    </Container>
  );
};

export default SignUp;
