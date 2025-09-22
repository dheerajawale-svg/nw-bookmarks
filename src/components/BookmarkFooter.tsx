import React, { useState } from 'react';
import { Box, Chip, IconButton } from '@mui/material';
import { StickyNote2Outlined } from '@mui/icons-material';
import { Avatar } from './Avatar';
import { FilterIcon } from './FilterIcon';

interface Filter {
  type: 'lf' | 'hf' | 'notch';
  value: string;
}

interface BookmarkFooterProps {
  filters: Filter[];
  userInitials: string;
  onNoteClick?: () => void;
}

export const BookmarkFooter: React.FC<BookmarkFooterProps> = ({
  filters,
  userInitials,
  onNoteClick
}) => {
  const [showNote, setShowNote] = useState(false);

  const handleNoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowNote(!showNote);
    onNoteClick?.();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2,
        pb: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
        {filters.map((filter, index) => (
          <Chip
            key={index}
            icon={<FilterIcon type={filter.type} />}
            label={filter.value}
            size="small"
            variant="outlined"
            sx={{
              height: 24,
              fontSize: '0.75rem',
              '& .MuiChip-icon': {
                fontSize: 12,
                ml: 0.5,
              },
              '& .MuiChip-label': {
                px: 0.5,
              },
            }}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {onNoteClick && (
          <IconButton
            onClick={handleNoteClick}
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <StickyNote2Outlined sx={{ fontSize: 16 }} />
          </IconButton>
        )}
        <Avatar initials={userInitials} />
      </Box>
    </Box>
  );
};