

const TeamCard = ({src,name,title}) => {
 return(
<div className="flex flex-col items-center w-full font-bold ">

    <img src={src} alt={name} className="w-full h-full object-cover aspect-3/4 " />
    <h3 className="text-xl text-dark-bg font-montserrat font-normal pt-1">{name}</h3>
    <p className="font-normal text-sm text-second-text font-montserrat">{title}</p>
</div>
)
};

export default TeamCard;
