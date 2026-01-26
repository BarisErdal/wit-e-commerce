import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  // State: Seçilen menü öğesinin adı (Başlangıçta 'Menü Seç' diyebiliriz)
  const [selectedItem, setSelectedItem] = useState(options[0]);

  const handleSelect = (item) => {
    setSelectedItem(item); // İsmi güncelle
    setIsOpen(false); // Menüyü kapat
  };

  return (
    <div
      className="relative inline-block text-left w-40 h-full mr-4 "
      onBlur={() => {
        setIsOpen(false);
      }}
    >
      {/* Dropdown Butonu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-12.5 inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-second-text bg-gray-100 rounded-md hover:bg-dark-bg hover:text-white focus:outline-none transition-all"
      >
        {selectedItem}
        <ChevronDown
          className={`ml-2 w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Açılır Menü Listesi */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg   focus:outline-none">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
