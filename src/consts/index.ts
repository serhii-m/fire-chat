import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';

import * as yup from 'yup';
import { FormikValues } from 'formik';

import { TMessage } from '../types';

const messageConverter: FirestoreDataConverter<TMessage> = {
  toFirestore(message: WithFieldValue<TMessage>): DocumentData {
    return {
      text: message.text,
      createdAt: message.createdAt,
      uid: message.uid,
      photoURL: message.photoURL,
      user: message.user,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): TMessage {
    const data = snapshot.data(options);
    return {
      text: data.text,
      createdAt: data.createdAt,
      uid: data.uid,
      photoURL: data.photoURL,
      user: data.user,
      id: snapshot.id,
    };
  },
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

const resetValidationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});

const formikInitialValues: FormikValues = {
  email: '',
  password: '',
};

const authErrorCodes = {
  emailAlreadyInUse: 'auth/email-already-in-use',
  wrongPassword: 'auth/wrong-password',
  userNotFound: 'auth/user-not-found',
};

const authErrorMessages = {
  emailAlreadyInUse:
    'You are already registered in the chat! Click the Login below to login.',
  wrongPassword: 'The password is wrong!',
  userNotFound:
    'You are not registered in the chat yet! Click the Sign up below to register.',
  emailNotVerified:
    'Your email is not verified! Please go to your mailbox and follow the instructions in the email you received.',
};

const verificationInfo = {
  text: `Email verification successfully sent! Please check your email inbox.
             Note: It is possible that the sent message will end up in spam.`,
};

const resetPasswordInfo = {
  text: `Reset email sent successfully. Please check your email inbox. 
  Note: It is possible that the sent message will end up in spam.`,
};

const linkStyle = {
  color: '#fff',
  fontWeight: 700,
};

export {
  messageConverter,
  validationSchema,
  resetValidationSchema,
  formikInitialValues,
  authErrorCodes,
  authErrorMessages,
  verificationInfo,
  linkStyle,
  resetPasswordInfo,
};
