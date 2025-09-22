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
  className?: string;
  onContentChange?: (content: string) => void;
  onMenuClick?: () => void;
  onNoteClick?: () => void;
}

export const BookmarkCard: React.FC<BookmarkCardProps> = ({
  title,
  reference,
  timeRange,
  content,
  filters,
  userInitials,
  isEditable = false,
  className = '',
  onContentChange,
  onMenuClick,
  onNoteClick
}) => {
  const [cardContent, setCardContent] = useState(content);

  const handleContentChange = (newContent: string) => {
    setCardContent(newContent);
    onContentChange?.(newContent);
  };

  return (
    <article
      className={`flex w-[556px] min-w-[336px] max-h-[700px] flex-col items-start border h-32 bg-[#F4F5F5] rounded-lg border-solid border-[#EAEBEB] max-md:w-full max-md:max-w-[556px] max-md:min-w-[300px] max-sm:min-w-[280px] max-sm:p-2 ${className}`}
      role="article"
      aria-label={`Bookmark: ${title}`}
    >
      <BookmarkHeader
        title={title}
        reference={reference}
        timeRange={timeRange}
        onMenuClick={onMenuClick}
      />
      <BookmarkContent
        content={cardContent}
        isEditable={isEditable}
        onContentChange={handleContentChange}
      />
      <BookmarkFooter
        filters={filters}
        userInitials={userInitials}
        onNoteClick={onNoteClick}
      />
    </article>
  );
};
