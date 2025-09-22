import React, { useState } from 'react';

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
    <section className="flex flex-col items-start gap-2 self-stretch pt-1 pb-3 px-3 border-b-[#EAEBEB] border-b border-solid max-sm:pt-1 max-sm:pb-2 max-sm:px-2">
      {isEditing ? (
        <div className="w-full">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full text-[#5F6363] text-xs font-normal leading-4 max-sm:text-[11px] max-sm:leading-[14px] bg-transparent border border-gray-300 rounded p-2 resize-none"
            rows={3}
            autoFocus
            aria-label="Edit bookmark content"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p
          className={`self-stretch text-[#5F6363] text-xs font-normal leading-4 max-sm:text-[11px] max-sm:leading-[14px] ${
            isEditable ? 'cursor-pointer hover:bg-gray-50 p-1 rounded' : ''
          }`}
          onClick={handleEdit}
          role={isEditable ? 'button' : undefined}
          tabIndex={isEditable ? 0 : undefined}
          onKeyDown={isEditable ? (e) => e.key === 'Enter' && handleEdit() : undefined}
          aria-label={isEditable ? 'Click to edit content' : undefined}
        >
          {content}
        </p>
      )}
    </section>
  );
};
