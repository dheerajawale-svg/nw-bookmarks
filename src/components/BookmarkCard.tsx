import React, { useState } from 'react';
import { Card, CardContent, Box } from '@mui/material';
import { BookmarkHeader } from './BookmarkHeader';
import { BookmarkContent } from './BookmarkContent';
import { BookmarkFooter } from './BookmarkFooter';

interface Filter {
  type: 'lf' | 'hf' | 'notch';
  value: string;
}

interface BookmarkCardProps {
  title: string;
  reference: string;
  timeRange: string;
  content: string;
  filters: Filter[];
  userInitials: string;
  isEditable?: boolean;
  state?: 'normal' | 'disabled' | 'selected';
  className?: string;
  onContentChange?: (content: string) => void;
  onMenuClick?: () => void;
  onNoteClick?: () => void;
  onClick?: () => void;
}

export const BookmarkCard: React.FC<BookmarkCardProps> = ({
  title,
  reference,
  timeRange,
  content,
  filters,
  userInitials,
  isEditable = false,
  state = 'normal',
  className = '',
  onContentChange,
  onMenuClick,
  onNoteClick,
  onClick
}) => {
  const [cardContent, setCardContent] = useState(content);

  const handleContentChange = (newContent: string) => {
    setCardContent(newContent);
    onContentChange?.(newContent);
  };

  const isInteractive = state !== 'disabled';

  const handleCardClick = () => {
    if (isInteractive && onClick) {
      onClick();
    }
  };

  return (
    <Card
      className={`card-state-${state} ${className}`}
      onClick={handleCardClick}
      sx={{
        width: 556,
        minWidth: 336,
        minHeight: 128,
        cursor: onClick && isInteractive ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        '&:hover': onClick && isInteractive ? {
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
        } : {},
        '@media (max-width: 768px)': {
          width: '100%',
          maxWidth: 556,
          minWidth: 300,
        },
        '@media (max-width: 640px)': {
          minWidth: 280,
        },
      }}
      role="article"
      aria-label={`Bookmark: ${title}`}
      aria-disabled={!isInteractive}
    >
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <BookmarkHeader
            title={title}
            reference={reference}
            timeRange={timeRange}
            onMenuClick={isInteractive ? onMenuClick : undefined}
          />
          <BookmarkContent
            content={cardContent}
            isEditable={isEditable && isInteractive}
            onContentChange={handleContentChange}
          />
          <BookmarkFooter
            filters={filters}
            userInitials={userInitials}
            onNoteClick={isInteractive ? onNoteClick : undefined}
          />
        </Box>
      </CardContent>
    </Card>
  );
};