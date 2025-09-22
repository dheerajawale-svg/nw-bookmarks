import React, { useState } from 'react';
import { BookmarkCard } from '@/components/BookmarkCard';

const Index = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([2]);
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      title: 'Bookmark1',
      reference: 'F3-REF - C4-REF',
      timeRange: '01:02:08 - 01:44:12',
      content: 'Marked for follow-up. This portion of the study requires confirmation of annotation accuracy and may need to be cross-checked with other physiological signals.',
      filters: [
        { type: 'lf' as const, value: '3 Hz' },
        { type: 'hf' as const, value: '15 Hz' },
        { type: 'notch' as const, value: '50 Hz' }
      ],
      userInitials: 'JD',
      state: 'normal' as const
    },
    {
      id: 2,
      title: 'Bookmark2',
      reference: 'F4-REF - C3-REF',
      timeRange: '02:15:30 - 02:45:22',
      content: 'Significant artifact detected during this segment. Recommend manual review of electrode placement and signal quality before final analysis.',
      filters: [
        { type: 'lf' as const, value: '1 Hz' },
        { type: 'hf' as const, value: '30 Hz' },
        { type: 'notch' as const, value: '60 Hz' }
      ],
      userInitials: 'AM',
      state: 'selected' as const
    },
    {
      id: 3,
      title: 'Bookmark3',
      reference: 'O1-REF - O2-REF',
      timeRange: '00:45:12 - 01:12:08',
      content: 'Normal alpha rhythm observed in occipital regions. Patient was in relaxed, eyes-closed state. Good signal quality throughout this segment.',
      filters: [
        { type: 'lf' as const, value: '0.5 Hz' },
        { type: 'hf' as const, value: '35 Hz' },
        { type: 'notch' as const, value: '50 Hz' }
      ],
      userInitials: 'RK',
      state: 'normal' as const
    },
    {
      id: 4,
      title: 'Bookmark4',
      reference: 'T3-REF - T4-REF',
      timeRange: '03:22:45 - 03:58:12',
      content: 'This segment is currently under review for data integrity issues. Access temporarily restricted pending validation.',
      filters: [
        { type: 'lf' as const, value: '2 Hz' },
        { type: 'hf' as const, value: '25 Hz' },
        { type: 'notch' as const, value: '60 Hz' }
      ],
      userInitials: 'SM',
      state: 'disabled' as const
    },
    {
      id: 5,
      title: 'Bookmark5',
      reference: 'Fp1-REF - Fp2-REF',
      timeRange: '04:10:33 - 04:42:18',
      content: 'Excellent frontal lobe activity captured during cognitive testing phase. Clear P300 response patterns visible.',
      filters: [
        { type: 'lf' as const, value: '0.1 Hz' },
        { type: 'hf' as const, value: '40 Hz' },
        { type: 'notch' as const, value: '50 Hz' }
      ],
      userInitials: 'LP',
      state: 'normal' as const
    },
    {
      id: 6,
      title: 'Bookmark6',
      reference: 'C3-REF - Cz-REF',
      timeRange: '05:15:20 - 05:48:55',
      content: 'Equipment malfunction detected during this recording period. Data may be corrupted or incomplete.',
      filters: [
        { type: 'lf' as const, value: '1.5 Hz' },
        { type: 'hf' as const, value: '20 Hz' },
        { type: 'notch' as const, value: '50 Hz' }
      ],
      userInitials: 'KR',
      state: 'disabled' as const
    },
    {
      id: 7,
      title: 'Bookmark7',
      reference: 'Pz-REF - P4-REF',
      timeRange: '06:05:12 - 06:38:44',
      content: 'Exceptional parietal activity during spatial reasoning tasks. Strong gamma band synchronization observed.',
      filters: [
        { type: 'lf' as const, value: '4 Hz' },
        { type: 'hf' as const, value: '80 Hz' },
        { type: 'notch' as const, value: '60 Hz' }
      ],
      userInitials: 'MT',
      state: 'selected' as const
    }
  ]);

  const handleContentChange = (id: number, newContent: string) => {
    setBookmarks(prev => prev.map(bookmark => 
      bookmark.id === id ? { ...bookmark, content: newContent } : bookmark
    ));
  };

  const handleMenuClick = (id: number) => {
    console.log(`Menu clicked for bookmark ${id}`);
  };

  const handleNoteClick = (id: number) => {
    console.log(`Note clicked for bookmark ${id}`);
  };

  const handleCardClick = (id: number) => {
    const bookmark = bookmarks.find(b => b.id === id);
    if (bookmark?.state === 'disabled') return;
    
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const getBookmarkState = (bookmark: any): 'normal' | 'disabled' | 'selected' => {
    if (bookmark.state === 'disabled') return 'disabled';
    return selectedIds.includes(bookmark.id) ? 'selected' : 'normal';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Medical Annotation System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage and review medical study annotations with advanced filtering and collaborative features.
          </p>
        </header>

        <main>
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Bookmarks
            </h2>
            <div className="space-y-4">
              {bookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.id}
                  title={bookmark.title}
                  reference={bookmark.reference}
                  timeRange={bookmark.timeRange}
                  content={bookmark.content}
                  filters={bookmark.filters}
                  userInitials={bookmark.userInitials}
                  isEditable={bookmark.state !== 'disabled'}
                  state={getBookmarkState(bookmark)}
                  onContentChange={(newContent) => handleContentChange(bookmark.id, newContent)}
                  onMenuClick={() => handleMenuClick(bookmark.id)}
                  onNoteClick={() => handleNoteClick(bookmark.id)}
                  onClick={() => handleCardClick(bookmark.id)}
                />
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default Index;
