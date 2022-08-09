import React from 'react';
import { FieldValue } from 'firebase/firestore';

export type TMessage = {
  text: string;
  createdAt: FieldValue;
  photoURL: string | null;
  uid: string;
  user: string | null;
  id?: string;
};

export type TSubmitButtonProps = {
  children: React.ReactNode;
};

export type TEmailFieldProps = {
  helperText: React.ReactNode;
};

export type TPasswordFieldProps = {
  type: string;
  helperText: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
  showPassword: boolean;
};

export type TCustomAlertProps = {
  open: boolean | undefined;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};

export type TAnimatedLinkProps = {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};
