import React from 'react';
import { Avatar as MuiAvatar } from '@mui/material';

interface AvatarProps {
  initials: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ initials, className = '' }) => {
  return (
    <MuiAvatar
      className={className}
      sx={{
        width: 24,
        height: 24,
        fontSize: '11px',
        fontWeight: 'normal',
        backgroundColor: 'rgba(0, 140, 154, 0.1)',
        color: '#008C9A',
      }}
    >
      {initials}
    </MuiAvatar>
  );
};