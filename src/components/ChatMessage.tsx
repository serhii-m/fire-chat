import React, { useState } from 'react';
import { DocumentData, doc, deleteDoc } from 'firebase/firestore';

import { Avatar, Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { getMessageTime } from '../util';
import { auth, db } from '../firebase';
import { styles } from '../styles';

export const ChatMessage = ({ message }: DocumentData) => {
  const { text, uid, photoURL, createdAt, user, id } = message;
  const [visible, setVisible] = useState(false);

  const showButton = (): void => {
    setVisible(!visible);
  };

  const deleteMessage = async (docId: string) => {
    if (uid === auth?.currentUser?.uid) {
      try {
        await deleteDoc(doc(db, 'messages', docId));
      } catch (err: unknown) {
        if (err instanceof Error) {
          throw new Error(err?.message);
        } else {
          throw new Error(String(err));
        }
      }
    }
  };

  const messageKind =
    uid === auth?.currentUser?.uid
      ? styles.sentMessage
      : styles.receivedMessage;
  const messageTime = createdAt && getMessageTime(createdAt);

  return (
    <Box sx={messageKind} onClick={showButton}>
      {uid === auth?.currentUser?.uid && visible && (
        <IconButton
          sx={styles.deleteButton}
          aria-label="delete"
          onClick={() => deleteMessage(id)}
        >
          <DeleteIcon />
        </IconButton>
      )}
      <Avatar src={photoURL} alt="user-avatar" sx={styles.userAvatar}>
        {user?.displayName}
      </Avatar>
      <Box sx={styles.messageWrapper}>
        <Typography variant="caption" sx={styles.messageTime}>
          {user} &nbsp; &nbsp;
          {messageTime}
        </Typography>
        <Typography sx={styles.messageText}>{text}</Typography>
      </Box>
    </Box>
  );
};
