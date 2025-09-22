import React, { useState } from 'react';

interface BookmarkHeaderProps {
  title: string;
  reference: string;
  timeRange: string;
  onMenuClick?: () => void;
}

export const BookmarkHeader: React.FC<BookmarkHeaderProps> = ({
  title,
  reference,
  timeRange,
  onMenuClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuClick?.();
  };

  return (
    <header className="flex items-center gap-3 self-stretch pl-3 pr-2 py-1 max-sm:px-2 max-sm:py-1">
      <div className="flex items-center gap-2 flex-[1_0_0] pt-0.5">
        <h2 className="text-[#2D2F2F] text-xs font-normal leading-[15.6px]">
          {title}
        </h2>
        <span className="text-[#929696] text-xs font-normal leading-4">
          {reference}
        </span>
      </div>
      <time className="text-[#2D2F2F] text-xs font-normal leading-4">
        {timeRange}
      </time>
      <div className="flex items-center gap-1">
        <div className="w-0.5 h-6 bg-[#EAEBEB]" role="separator" aria-orientation="vertical" />
        <button
          className="flex justify-center items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={handleMenuClick}
          aria-label="More options"
          aria-expanded={isMenuOpen}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
          >
            <path
              d="M11.2001 7.6C11.2001 8.26274 11.7374 8.8 12.4001 8.8C13.0628 8.8 13.6001 8.26274 13.6001 7.6C13.6001 6.93726 13.0628 6.4 12.4001 6.4C11.7374 6.4 11.2001 6.93726 11.2001 7.6Z"
              fill="#707575"
            />
            <path
              d="M7.2001 7.6C7.2001 8.26274 7.73736 8.8 8.4001 8.8C9.06284 8.8 9.6001 8.26274 9.6001 7.6C9.6001 6.93726 9.06284 6.4 8.4001 6.4C7.73736 6.4 7.2001 6.93726 7.2001 7.6Z"
              fill="#707575"
            />
            <path
              d="M3.2001 7.6C3.2001 8.26274 3.73736 8.8 4.4001 8.8C5.06284 8.8 5.6001 8.26274 5.6001 7.6C5.6001 6.93726 5.06284 6.4 4.4001 6.4C3.73736 6.4 3.2001 6.93726 3.2001 7.6Z"
              fill="#707575"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};
