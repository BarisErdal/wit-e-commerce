import { AlarmClock, ChartArea } from "lucide-react";

const FeaturedCard = ({ fData }) => {
  return (
    <div className="font-montserrat max-w-82.5 border border-gray-200 shadow-md ">
        <img src={fData.src} alt=""  className="  w-100 h-60 overflow-hidden"/>

        <div className="px-6">
      <ul className="flex">
        {fData.links.map((l) => (
          <li className="font-normal hover:text-disabled-element-color text-xs text-second-text">
            {l}
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-normal">{fData.title}</h3>
      <p className="text-second-text text-sm font-normal">
        {fData.description}
      </p>

      <div className="flex justify-between">
        <div className="text-xs font-normal text-second-text flex items-center">
          <AlarmClock color="#23A6F0"/>
          <span>{fData.date}</span>
        </div>
        <div className="text-xs font-normal text-second-text flex items-center">
          <ChartArea color="#23856D"/>

          <span>{fData.comments} comments</span>
        </div>
      </div>

      <a href="#">Learn More</a>

      </div>
    </div>
  );
};

export default FeaturedCard;
