import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../firebase';

interface IProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: IProps) => {
  const [user] = useAuthState(auth);

  if (!(user && user?.emailVerified)) {
    return <Navigate to="/" />;
  }

  return children;
};
