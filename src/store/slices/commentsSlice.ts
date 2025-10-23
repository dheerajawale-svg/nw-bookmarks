import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '@/types/comments';

interface CommentsState {
  commentsByBookmark: {
    [bookmarkId: string]: Comment[];
  };
}

const initialState: CommentsState = {
  commentsByBookmark: {},
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (
      state,
      action: PayloadAction<{ bookmarkId: string | number; comment: Comment }>
    ) => {
      const { bookmarkId, comment } = action.payload;
      const key = String(bookmarkId);
      
      if (!state.commentsByBookmark[key]) {
        state.commentsByBookmark[key] = [];
      }
      
      state.commentsByBookmark[key].push(comment);
    },
    deleteComment: (
      state,
      action: PayloadAction<{ bookmarkId: string | number; commentId: string }>
    ) => {
      const { bookmarkId, commentId } = action.payload;
      const key = String(bookmarkId);
      
      if (state.commentsByBookmark[key]) {
        state.commentsByBookmark[key] = state.commentsByBookmark[key].filter(
          (comment) => comment.id !== commentId
        );
      }
    },
    updateComment: (
      state,
      action: PayloadAction<{
        bookmarkId: string | number;
        commentId: string;
        updates: Partial<Comment>;
      }>
    ) => {
      const { bookmarkId, commentId, updates } = action.payload;
      const key = String(bookmarkId);
      
      if (state.commentsByBookmark[key]) {
        const commentIndex = state.commentsByBookmark[key].findIndex(
          (comment) => comment.id === commentId
        );
        
        if (commentIndex !== -1) {
          state.commentsByBookmark[key][commentIndex] = {
            ...state.commentsByBookmark[key][commentIndex],
            ...updates,
          };
        }
      }
    },
  },
});

export const { addComment, deleteComment, updateComment } = commentsSlice.actions;

// Selectors
export const selectCommentsByBookmarkId = (
  state: { comments: CommentsState },
  bookmarkId: string | number
): Comment[] => {
  const key = String(bookmarkId);
  return state.comments.commentsByBookmark[key] || [];
};

export default commentsSlice.reducer;
