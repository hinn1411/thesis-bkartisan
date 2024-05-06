import { useEffect, useRef, useState } from 'react';


interface DropdownProps {
  name: string;
  filterNames: string[]
  onSelectFilter: (category: string) => void;
}


function Dropdown({name, filterNames, onSelectFilter }: DropdownProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(name);
    const dropdownRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
              setIsDropdownOpen(false);
          }
          }

          document.addEventListener("mousedown", handleClickOutside);
          return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };

        
    }, []);
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const handleFilterSelect = (filter: string) => {
      setSelectedFilter(filter);
      onSelectFilter(filter);
      setIsDropdownOpen(false);
    };
  
    return (
      <div className='' ref={dropdownRef}>
        <button onClick={toggleDropdown} id="dropdownSearchButton" className="flex items-center  justify-between drop-shadow-lg border space-x-2 min-w-28 max-w-48 px-3 rounded-xl text-gray-500 hover:bg-gray-200 cursor-pointer" type="button">
          <p>{selectedFilter}</p>
          <svg className="w-2.5 h-2.5" aria-hidden="true" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>
  
        <div id="dropdownSearch" className={`${isDropdownOpen ? '' : 'hidden'} z-10 bg-white rounded-xl min-w-28 max-w-48 shadow dark:bg-gray-700 absolute`}>
          <ul className="max-h-48 px-1 py-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
            {filterNames.map((filter: string, index: number) => (
              <li key={index} className='ps-2 rounded hover:bg-gray-100 w-full py-2 text-sm font-medium text-gray-900 cursor-pointer' onClick={() => handleFilterSelect(filter)}>
                {filter}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}

export default Dropdown;
