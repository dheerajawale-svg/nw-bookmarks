import React, { useState } from 'react';
import { FilterIcon } from './FilterIcon';
import { Avatar } from './Avatar';

interface Filter {
  type: 'lf' | 'hf' | 'notch';
  value: string;
}

interface BookmarkFooterProps {
  filters: Filter[];
  userInitials: string;
  onNoteClick?: () => void;
}

export const BookmarkFooter: React.FC<BookmarkFooterProps> = ({
  filters,
  userInitials,
  onNoteClick
}) => {
  const [showNote, setShowNote] = useState(false);

  const handleNoteClick = () => {
    setShowNote(!showNote);
    onNoteClick?.();
  };

  return (
    <footer className="flex items-center gap-1 self-stretch pl-3 pr-2 py-2 max-sm:p-2">
      <div className="flex items-center gap-4 flex-[1_0_0] max-md:gap-3 max-sm:gap-2 max-sm:flex-wrap">
        {filters.map((filter, index) => (
          <FilterIcon
            key={index}
            type={filter.type}
            value={filter.value}
            className="flex-shrink-0"
          />
        ))}
      </div>
      <div className="flex w-6 h-6 items-center gap-2">
        <button
          className="flex flex-col items-start gap-2.5 rounded p-1 hover:bg-gray-100 transition-colors"
          onClick={handleNoteClick}
          aria-label="Add note"
          aria-pressed={showNote}
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
              d="M12.502 1L12.502 0.5H12.502V1ZM15.002 10.001L15.502 10.001V10.001H15.002ZM12.502 12.501V13.001H12.502L12.502 12.501ZM8.51074 12.501V12.001H8.32466L8.18385 12.1226L8.51074 12.501ZM5.9043 14.7529L6.23114 15.1313L6.23118 15.1313L5.9043 14.7529ZM4.25 12.501H4.75V12.001H4.25V12.501ZM3.5 12.501L3.5 13.001H3.5V12.501ZM1.0127 10.2559L0.513314 10.2807L0.513952 10.2935L0.515245 10.3063L1.0127 10.2559ZM1 10.001H0.5V10.0134L0.500619 10.0259L1 10.001ZM12.502 1L12.5019 1.5C13.6064 1.50013 14.502 2.39559 14.502 3.5H15.002H15.502C15.502 1.84319 14.1586 0.500192 12.502 0.5L12.502 1ZM15.002 3.5H14.502V10.001H15.002H15.502V3.5H15.002ZM15.002 10.001L14.502 10.0009C14.5018 11.1053 13.6063 12.0008 12.5019 12.001L12.502 12.501L12.502 13.001C14.1586 13.0008 15.5017 11.6576 15.502 10.001L15.002 10.001ZM12.502 12.501V12.001H8.51074V12.501V13.001H12.502V12.501ZM8.51074 12.501L8.18385 12.1226L5.57741 14.3746L5.9043 14.7529L6.23118 15.1313L8.83763 12.8793L8.51074 12.501ZM5.9043 14.7529L5.57746 14.3745C5.25334 14.6545 4.75 14.424 4.75 13.9961H4.25H3.75C3.75 15.2811 5.2599 15.9703 6.23114 15.1313L5.9043 14.7529ZM4.25 13.9961H4.75V12.501H4.25H3.75V13.9961H4.25ZM4.25 12.501V12.001H3.5V12.501V13.001H4.25V12.501ZM3.5 12.501L3.5 12.001C2.4647 12.001 1.61236 11.2136 1.51015 10.2054L1.0127 10.2559L0.515245 10.3063C0.668688 11.8198 1.94618 13.001 3.5 13.001L3.5 12.501ZM1.0127 10.2559L1.51208 10.231L1.49938 9.9761L1 10.001L0.500619 10.0259L0.513314 10.2807L1.0127 10.2559ZM1 10.001H1.5V3.5H1H0.5V10.001H1ZM1 3.5H1.5C1.5 2.39543 2.39543 1.5 3.5 1.5V1V0.5C1.84315 0.5 0.5 1.84314 0.5 3.5H1ZM3.5 1V1.5H12.502V1V0.5H3.5V1Z"
              fill="#5F6363"
              strokeWidth="1"
              stroke="#5F6363"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <Avatar initials={userInitials} />
      </div>
    </footer>
  );
};
