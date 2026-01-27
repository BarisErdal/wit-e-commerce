import { useState } from "react";
import {ChevronRight} from 'lucide-react'

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tab = tabs[activeTab];

  return (
    <div className="w-full mt-12 ">
      {/* TAB HEADERS */}
      <div className="flex justify-center items-center mb-10 gap-6 mx-auto" >
        {tabs.map((t, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`pb-3 font-semibold text-sm hover:cursor-pointer relative transition
              ${
                activeTab === index
                  ? "text-dark-bg font-bold"
                  : "text-second-text"
              }
            `}
          >
            {t.label}

           
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="grid md:grid-cols-2 gap-10 items-start px-10">
        {/* LEFT IMAGE */}
        {tab.src && (
          <img
            src={tab.src}
            alt={tab.label}
            className="w-full max-w-full rounded-md object-cover"
          />
        )}

        {/* RIGHT CONTENT */}
        <div className="space-y-10">
          {/* subContent */}
          {tab.subContent && (
            <div>
              <h4 className="font-bold text-dark-bg text-2xl font-montserrat mb-3">
                {tab.subContent.title}
              </h4>
              <p className="text-sm text-second-text font-montserrat font-medium leading-relaxed">
                {tab.subContent.desc}
              </p>
            </div>
          )}

          {/* subContent2 */}
          {tab.subContent2 && (
            <div>
              <h4 className="font-bold text-dark-bg text-2xl font-montserrat mb-3">
                {tab.subContent2.title}
              </h4>
              <ul className="space-y-2">
                {tab.subContent2.lists.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-second-text font-semibold  ml-5"
                  >
                   <ChevronRight className="inline"/> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* subContent3 */}
          {tab.subContent3 && (
            <div>
              <h4 className="font-bold text-dark-bg text-2xl font-montserrat mb-3">
                {tab.subContent3.title}
              </h4>
              <ul className="space-y-2">
                {tab.subContent3.lists.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-second-text font-semibold ml-5"
                  >
                   <ChevronRight className="inline"/> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SIMPLE CONTENT (Other tabs) */}
          {tab.content && (
            <p className="text-sm text-light3-gray">{tab.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
