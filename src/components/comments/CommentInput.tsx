import React, { useState, useRef } from 'react';
import { Paper, TextField, Box, IconButton as MuiIconButton } from '@mui/material';
import { AtSign, Send } from 'lucide-react';
import { Avatar } from './CommentAvatar';
import { MentionDropdown } from './MentionDropdown';

type IconButtonVariant = 'default' | 'primary';

const styles = {
  form: {
    width: '100%',
    maxHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    position: 'relative',
    border: '3px solid rgba(0, 140, 154, 0.25)',
    borderRadius: '8px',
    padding: 0,
    boxShadow: 'none',
  },
  contentRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    padding: '8px',
  },
  textFieldWrapper: {
    flex: 1,
    position: 'relative',
  },
  textField: {
    fontSize: '14px',
    fontFamily: 'inherit',
    '& .MuiInputBase-input': {
      padding: 0,
      color: '#374151',
      '&::placeholder': {
        color: '#9ca3af',
        opacity: 1,
      },
    },
  },
  actionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    paddingTop: 0,
  },
} as const;

const ICON_BUTTON_BASE_SX = {
  padding: '4px',
} as const;

const ICON_BUTTON_VARIANTS: Record<IconButtonVariant, typeof ICON_BUTTON_BASE_SX & Record<string, unknown>> = {
  default: ICON_BUTTON_BASE_SX,
  primary: {
    ...ICON_BUTTON_BASE_SX,
    backgroundColor: '#00AAA7',
    border: '1px solid #00AAA7',
    borderRadius: '999px',
    boxShadow: '0 1px 2px 0 rgba(16, 24, 40, 0.05)',
    '&:hover': {
      backgroundColor: '#008C9A',
    },
  },
};

const getIconButtonSx = (variant: IconButtonVariant = 'default') => ICON_BUTTON_VARIANTS[variant];

interface User {
  id: string;
  name: string;
  username: string;
  initials: string;
}

interface CommentInputProps {
  currentUser: User;
  onSubmit: (comment: string, mentions: User[]) => void;
  className?: string;
  showMentionDropdown?: boolean;
  onMentionDropdownChange?: (show: boolean) => void;
}

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', username: 'johndoe', initials: 'JD' },
  { id: '2', name: 'Jane Smith', username: 'janesmith', initials: 'JS' },
  { id: '3', name: 'Bob Johnson', username: 'bobjohnson', initials: 'BJ' },
  { id: '4', name: 'Alice Brown', username: 'alicebrown', initials: 'AB' },
  { id: '5', name: 'Charlie Davis', username: 'charliedavis', initials: 'CD' },
];

export const CommentInput: React.FC<CommentInputProps> = ({ 
  currentUser, 
  onSubmit, 
  className = '',
  showMentionDropdown = false,
  onMentionDropdownChange
}) => {
  const [comment, setComment] = useState('');
  const [mentions, setMentions] = useState<User[]>([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const textFieldRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment, mentions);
      setComment('');
      setMentions([]);
    }
  };

  const handleMentionSelect = (user: User) => {
    const beforeCursor = comment.substring(0, cursorPosition);
    const afterCursor = comment.substring(cursorPosition);
    const lastAtIndex = beforeCursor.lastIndexOf('@');
    
    if (lastAtIndex !== -1) {
      const newComment = 
        beforeCursor.substring(0, lastAtIndex) + 
        `@${user.name} ` + 
        afterCursor;
      
      setComment(newComment);
      setMentions(prev => [...prev, user]);
    }
    
    onMentionDropdownChange?.(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const position = e.target.selectionStart || 0;
    
    setComment(value);
    setCursorPosition(position);
    
    const textBeforeCursor = value.substring(0, position);
    const shouldShow = textBeforeCursor.endsWith('@') || 
                      (textBeforeCursor.includes('@') && !textBeforeCursor.substring(textBeforeCursor.lastIndexOf('@')).includes(' '));
    
    onMentionDropdownChange?.(shouldShow);
  };

  const handleMentionClick = () => {
    onMentionDropdownChange?.(!showMentionDropdown);
  };

  return (
    <Paper
      className={className}
      component="form"
      onSubmit={handleSubmit}
      sx={styles.form}
    >
      <Box sx={styles.contentRow}>
        <Avatar initials={currentUser.initials} size="sm" />
        
        <Box ref={textFieldRef} sx={styles.textFieldWrapper}>
          <TextField
            multiline
            minRows={3}
            maxRows={6}
            value={comment}
            onChange={handleTextChange}
            placeholder="Write a comment..."
            variant="standard"
            fullWidth
            InputProps={{
              disableUnderline: true,
              sx: styles.textField,
            }}
          />
          
          <MentionDropdown
            users={mockUsers}
            onSelectUser={handleMentionSelect}
            isVisible={showMentionDropdown}
            anchorEl={textFieldRef.current}
          />
        </Box>
      </Box>
      
      <Box sx={styles.actionRow}>
        <MuiIconButton
          onClick={handleMentionClick}
          aria-label="Mention someone"
          sx={getIconButtonSx()}
        >
          <AtSign size={16} color="#6b7280" />
        </MuiIconButton>
        
        <MuiIconButton
          type="submit"
          aria-label="Submit comment"
          sx={getIconButtonSx('primary')}
        >
          <Send size={16} color="white" />
        </MuiIconButton>
      </Box>
    </Paper>
  );
};
