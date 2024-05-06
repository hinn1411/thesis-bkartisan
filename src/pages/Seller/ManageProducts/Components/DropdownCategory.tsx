import { useEffect, useRef, useState } from 'react';


interface DropdownProps {
  name: string;
  categoryNames: string[]
  onSelectCategory: (category: string) => void;
}


function DropdownCategory({name, categoryNames, onSelectCategory }: DropdownProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(name);
    const [searchTerm, setSearchTerm] = useState(""); 
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
  
    const handleCategorySelect = (category: string) => {
      setSelectedCategory(category);
      onSelectCategory(category);
      setIsDropdownOpen(false);
    };
  
   
    const filteredCategorys = categoryNames.filter((category: string) =>
      category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className='' ref={dropdownRef}>
        <button onClick={toggleDropdown} id="dropdownSearchButton" className="flex items-center  justify-between shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 w-48 p-2.5" type="button">
          <p>{selectedCategory}</p>
          <svg className="w-2.5 h-2.5" aria-hidden="true" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>
  
        <div id="dropdownSearch" className={`${isDropdownOpen ? '' : 'hidden'} z-10 bg-white rounded-lg max-w-48 shadow dark:bg-gray-700 absolute`}>
          <div className="p-2">
            <label className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Search user"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <ul className="max-h-48 px-1 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
            {filteredCategorys.map((category: string, index: number) => (
              <li key={index} className='ps-2 rounded hover:bg-gray-100 w-full py-2 text-sm font-medium text-gray-900 cursor-pointer' onClick={() => handleCategorySelect(category)}>
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}

export default DropdownCategory;
