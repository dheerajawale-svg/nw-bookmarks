import React from 'react';
import { Box } from '@mui/material';

interface FilterIconProps {
  type: 'lf' | 'hf' | 'notch';
}

export const FilterIcon: React.FC<FilterIconProps> = ({ type }) => {
  const getFilterPath = () => {
    switch (type) {
      case 'lf':
        return (
          <path
            d="M2 2h12v2H4v8H2V2z"
            fill="currentColor"
          />
        );
      case 'hf':
        return (
          <path
            d="M2 2h12v8h-2V4H2V2z"
            fill="currentColor"
          />
        );
      case 'notch':
        return (
          <path
            d="M2 2h12v2H8v4h6v2H8v2h6v2H2V2z"
            fill="currentColor"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      component="svg"
      sx={{
        width: 12,
        height: 12,
        display: 'inline-block',
        color: 'text.secondary',
      }}
      viewBox="0 0 16 16"
      fill="none"
    >
      {getFilterPath()}
    </Box>
  );
};