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
        px: 2,
        pt: 2,
        pb: 1.5,
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0, pr: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '20px',
            mb: 0.5,
            wordBreak: 'break-word',
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 0.5,
        }}>
          <Typography
            variant="body2"
            sx={{
              fontSize: '12px',
              color: 'text.secondary',
              lineHeight: '14px',
            }}
          >
            {reference}
          </Typography>
          <Box
            sx={{
              width: 2,
              height: 2,
              backgroundColor: 'text.secondary',
              borderRadius: '50%',
              flexShrink: 0,
              mx: 0.5,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontSize: '12px',
              color: 'text.secondary',
              lineHeight: '14px',
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
            flexShrink: 0,
            color: 'text.secondary',
            p: 0.5,
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