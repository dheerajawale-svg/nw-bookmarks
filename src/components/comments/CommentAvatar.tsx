import React from 'react';
import { Avatar as MuiAvatar } from '@mui/material';

interface AvatarProps {
  initials: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  initials, 
  size = 'md',
  className = '' 
}) => {
  const sizeStyles = {
    sm: { width: 24, height: 24, fontSize: '11px' },
    md: { width: 28, height: 28, fontSize: '11px' }
  };

  return (
    <MuiAvatar 
      className={className}
      sx={{
        ...sizeStyles[size],
        backgroundColor: 'rgba(0, 140, 154, 0.10)',
        color: '#008C9A',
        fontWeight: 'normal',
        borderRadius: '175px',
      }}
      role="img"
      aria-label={`Avatar for ${initials}`}
    >
      {initials}
    </MuiAvatar>
  );
};