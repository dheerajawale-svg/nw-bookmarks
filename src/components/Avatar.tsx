import React from 'react';

interface AvatarProps {
  initials: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ initials, className = '' }) => {
  return (
    <div
      className={`flex w-6 h-6 flex-col justify-center items-center bg-[rgba(0,140,154,0.10)] rounded-[200px] ${className}`}
      role="img"
      aria-label={`Avatar for ${initials}`}
    >
      <span className="text-[#008C9A] text-center text-[11px] font-normal leading-[14px]">
        {initials}
      </span>
    </div>
  );
};
