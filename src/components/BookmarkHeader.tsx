
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

interface BookmarkHeaderProps {
  title: string;
  reference: string;
  timeRange: string;
  onMenuClick?: () => void;
}

export const BookmarkHeader: React.FC<BookmarkHeaderProps> = ({
  title,
  reference,
  timeRange,
  onMenuClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuClick?.();
  };

  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        alignSelf: 'stretch',
        pl: 3,
        pr: 2,
        py: 1,
        '@media (max-width: 640px)': {
          px: 2,
          py: 1,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: '1 0 0', pt: 0.5 }}>
        <Typography
          component="h2"
          variant="bookmarkTitle"
        >
          {title}
        </Typography>
        <Typography
          component="span"
          variant="bookmarkReference"
        >
          {reference}
        </Typography>
      </Box>
      <Typography
        component="time"
        variant="bookmarkTime"
      >
        {timeRange}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Divider orientation="vertical" flexItem sx={{ height: 24, borderColor: '#EAEBEB', mx: 0.5 }} />
        <IconButton
          onClick={handleMenuClick}
          aria-label="More options"
          aria-expanded={isMenuOpen}
          size="small"
          sx={{
            p: 1,
            borderRadius: 2,
            transition: 'background-color 150ms',
            '&:hover': { backgroundColor: 'grey.100' },
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: 16, height: 16 }}
          >
            <circle cx="12.4" cy="7.6" r="1.2" fill="#707575" />
            <circle cx="8.4" cy="7.6" r="1.2" fill="#707575" />
            <circle cx="4.4" cy="7.6" r="1.2" fill="#707575" />
          </svg>
        </IconButton>
      </Box>
    </Box>
  );
};
