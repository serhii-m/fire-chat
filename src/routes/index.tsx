import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Typography } from '@mui/material';

import { ChatWrapper } from '../components/ChatWrapper';
import { ProtectedRoute } from '../components/ProtectedRoute';
import {
  ShortenedFormSkeleton,
  FullFormSkeleton,
} from '../components/Skeletons';

import Home from '../pages/Home';
import NotFoundPage from '../pages/NotFoundPage';

const ChatRoom = lazy(() => import('../pages/ChatRoom'));
const SignUp = lazy(() => import('../pages/SignUp'));
const Login = lazy(() => import('../pages/Login'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatWrapper />}>
          <Route index element={<Home />} />
          <Route
            path="signUp"
            element={
              <Suspense fallback={<FullFormSkeleton />}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path="login"
            element={
              <Suspense fallback={<FullFormSkeleton />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="reset"
            element={
              <Suspense fallback={<ShortenedFormSkeleton />}>
                <ResetPassword />
              </Suspense>
            }
          />
          <Route
            path="chat"
            element={
              <Suspense
                fallback={
                  <Typography variant="h5" sx={{ color: '#fff' }}>
                    Loading...
                  </Typography>
                }
              >
                <ProtectedRoute>
                  <ChatRoom />
                </ProtectedRoute>
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
