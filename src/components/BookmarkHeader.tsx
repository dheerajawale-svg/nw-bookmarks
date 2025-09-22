import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';

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

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
    onMenuClick?.();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        p: 2,
        pb: 1,
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.25,
            mb: 0.5,
            wordBreak: 'break-word',
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.75rem',
              color: 'text.secondary',
              lineHeight: 1.17,
            }}
          >
            {reference}
          </Typography>
          <Box
            sx={{
              width: 1,
              height: 1,
              backgroundColor: 'text.secondary',
              borderRadius: '50%',
              flexShrink: 0,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.75rem',
              color: 'text.secondary',
              lineHeight: 1.17,
            }}
          >
            {timeRange}
          </Typography>
        </Box>
      </Box>
      {onMenuClick && (
        <IconButton
          onClick={handleMenuClick}
          size="small"
          sx={{
            ml: 1,
            flexShrink: 0,
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <MoreHoriz sx={{ fontSize: 20 }} />
        </IconButton>
      )}
    </Box>
  );
};