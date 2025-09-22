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
    <Box sx={{ px: 2, py: 1.5 }}>
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
                fontSize: '14px',
                lineHeight: '20px',
                minHeight: 80,
                alignItems: 'flex-start',
                fontFamily: 'inherit',
                '& textarea': {
                  resize: 'vertical',
                  padding: '8px 12px',
                },
                '& fieldset': {
                  borderColor: 'divider',
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
                fontSize: '12px',
                px: 2,
                py: 0.5,
                textTransform: 'none',
                minHeight: 32,
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleSave}
              sx={{
                fontSize: '12px',
                px: 2,
                py: 0.5,
                textTransform: 'none',
                minHeight: 32,
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
            fontSize: '14px',
            lineHeight: '20px',
            color: 'text.primary',
            cursor: isEditable ? 'pointer' : 'default',
            fontFamily: 'inherit',
            '&:hover': isEditable ? {
              backgroundColor: 'action.hover',
              borderRadius: '4px',
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