import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { CommentInput } from "./CommentInput";
import { Avatar } from "./CommentAvatar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addComment, selectCommentsByBookmarkId } from "@/store/slices/commentsSlice";
import { User } from "@/types/comments";

interface CommentSectionProps {
  bookmarkId: string | number;
  className?: string;
  showMentionDropdown?: boolean;
  onMentionDropdownChange?: (show: boolean) => void;
}

const currentUser: User = {
  id: "current",
  name: "Current User",
  username: "currentuser",
  initials: "CU",
};

export const CommentSection: React.FC<CommentSectionProps> = ({ 
  bookmarkId,
  className = "",
  showMentionDropdown = false,
  onMentionDropdownChange
}) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => 
    selectCommentsByBookmarkId(state, bookmarkId)
  );

  const handleSubmitComment = (text: string, mentions: User[]) => {
    dispatch(addComment({
      bookmarkId,
      comment: {
        id: Date.now().toString(),
        text,
        author: currentUser,
        mentions,
        timestamp: new Date().toISOString(),
      }
    }));
  };

  return (
    <Box className={className} sx={{ width: "100%", margin: "0 auto", padding: "16px" }}>

      <Box sx={{ marginBottom: "24px" }}>
        {comments.length === 0 ? (
          <Typography
            variant="body1"
            sx={{
              color: "#6b7280",
              fontStyle: "italic",
              textAlign: "center",
              padding: "20px",
            }}
          >
            No comments yet. Be the first to comment!
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {comments.map((comment) => (
              <Box key={comment.id}>
                <Box sx={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <Avatar initials={comment.author.initials} size="sm" />
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#1f2937" }}>
                        {comment.author.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#6b7280", fontSize: "12px" }}>
                        @{comment.author.username}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#9ca3af", fontSize: "12px" }}>
                        {new Date(comment.timestamp).toLocaleTimeString()}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: "#374151", lineHeight: 1.5 }}>
                      {comment.text}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ marginTop: "12px", opacity: 0.1 }} />
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <CommentInput 
        currentUser={currentUser} 
        onSubmit={handleSubmitComment}
        showMentionDropdown={showMentionDropdown}
        onMentionDropdownChange={onMentionDropdownChange}
      />
    </Box>
  );
};
