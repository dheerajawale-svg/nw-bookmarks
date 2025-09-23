import React from 'react';
import { type SxProps, type Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface AvatarProps {
  initials: string;
  sx?: SxProps<Theme>;
}

export const Avatar: React.FC<AvatarProps> = ({ initials, sx }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '1.5rem', // w-6
        height: '1.5rem', // h-6
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,140,154,0.10)',
        borderRadius: '50%', // rounded-[200px]
        ...sx,
      }}
      role="img"
      aria-label={`Avatar for ${initials}`}
    >
      <Typography
        sx={{
          color: '#008C9A', // text-[#008C9A]
          textAlign: 'center',
          fontSize: '11px', // text-[11px]
          fontWeight: 400, // font-normal
          lineHeight: '14px', // leading-[14px]
        }}
      >
        {initials}
      </Typography>
    </Box>
  );
};
