import React from 'react';
import { Popper, Paper, List, ListItem, ListItemButton, ListItemAvatar, ListItemText } from '@mui/material';
import { Avatar } from './CommentAvatar';

interface User {
  id: string;
  name: string;
  username: string;
  initials: string;
}

interface MentionDropdownProps {
  users: User[];
  onSelectUser: (user: User) => void;
  isVisible: boolean;
  anchorEl?: HTMLElement | null;
  className?: string;
}

export const MentionDropdown: React.FC<MentionDropdownProps> = ({
  users,
  onSelectUser,
  isVisible,
  anchorEl,
  className = ''
}) => {
  if (!isVisible) return null;

  return (
    <Popper
      open={isVisible}
      anchorEl={anchorEl}
      placement="bottom-start"
      className={className}
      sx={{ zIndex: 1300 }}
    >
      <Paper
        data-mention-dropdown
        elevation={3}
        sx={{
          maxHeight: '200px',
          overflow: 'auto',
          minWidth: '200px',
          border: '1px solid rgba(0, 140, 154, 0.25)',
          borderRadius: '8px',
        }}
      >
        <List dense>
          {users.map((user) => (
            <ListItem key={user.id} disablePadding>
              <ListItemButton
                onClick={() => onSelectUser(user)}
                sx={{
                  padding: '8px 12px',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 140, 154, 0.05)',
                  }
                }}
              >
                <ListItemAvatar sx={{ minWidth: '36px' }}>
                  <Avatar initials={user.initials} size="sm" />
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={`@${user.username}`}
                  primaryTypographyProps={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#1f2937'
                  }}
                  secondaryTypographyProps={{
                    fontSize: '12px',
                    color: '#6b7280'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Popper>
  );
};