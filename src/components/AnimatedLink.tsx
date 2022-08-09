import React from 'react';
import { Box } from '@mui/material';

import { styles } from '../styles';
import { TAnimatedLinkProps } from '../types';

export const AnimatedLink: React.FC<TAnimatedLinkProps> = ({ onClick }) => {
  return (
    <Box sx={styles.animatedLink} onClick={onClick}>
      <svg viewBox="0 0 100 20">
        <defs>
          <linearGradient id="gradient">
            <stop stopColor="gold" />
          </linearGradient>
          <pattern
            id="wave"
            x="0"
            y="-0.5"
            width="100%"
            height="100%"
            patternUnits="userSpaceOnUse"
          >
            <path
              id="wavePath"
              d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z"
              mask="url(#mask)"
              fill="url(#gradient)"
            >
              <animateTransform
                attributeName="transform"
                begin="0s"
                dur="2s"
                type="translate"
                from="0,0"
                to="40,0"
                repeatCount="indefinite"
              />
            </path>
          </pattern>
        </defs>
        <text
          textAnchor="middle"
          x="50"
          y="15"
          fontSize="17"
          fill="blue"
          fillOpacity="0.1"
        >
          Login
        </text>
        <text
          textAnchor="middle"
          x="50"
          y="15"
          fontSize="17"
          fill="url(#wave)"
          fillOpacity="1"
        >
          Login
        </text>
      </svg>
    </Box>
  );
};
