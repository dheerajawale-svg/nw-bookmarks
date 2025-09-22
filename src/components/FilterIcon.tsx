import React from 'react';
import { Box } from '@mui/material';

interface FilterIconProps {
  type: 'lf' | 'hf' | 'notch';
}

export const FilterIcon: React.FC<FilterIconProps> = ({ type }) => {
  return (
    <Box
      component="svg"
      sx={{
        width: 16,
        height: 17,
        display: 'inline-block',
        color: 'text.secondary',
      }}
      viewBox="0 0 16 17"
      fill="none"
    >
      <path d="M14.0002 2.99973C14.0002 3.27586 13.7764 3.49972 13.5002 3.49973L7.49927 3.49973C5.01422 3.49997 2.99933 5.51465 2.99927 7.99972L2.99927 14.0007C2.99903 14.2766 2.77526 14.5007 2.49927 14.5007C2.22348 14.5005 1.99951 14.2765 1.99927 14.0007L1.99927 7.99972C1.99933 4.96237 4.46194 2.49997 7.49927 2.49973L13.5002 2.49973C13.7764 2.49973 14.0002 2.72359 14.0002 2.99973Z" fill="currentColor"/>
      <path d="M6.00036 14.5003H8.36924V13.8699H6.80728V10.5003H6.00036V14.5003Z" fill="currentColor"/>
      <path d="M8.88221 14.5003H9.68913V12.7467H11.0494V12.1163H9.68913V11.1306H11.1185V10.5003H8.88221V14.5003Z" fill="currentColor"/>
      <path d="M11.7641 14.5003H12.571V12.7467H13.9312V12.1163H12.571V11.1306H14.0004V10.5003H11.7641V14.5003Z" fill="currentColor"/>
    </Box>
  );
};