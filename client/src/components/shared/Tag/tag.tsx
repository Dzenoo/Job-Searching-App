import React, { useCallback, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { TagProps } from "./types";
import useOnOutsideClick from "@/hooks/useOnOutsideClick";

const Tag: React.FC<TagProps> = React.forwardRef(
  (
    { options, placeholder = "Select...", className, onSelect, initials },
    ref
  ) => {
    const [selectedItems, setSelectedItems] = useState<string[]>(
      initials || []
    );
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const $tagRef = useRef(null);

    const handleCloseTag = () => {
      setIsOpen(false);
    };

    useOnOutsideClick([$tagRef], isOpen, handleCloseTag);

    const handleToggleItem = useCallback(
      (item: string) => {
        setSelectedItems((prevItems) => {
          if (prevItems.includes(item)) {
            onSelect(prevItems.filter((selected) => selected !== item));
            return prevItems.filter((selected) => selected !== item);
          } else {
            onSelect([...prevItems, item]);
            return [...prevItems, item];
          }
        });
      },
      [selectedItems, onSelect]
    );

    const handleClearSelection = useCallback(() => {
      setSelectedItems([]);
    }, []);

    const filteredOptions = useMemo(() => {
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [options, searchTerm]);

    return (
      <div className={twMerge("relative", className)} ref={$tagRef}>
        <div
          className={twMerge(
            "dark:text-white dark:border-[#1b1b1b] dark:bg-[#0d0d0d] hover:border-gray-400 dark:hover:border-gray-400 dark:focus:border-gray-400 focus:border-gray-400 bg-white border-gray-300 rounded-lg p-3 flex items-center justify-between cursor-pointer transition-all duration-300 border overflow-hidden",
            isOpen && "border-b-0 rounded-t-lg",
            !isOpen && "rounded-lg"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedItems.length > 0 ? (
            <div className="flex items-center flex-wrap gap-2">
              {selectedItems.map((selected) => (
                <div
                  key={selected}
                  className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs flex items-center"
                >
                  {selected}
                  <button
                    className="ml-1 focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleItem(selected);
                    }}
                    type="button"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-600">{placeholder}</div>
          )}
        </div>
        {isOpen && (
          <div className="dark:bg-[#0b0b0b] absolute dark:border-[#1b1b1b] top-full left-0 right-0 border border-gray-300 rounded-lg bg-white shadow-lg mt-1 z-10">
            <div className="p-3">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="dark:bg-[#0b0b0b] border dark:border-[#1b1b1b] border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none bg-white dark:text-white text-gray-800"
              />
            </div>
            <div className="p-3 flex justify-between items-center border-t border-gray-300">
              <button
                className="text-blue-500 hover:text-blue-600 focus:outline-none"
                onClick={handleClearSelection}
                type="button"
              >
                Clear Selection
              </button>
            </div>
            <div className="max-h-16 overflow-y-auto">
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="px-3 py-2 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-[#1b1b1b]"
                  onClick={() => handleToggleItem(option.value)}
                >
                  <span className="dark:text-white text-black">
                    {option.label}
                  </span>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(option.value)}
                    className="form-checkbox h-5 w-5"
                    onChange={() => {}}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export { Tag };
