import { AlarmClock, ChartArea } from "lucide-react";

const FeaturedCard = ({ fData }) => {
  return (
    <div className="font-montserrat max-w-82.5 border border-gray-200 shadow-md relative pb-8">
      <div className="bg-danger absolute left-5 top-5 text-sm font-bold text-white rounded-[3px] px-2.5 py-1">NEW</div>
        <img src={fData.src} alt=""  className="  w-100 h-60 overflow-hidden"/>

        <div className="px-6">
      <ul className="flex gap-4 mt-6 mb-2.5">
        {fData.links.map((l) => (
          <li className="font-normal hover:text-disabled-element-color text-xs text-second-text cursor-pointer">
            {l}
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-normal mb-2.5">{fData.title}</h3>
      <p className="text-second-text text-sm font-normal mb-2.5">
        {fData.description}
      </p>

      <div className="flex justify-between mb-2.5">
        <div className="text-xs font-normal text-second-text flex items-center">
          <AlarmClock color="#23A6F0"/>
          <span>{fData.date}</span>
        </div>
        <div className="text-xs font-normal text-second-text flex items-center">
          <ChartArea color="#23856D"/>

          <span>{fData.comments} comments</span>
        </div>
      </div>

      <a href="#" className="font-bold  text-sm text-second-text">Learn More</a>

      </div>
    </div>
  );
};

export default FeaturedCard;
