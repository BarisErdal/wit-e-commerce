import { ChevronRight,ChevronDown, LayoutGrid, ListChecks } from "lucide-react";
import { shopCategories } from "../data/data";
import Cloth from "../components/Cloth";

import { useState } from "react";
import ButtonCta from "../components/ButtonCta";

const options = ["Popularity", "Moda", "Ev & Yaşam", "Spor"];

const ShopPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  // State: Seçilen menü öğesinin adı (Başlangıçta 'Menü Seç' diyebiliriz)
  const [selectedItem, setSelectedItem] = useState(options[0]);

  const handleSelect = (item) => {
    setSelectedItem(item); // İsmi güncelle
    setIsOpen(false); // Menüyü kapat
  };

  return (
    <section className="mt-15 md:mt-35  mx-auto font-montserrat ">
      <div className="bg-light-gray">
        <div className="flex justify-between py-7.5 px-8 mx-auto max-w-6xl">
          <h2 className="font-bold text-2xl text-logo-blue">Shop</h2>

          <div className="flex items-center">
            <h4 className="font-normal text-sm text-logo-blue">Home</h4>
            <ChevronRight color="#BDBDBD" />
            <h4 className="text-muted font-normal text-sm">Shop</h4>
          </div>
        </div>

        <div className=" flex flex-col md:flex md:flex-row md:max-w-272 mx-auto  gap-5">
          {shopCategories.map((cat, i) => (
            <Cloth key={i} data={cat} />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-y-6 max-w-7xl mx-auto items-center mt-12 md:flex md:flex-row">
        <h3 className="text-second-text text-sm font-bold">Showing all 12 Results</h3>
        <div className="flex items-center gap-4">
          <h4 className="text-second-text text-sm font-bold">Views: </h4>
          <LayoutGrid className="text-dark-bg" size={16}/>
          <ListChecks className="text-second-text" size={16}/>
        </div>
        <div>
          {/* DROPDOWN MENU   */}

          <div
            className="relative inline-block text-left w-40 h-full mr-4 "
            onMouseLeave={() => {
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

          <ButtonCta className='ml-4'>Filter</ButtonCta>
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
