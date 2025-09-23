
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import { CommentSection } from './comments/CommentSection';

interface BookmarkContentProps {
  content: string;
  isEditable?: boolean;
  onContentChange?: (content: string) => void;
}

export const BookmarkContent: React.FC<BookmarkContentProps> = ({
  content,
  isEditable = false,
  onContentChange
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [isHovered, setIsHovered] = useState(false);
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
      if (
        editableAreaRef.current &&
        !editableAreaRef.current.contains(event.target as Node)
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
  }, [isEditing, handleCancel]);

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
          <CommentSection />
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
