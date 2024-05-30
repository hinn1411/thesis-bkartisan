import React, { useState } from 'react';

interface DropdownContentProps {
  onSelectYear: (year: number) => void;
}

const DropdownContent: React.FC<DropdownContentProps> = ({ onSelectYear }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // State để lưu giữ giá trị của năm được chọn

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 4 }, (_, i) => currentYear - i);
  };

  const handleSelect = (year: number) => {
    setSelectedYear(year); // Cập nhật giá trị của năm được chọn
    onSelectYear(year);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      {/* Button with onClick event */}
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
        type="button"
      >
        01/{selectedYear} - 12/{selectedYear} {/* Sử dụng giá trị của state selectedYear */}
        <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      
      {/* Dropdown menu */}
      <div id="lastDaysdropdown" className={`z-10 ${isDropdownOpen ? '' : 'hidden'} absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-auto dark:bg-gray-700`}>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          {getYearOptions().map((year) => (
            <li key={year}>
              <button 
                onClick={() => handleSelect(year)} 
                className="block w-full text-left px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                01/{year} - 12/{year}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DropdownContent;
