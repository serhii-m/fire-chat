import { useNavigate } from 'react-router-dom';

import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';

import { auth } from '../firebase';

export const SignOut = () => {
  const navigate = useNavigate();

  const signOut = () => {
    auth
      .signOut()
      .then(() => navigate('/'))
      .catch(() => {
        throw new Error('Sign out Error in SignOut.tsx!');
      });
  };

  return (
    auth?.currentUser && (
      <IconButton size="large" sx={{ color: '#fff' }} onClick={signOut}>
        <LogoutIcon />
      </IconButton>
    )
  );
};
