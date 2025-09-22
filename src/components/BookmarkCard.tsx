import React, { useState } from 'react';
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

  const getCardStyles = () => {
    const baseStyles = "flex w-[556px] min-w-[336px] max-h-[700px] flex-col items-start border h-32 rounded-lg border-solid max-md:w-full max-md:max-w-[556px] max-md:min-w-[300px] max-sm:min-w-[280px] max-sm:p-2";
    
    switch (state) {
      case 'disabled':
        return `${baseStyles} bg-card-state-disabled border-card-state-disabled-border cursor-not-allowed`;
      case 'selected':
        return `${baseStyles} bg-card-state-selected border-card-state-selected-border relative overflow-hidden before:absolute before:inset-0 before:bg-card-state-selected-overlay before:pointer-events-none cursor-pointer`;
      default:
        return `${baseStyles} bg-card-state-normal border-card-state-normal-border ${onClick ? 'cursor-pointer hover:shadow-sm transition-shadow' : ''}`;
    }
  };

  const isInteractive = state !== 'disabled';

  const handleCardClick = () => {
    if (isInteractive && onClick) {
      onClick();
    }
  };

  return (
    <article
      className={`${getCardStyles()} ${className}`}
      role="article"
      aria-label={`Bookmark: ${title}`}
      onClick={handleCardClick}
      aria-disabled={!isInteractive}
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
      />
      <BookmarkFooter
        filters={filters}
        userInitials={userInitials}
        onNoteClick={isInteractive ? onNoteClick : undefined}
      />
    </article>
  );
};
