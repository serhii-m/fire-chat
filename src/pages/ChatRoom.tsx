import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import {
  addDoc,
  DocumentData,
  collection,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import SendIcon from '@mui/icons-material/Send';
import { Box, Button, TextField } from '@mui/material';

import { ChatMessage } from '../components/ChatMessage';
import { messageConverter } from '../consts';
import { handlePressEnter } from '../util';
import { auth, db } from '../firebase';
import { styles } from '../styles';

const ChatRoom: React.FC = () => {
  const oldMessages = useRef<DocumentData[]>();
  const messageRef = collection(db, 'messages').withConverter(messageConverter);
  const q = query(messageRef, orderBy('createdAt'));

  const [messages] = useCollectionData(q);
  const [formValue, setFormValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const boxRef = useRef<HTMLElement>(null);
  const emptyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    oldMessages.current = messages!;

    if (isTyping) {
      return;
    }

    if (boxRef.current) {
      boxRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [messages, isTyping]);

  const handleOnChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setIsTyping(true);
    setFormValue(e.target.value.replace(/^\s+/g, ''));
  };

  const sendMessage = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    setIsTyping(false);

    try {
      const { uid, photoURL } = auth.currentUser!;
      await addDoc(messageRef, {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
        user: auth?.currentUser?.displayName || null,
      });

      setFormValue('');
    } catch (error) {
      throw new Error('ChatRoom Error in sendMessage()');
    }

    if (emptyRef.current) {
      emptyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box ref={boxRef}>
      <Box component="main" sx={styles.main}>
        {messages &&
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        <Box ref={emptyRef} />
      </Box>
      <Box
        component="form"
        onSubmit={sendMessage}
        onKeyDown={handlePressEnter}
        sx={styles.messageForm}
      >
        <TextField
          id="filled-multiline-flexible"
          placeholder="enter text"
          variant="filled"
          fullWidth
          multiline
          maxRows={5}
          value={formValue}
          onChange={handleOnChange}
          InputProps={{
            disableUnderline: true,
            style: { color: '#fff', height: '100%' },
          }}
        />
        {formValue && (
          <Button type="submit" sx={styles.sendButton}>
            <SendIcon color="primary" />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ChatRoom;
