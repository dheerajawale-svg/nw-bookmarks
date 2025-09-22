import React, { useState } from 'react';
import { BookmarkCard } from '@/components/BookmarkCard';

const Index = () => {
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      title: 'Bookmark2',
      reference: 'F3-REF - C4-REF',
      timeRange: '01:02:08 - 01:44:12',
      content: 'Marked for follow-up. This portion of the study requires confirmation of annotation accuracy and may need to be cross-checked with other physiological signals.',
      filters: [
        { type: 'lf' as const, value: '3 Hz' },
        { type: 'hf' as const, value: '15 Hz' },
        { type: 'notch' as const, value: '50 Hz' }
      ],
      userInitials: 'JD'
    },
    {
      id: 2,
      title: 'Bookmark3',
      reference: 'F4-REF - C3-REF',
      timeRange: '02:15:30 - 02:45:22',
      content: 'Significant artifact detected during this segment. Recommend manual review of electrode placement and signal quality before final analysis.',
      filters: [
        { type: 'lf' as const, value: '1 Hz' },
        { type: 'hf' as const, value: '30 Hz' },
        { type: 'notch' as const, value: '60 Hz' }
      ],
      userInitials: 'AM'
    },
    {
      id: 3,
      title: 'Bookmark1',
      reference: 'O1-REF - O2-REF',
      timeRange: '00:45:12 - 01:12:08',
      content: 'Normal alpha rhythm observed in occipital regions. Patient was in relaxed, eyes-closed state. Good signal quality throughout this segment.',
      filters: [
        { type: 'lf' as const, value: '0.5 Hz' },
        { type: 'hf' as const, value: '35 Hz' },
        { type: 'notch' as const, value: '50 Hz' }
      ],
      userInitials: 'RK'
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
                  isEditable={true}
                  className="mx-auto"
                  onContentChange={(newContent) => handleContentChange(bookmark.id, newContent)}
                  onMenuClick={() => handleMenuClick(bookmark.id)}
                  onNoteClick={() => handleNoteClick(bookmark.id)}
                />
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg p-6 shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <h3 className="font-medium text-gray-900 mb-2">Create New Bookmark</h3>
                <p className="text-sm text-gray-600">Add a new annotation to the current study</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <h3 className="font-medium text-gray-900 mb-2">Filter Settings</h3>
                <p className="text-sm text-gray-600">Adjust frequency filters and display options</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <h3 className="font-medium text-gray-900 mb-2">Export Data</h3>
                <p className="text-sm text-gray-600">Export annotations and analysis results</p>
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
