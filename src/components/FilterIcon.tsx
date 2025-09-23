import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface FilterIconProps {
  type: 'lf' | 'hf' | 'notch';
  value: string;
  className?: string;
}

export const FilterIcon: React.FC<FilterIconProps> = ({ type, value, className = '' }) => {
  const iconWrapper = (icon: React.ReactNode) => (
    <Box
      component="span"
      sx={{
        width: 16,
        height: 16,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {icon}
    </Box>
  );

  const renderIcon = () => {
    switch (type) {
      case 'lf':
        return iconWrapper(
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path
              d="M14.0002 2.99973C14.0002 3.27586 13.7764 3.49972 13.5002 3.49973L7.49927 3.49973C5.01422 3.49997 2.99933 5.51465 2.99927 7.99972L2.99927 14.0007C2.99903 14.2766 2.77526 14.5007 2.49927 14.5007C2.22348 14.5005 1.99951 14.2765 1.99927 14.0007L1.99927 7.99972C1.99933 4.96237 4.46194 2.49997 7.49927 2.49973L13.5002 2.49973C13.7764 2.49973 14.0002 2.72359 14.0002 2.99973Z"
              fill="#707575"
            />
            <path d="M6.00036 14.5003H8.36924V13.8699H6.80728V10.5003H6.00036V14.5003Z" fill="#707575" />
            <path d="M8.88221 14.5003H9.68913V12.7467H11.0494V12.1163H9.68913V11.1306H11.1185V10.5003H8.88221V14.5003Z" fill="#707575" />
            <path d="M11.7641 14.5003H12.571V12.7467H13.9312V12.1163H12.571V11.1306H14.0004V10.5003H11.7641V14.5003Z" fill="#707575" />
          </svg>
        );
      case 'hf':
        return iconWrapper(
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path
              d="M13.5002 14.5003C13.2241 14.5003 13.0002 14.2764 13.0002 14.0003L13.0002 7.99931C13 5.51427 10.9853 3.49938 8.50024 3.49931H2.49927C2.22333 3.49907 1.99927 3.27531 1.99927 2.99931C1.99951 2.72353 2.22348 2.49955 2.49927 2.49931H8.50024C11.5376 2.49938 14 4.96198 14.0002 7.99931L14.0002 14.0003C14.0002 14.2764 13.7764 14.5003 13.5002 14.5003Z"
              fill="#707575"
            />
            <path d="M5.13433 14.5002H5.9014V12.7466H7.19447V12.1162H5.9014V11.1306H7.26022V10.5002H5.13433V14.5002Z" fill="#707575" />
            <path d="M7.87387 14.5002H8.64094V12.7466H9.93401V12.1162H8.64094V11.1306H9.99976V10.5002H7.87387V14.5002Z" fill="#707575" />
            <path d="M1.99976 14.5002H2.66689V12.7466H3.82612V14.5002H4.49325V10.5002H3.82612V12.1162H2.66689V10.5002H1.99976V14.5002Z" fill="#707575" />
          </svg>
        );
      case 'notch':
        return iconWrapper(
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path
              d="M14.499 3.50128C14.7751 3.50136 14.999 3.72519 14.999 4.00128C14.999 4.27737 14.7751 4.5012 14.499 4.50128C12.3599 4.50128 10.4827 5.92753 9.91016 7.98859L8.48145 13.1321C8.42068 13.3509 8.22016 13.5013 7.99316 13.4984C7.76641 13.4953 7.56981 13.3404 7.51465 13.1204L6.2959 8.24542C5.7458 6.04513 3.769 4.50128 1.50098 4.50128C1.22483 4.50128 1.00098 4.27742 1.00098 4.00128C1.00098 3.72514 1.22483 3.50128 1.50098 3.50128C4.22778 3.50128 6.60512 5.35692 7.2666 8.00226L8.02539 11.0384L8.94727 7.72101C9.64007 5.22718 11.9107 3.50128 14.499 3.50128Z"
              fill="#707575"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      className={className}
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'flex-start',
        gap: '4px',
        [theme.breakpoints.down('md')]: {
          gap: '2px'
        }
      })}
    >
      {renderIcon()}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          paddingTop: '1px'
        }}
      >
        <Typography
          component="span"
          sx={(theme) => ({
            color: '#2D2F2F',
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '16px',
            [theme.breakpoints.down('md')]: {
              fontSize: '11px'
            },
            [theme.breakpoints.down('sm')]: {
              fontSize: '10px'
            }
          })}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};
