import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';

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
  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (!isEditable) return;
    setIsEditing(true);
    setEditContent(content);
  };

  const handleSave = () => {
    onContentChange?.(editContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(content);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <Box sx={{ px: 2, pb: isEditing ? 1 : 2 }}>
      {isEditing ? (
        <Box>
          <TextField
            multiline
            fullWidth
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onKeyDown={handleKeyDown}
            inputRef={textFieldRef}
            variant="outlined"
            size="small"
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                fontSize: '0.875rem',
                lineHeight: 1.43,
                minHeight: 80,
                alignItems: 'flex-start',
                '& textarea': {
                  resize: 'vertical',
                },
              },
            }}
          />
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button
              variant="outlined"
              size="small"
              onClick={handleCancel}
              sx={{
                fontSize: '0.75rem',
                px: 2,
                py: 0.5,
                textTransform: 'none',
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleSave}
              sx={{
                fontSize: '0.75rem',
                px: 2,
                py: 0.5,
                textTransform: 'none',
              }}
            >
              Save
            </Button>
          </Stack>
        </Box>
      ) : (
        <Typography
          variant="body2"
          onClick={handleEdit}
          sx={{
            fontSize: '0.875rem',
            lineHeight: 1.43,
            color: 'text.primary',
            cursor: isEditable ? 'pointer' : 'default',
            '&:hover': isEditable ? {
              backgroundColor: 'action.hover',
              borderRadius: 1,
            } : {},
            p: isEditable ? 1 : 0,
            mx: isEditable ? -1 : 0,
            transition: 'background-color 0.2s ease',
          }}
        >
          {content}
        </Typography>
      )}
    </Box>
  );
};