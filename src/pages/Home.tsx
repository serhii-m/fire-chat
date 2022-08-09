import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Container, Stack, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import { LoginWithGoogle } from '../components/LoginWithGoogle';
import { linkStyle } from '../consts';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xs">
      <Typography variant="h3" sx={{ mb: 3, color: '#fff' }}>
        Join Fire Chat
      </Typography>
      <Stack spacing={0.5}>
        <Button variant="contained" onClick={() => navigate('/signUp')}>
          <MailOutlineIcon sx={{ mr: 2 }} />
          sign up with email
        </Button>
        <Typography variant="body1" sx={{ color: '#fff' }}>
          Already have an account?
        </Typography>
        <Link to="/login" style={linkStyle}>
          Login
        </Link>
        <LoginWithGoogle />
      </Stack>
    </Container>
  );
};

export default Home;
