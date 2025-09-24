import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
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
  const cardRef = useRef<HTMLElement>(null);

  const handleContentChange = (newContent: string) => {
    setCardContent(newContent);
    onContentChange?.(newContent);
  };

  const getCardStyles = () => {
    const baseStyles = {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'flex-start' as const,
      alignSelf: 'stretch' as const,
      borderRadius: '12px',
      border: '1px solid #EAEBEB',
      backgroundColor: '#FFFFFF',
      cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
      width: '480px',
      minWidth: '300px',
      minHeight: '100px',
      '@media (max-width: 768px)': {
        width: '100%',
        maxWidth: '480px',
        minWidth: '300px',
      },
      '@media (max-width: 640px)': {
        minWidth: '280px',
      },
    };

    switch (state) {
      case 'selected':
        return {
          ...baseStyles,
          border: '2px solid #008C9A',
          boxShadow: '0 0 0 1px rgba(0, 140, 154, 0.1)',
        };
      case 'disabled':
        return {
          ...baseStyles,
          backgroundColor: '#F8F9FA',
          opacity: 0.6,
        };
      default:
        return {
          ...baseStyles,
          '&:hover': onClick ? {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          } : {},
        };
    }
  };

  const isInteractive = state !== 'disabled';

  const handleCardClick = () => {
    if (isInteractive && onClick) {
      onClick();
    }
  };

  return (
    <Box
      ref={cardRef}
      component="article"
      sx={getCardStyles()}
      onClick={handleCardClick}
      role="button"
      tabIndex={state === 'disabled' ? -1 : 0}
      aria-disabled={state === 'disabled'}
      aria-label={`Bookmark: ${title}`}
      className={className}
    >
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
        cardRef={cardRef}
      />
      <BookmarkFooter
        filters={filters}
        userInitials={userInitials}
        onNoteClick={isInteractive ? onNoteClick : undefined}
      />
    </Box>
  );
};
