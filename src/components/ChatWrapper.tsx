import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { SignOut } from './SignOut';
import { styles } from '../styles';

export const ChatWrapper: React.FC = () => {
  const location = useLocation();
  const isCorrectRoute = location?.pathname === '/chat';

  return (
    <Box sx={styles.app}>
      <Box component="header" sx={styles.appBar}>
        <Box>
          <Typography variant="h4" sx={styles.title}>
            &#128293; fire chat
          </Typography>
        </Box>
        {isCorrectRoute && <SignOut />}
      </Box>
      <Box component="section" sx={styles.section}>
        <Outlet />
      </Box>
    </Box>
  );
};
