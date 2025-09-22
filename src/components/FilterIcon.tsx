import React from 'react';

interface FilterIconProps {
  type: 'lf' | 'hf' | 'notch';
  value: string;
  className?: string;
}

export const FilterIcon: React.FC<FilterIconProps> = ({ type, value, className = '' }) => {
  const renderIcon = () => {
    switch (type) {
      case 'lf':
        return (
          <div className="w-4 h-4 relative">
            <svg
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 absolute left-0.5 top-0.5"
              style={{ transform: 'rotate(90deg)' }}
            >
              <path
                d="M12.0002 0.999725C12.0002 1.27586 11.7764 1.49972 11.5002 1.49973L5.49927 1.49973C3.01422 1.49997 0.999332 3.51465 0.999267 5.99972L0.999267 12.0007C0.999026 12.2766 0.77526 12.5007 0.499267 12.5007C0.223479 12.5005 -0.000492611 12.2765 -0.000732925 12.0007L-0.000732662 5.99972C-0.00066768 2.96237 2.46194 0.499967 5.49927 0.499725L11.5002 0.499725C11.7764 0.499725 12.0002 0.723586 12.0002 0.999725Z"
                fill="#707575"
              />
            </svg>
            <svg
              width="8"
              height="5"
              viewBox="0 0 8 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-2 h-1 absolute right-0 bottom-0.5"
            >
              <path
                d="M0.000364152 4.50026H2.36924V3.86989H0.807281V0.500263H0.000364152V4.50026Z"
                fill="#707575"
              />
              <path
                d="M2.88221 4.50026H3.68913V2.74668H5.04936V2.11631H3.68913V1.13064H5.11852V0.500263H2.88221V4.50026Z"
                fill="#707575"
              />
              <path
                d="M5.76405 4.50026H6.57097V2.74668H7.9312V2.11631H6.57097V1.13064H8.00036V0.500263H5.76405V4.50026Z"
                fill="#707575"
              />
            </svg>
          </div>
        );
      case 'hf':
        return (
          <div className="w-4 h-4 relative">
            <svg
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 absolute left-0.5 top-0.5"
            >
              <path
                d="M11.5002 12.5003C11.2241 12.5003 11.0002 12.2764 11.0002 12.0003L11.0002 5.99931C11 3.51427 8.98532 1.49938 6.50024 1.49931H0.499268C0.22333 1.49907 -0.000732422 1.27531 -0.000732422 0.999313C-0.000492096 0.723525 0.223479 0.499554 0.499268 0.499313H6.50024C9.5376 0.499378 12 2.96198 12.0002 5.99931L12.0002 12.0003C12.0002 12.2764 11.7764 12.5003 11.5002 12.5003Z"
                fill="#707575"
              />
            </svg>
            <svg
              width="8"
              height="5"
              viewBox="0 0 8 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-2 h-1 absolute left-0.5 bottom-0.5"
            >
              <path
                d="M3.13433 4.50018H3.9014V2.7466H5.19447V2.11623H3.9014V1.13056H5.26022V0.500184H3.13433V4.50018Z"
                fill="#707575"
              />
              <path
                d="M5.87387 4.50018H6.64094V2.7466H7.93401V2.11623H6.64094V1.13056H7.99976V0.500184H5.87387V4.50018Z"
                fill="#707575"
              />
              <path
                d="M-0.000244141 4.50018H0.666892V2.7466H1.82612V4.50018H2.49325V0.500183H1.82612V2.11623H0.666892V0.500183H-0.000244141V4.50018Z"
                fill="#707575"
              />
            </svg>
          </div>
        );
      case 'notch':
        return (
          <div className="w-4 h-4 relative">
            <svg
              width="14"
              height="11"
              viewBox="0 0 14 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-2.5 absolute left-0.5 top-0.5"
            >
              <path
                d="M13.499 0.501282C13.7751 0.501363 13.999 0.725189 13.999 1.00128C13.999 1.27737 13.7751 1.5012 13.499 1.50128C11.3599 1.50128 9.48271 2.92753 8.91016 4.98859L7.48145 10.1321C7.42068 10.3509 7.22016 10.5013 6.99316 10.4984C6.76641 10.4953 6.56981 10.3404 6.51465 10.1204L5.2959 5.24542C4.7458 3.04513 2.769 1.50128 0.500977 1.50128C0.224834 1.50128 0.000976562 1.27742 0.000976562 1.00128C0.000976562 0.725139 0.224834 0.501282 0.500977 0.501282C3.22778 0.501282 5.60512 2.35692 6.2666 5.00226L7.02539 8.03839L7.94727 4.72101C8.64007 2.22718 10.9107 0.501282 13.499 0.501282Z"
                fill="#707575"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-start gap-1 max-md:gap-0.5 max-sm:gap-0.5 ${className}`}>
      {renderIcon()}
      <div className="flex justify-center items-center gap-2 pt-px">
        <span className="text-[#2D2F2F] text-xs font-normal leading-4 max-md:text-[11px] max-sm:text-[10px]">
          {value}
        </span>
      </div>
    </div>
  );
};
