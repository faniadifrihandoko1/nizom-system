import React from "react";

interface SelectLimitProps {
  selectedLimit: number;
  onLimitChange: (limit: number) => void;
}

const SelectLimit: React.FC<SelectLimitProps> = ({
  selectedLimit,
  onLimitChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (item: number) => {
    onLimitChange(item);
    setIsOpen(false);
  };

  const dropdownItems = [5,10, 15, 20, 25];

  return (
    <div className="relative">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-black border-2 border-slate-200 bg-white focus:ring-4 font-medium rounded-lg text-sm px-2 py-1 h-full flex justify-between items-center"
        type="button"
      >
        {selectedLimit}
        <svg
          className="w-2 h-2 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-20 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {dropdownItems.map((item) => (
              <li key={item}>
                <button
                  onClick={() => handleItemClick(item)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectLimit;
