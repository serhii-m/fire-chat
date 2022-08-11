import React from 'react';

import { authErrorCodes, authErrorMessages } from '../consts';

export const handleMouseDownPassword = (
  event: React.MouseEvent<HTMLButtonElement>,
) => {
  event.preventDefault();
};

export const handlePressEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
};

export const getMessageTime = (seconds = 0) => {
  if (seconds) {
    const timeStr = new Date(seconds * 1000).toTimeString().slice(0, 8);
    const dateStr = new Date(seconds * 1000).toDateString().slice(3, 10);
    return `${timeStr}, ${dateStr}`;
  }

  return '';
};

export const assignAuthErrorMessage = (errorCode = '') => {
  switch (errorCode) {
    case authErrorCodes.wrongPassword:
      return authErrorMessages.wrongPassword;
    case authErrorCodes.userNotFound:
      return authErrorMessages.userNotFound;
    case authErrorCodes.emailAlreadyInUse:
      return authErrorMessages.emailAlreadyInUse;
    default:
      return errorCode;
  }
};
