import React from 'react';
import { useNavigate } from 'react-router-dom';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { Box, Button } from '@mui/material';

import { GoogleIcon } from './GoogleIcon';
import { auth } from '../firebase';

export const LoginWithGoogle = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate('/chat');
  };

  return (
    <Box>
      <Button
        fullWidth
        sx={{ mt: 3 }}
        variant="contained"
        onClick={signInWithGoogle}
      >
        <GoogleIcon />
        login with google
      </Button>
    </Box>
  );
};
