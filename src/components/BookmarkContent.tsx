
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { Button } from '@/components/ui/button';

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

  const handleEdit = () => {
    if (isEditable) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    onContentChange?.(editContent);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent(content);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

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
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <TextField
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onKeyDown={handleKeyDown}
            multiline
            minRows={3}
            autoFocus
            aria-label="Edit bookmark content"
            variant="outlined"
            size="small"
            sx={{
              width: '100%',
              fontSize: '0.75rem',
              lineHeight: '1rem',
              color: '#5F6363',
              backgroundColor: 'transparent',
              fontWeight: 400,
            }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              onClick={handleSave}
              variant="default"
              size="sm"
              sx={{ borderRadius: '6px' }}
            >
              Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              size="sm"
              sx={{ borderRadius: '6px' }}
            >
              Cancel
            </Button>
          </Box>
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
