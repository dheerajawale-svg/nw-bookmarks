
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import { CommentSection } from './comments/CommentSection';

interface BookmarkContentProps {
  bookmarkId: string | number;
  content: string;
  isEditable?: boolean;
  onContentChange?: (content: string) => void;
  cardRef?: React.RefObject<HTMLElement>;
}

export const BookmarkContent: React.FC<BookmarkContentProps> = ({
  bookmarkId,
  content,
  isEditable = false,
  onContentChange,
  cardRef
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [isHovered, setIsHovered] = useState(false);
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);
  const editableAreaRef = useRef<HTMLDivElement | null>(null);

  const handleEdit = () => {
    if (isEditable) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    onContentChange?.(editContent);
  };

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setEditContent(content);
  }, [content]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      
      // Don't close if mention dropdown is open and click is within the dropdown
      if (showMentionDropdown) {
        const mentionDropdown = document.querySelector('[data-mention-dropdown]');
        if (mentionDropdown && mentionDropdown.contains(target)) {
          return;
        }
      }
      
      // Close if click is outside the entire bookmark card
      if (cardRef?.current && !cardRef.current.contains(target)) {
        handleCancel();
        return;
      }
      
      // Close if click is outside the editable area (but within the card) and dropdown is not open
      if (
        editableAreaRef.current &&
        !editableAreaRef.current.contains(target) &&
        !showMentionDropdown
      ) {
        handleCancel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isEditing, handleCancel, showMentionDropdown, cardRef]);

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 1,
        alignSelf: 'stretch',
        pt: 0.5,
        pb: 0.5,
        px: 1.5,
        flexGrow: 1,
      }}
    >
      {isEditing ? (
        <Box ref={editableAreaRef} sx={{ width: '100%' }}>
          {/* Display description at the top */}
          <Box sx={{ 
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            borderLeft: '3px solid #008C9A'
          }}>
            <Typography
              variant="caption"
              sx={{
                color: '#6b7280',
                fontSize: '10px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '4px',
                display: 'block'
              }}
            >
              Description
            </Typography>
            <Typography
              sx={{
                color: '#374151',
                fontSize: '0.75rem',
                lineHeight: '1rem',
                fontWeight: 400,
              }}
            >
              {content}
            </Typography>
          </Box>
          
          {/* Comment section below */}
          <CommentSection 
            bookmarkId={bookmarkId}
            showMentionDropdown={showMentionDropdown}
            onMentionDropdownChange={setShowMentionDropdown}
          />
        </Box>
      ) : (
        <Typography
          sx={{
            alignSelf: 'stretch',
            color: '#5F6363',
            fontSize: '0.75rem',
            lineHeight: '1rem',
            fontWeight: 400,
            m: 0,
            cursor: isEditable ? 'pointer' : 'default',
            p: isEditable ? '4px' : 0,
            borderRadius: isEditable ? '4px' : 0,
            backgroundColor: isEditable && isHovered ? '#f9fafb' : 'transparent',
            transition: 'background-color 150ms ease',
          }}
          onClick={handleEdit}
          role={isEditable ? 'button' : undefined}
          tabIndex={isEditable ? 0 : undefined}
          onKeyDown={isEditable ? (e) => e.key === 'Enter' && handleEdit() : undefined}
          aria-label={isEditable ? 'Click to edit content' : undefined}
          onMouseEnter={isEditable ? () => setIsHovered(true) : undefined}
          onMouseLeave={isEditable ? () => setIsHovered(false) : undefined}
        >
          {content}
        </Typography>
      )}      
    </Box>
  );
};
