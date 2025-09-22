import React, { useState } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { BookmarkCard } from '@/components/BookmarkCard';

interface Filter {
  type: 'lf' | 'hf' | 'notch';
  value: string;
}

interface Bookmark {
  id: string;
  title: string;
  reference: string;
  timeRange: string;
  content: string;
  filters: Filter[];
  userInitials: string;
  isDisabled?: boolean;
}

const Index = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bookmarks] = useState<Bookmark[]>([
    {
      id: '1',
      title: 'Neural Network Architecture Analysis',
      reference: 'Research Paper #001',
      timeRange: '2h ago',
      content: 'This research explores the effectiveness of transformer architectures in natural language processing tasks. The study compares various attention mechanisms and their impact on model performance across different datasets.',
      filters: [
        { type: 'lf', value: '125Hz' },
        { type: 'hf', value: '30Hz' },
        { type: 'notch', value: '50Hz' }
      ],
      userInitials: 'JD',
    },
    {
      id: '2',
      title: 'Machine Learning Model Optimization',
      reference: 'Study #042',
      timeRange: '5h ago',
      content: 'An in-depth analysis of hyperparameter tuning techniques for deep learning models. This study focuses on automated optimization methods and their effectiveness in reducing training time.',
      filters: [
        { type: 'lf', value: '100Hz' },
        { type: 'hf', value: '25Hz' }
      ],
      userInitials: 'AS',
      isDisabled: true,
    },
    {
      id: '3',
      title: 'Data Preprocessing Techniques',
      reference: 'Report #123',
      timeRange: '1d ago',
      content: 'Comprehensive review of data preprocessing methods for time-series analysis. Covers normalization, filtering, and feature extraction techniques commonly used in signal processing.',
      filters: [
        { type: 'notch', value: '60Hz' }
      ],
      userInitials: 'MK',
    },
  ]);

  const handleContentChange = (id: string, content: string) => {
    console.log('Content changed for bookmark', id, ':', content);
  };

  const handleMenuClick = (id: string) => {
    console.log('Menu clicked for bookmark', id);
  };

  const handleNoteClick = (id: string) => {
    console.log('Note clicked for bookmark', id);
  };

  const handleCardClick = (id: string, isDisabled?: boolean) => {
    if (isDisabled) return;
    
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const getBookmarkState = (bookmark: Bookmark): 'normal' | 'disabled' | 'selected' => {
    if (bookmark.isDisabled) return 'disabled';
    if (selectedIds.includes(bookmark.id)) return 'selected';
    return 'normal';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: '2rem',
            fontWeight: 600,
            mb: 1,
            color: 'text.primary',
          }}
        >
          Bookmarks
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          Recent Bookmarks
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {bookmarks.map((bookmark) => (
          <Grid key={bookmark.id} xs={12} md={6} xl={4}>
            <BookmarkCard
              title={bookmark.title}
              reference={bookmark.reference}
              timeRange={bookmark.timeRange}
              content={bookmark.content}
              filters={bookmark.filters}
              userInitials={bookmark.userInitials}
              isEditable={true}
              state={getBookmarkState(bookmark)}
              onContentChange={(content) => handleContentChange(bookmark.id, content)}
              onMenuClick={() => handleMenuClick(bookmark.id)}
              onNoteClick={() => handleNoteClick(bookmark.id)}
              onClick={() => handleCardClick(bookmark.id, bookmark.isDisabled)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Index;