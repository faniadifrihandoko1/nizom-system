import { useState } from "react";
import { IoFilter } from "react-icons/io5";

interface FilterProps {
  onSortChange: (value: string) => void;
}

export const FilterDropdown = ({ onSortChange }: FilterProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSortOrder(value);
    onSortChange(value);
  };

  return (
    <div className="relative">
      <div
        className="text-gray-800 text-sm py-2 px-2 flex gap-1 h-full items-center bg-[#d9e2f6] rounded-md hover:bg-[#b4c2f4] cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <IoFilter size={20} color="#2563EB" />
        <span>Filter</span>
      </div>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="p-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="sortOrder"
                value="asc"
                checked={sortOrder === "asc"}
                onChange={handleSortChange}
              />
              <span className="ml-2">Terlama</span>
            </label>
            <label className="flex items-center mt-2">
              <input
                type="radio"
                name="sortOrder"
                value="desc"
                checked={sortOrder === "desc"}
                onChange={handleSortChange}
              />
              <span className="ml-2">Terbaru</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
