const Cloth = ({ data }) => {
  return (
    <div className="relative font-montserrat mx-auto">
      <img  src={data.src} alt={data.title} />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h4 className="font-bold text-base text-white mb-7">{data.title}</h4>
        <p className="font-bold text-sm text-white">{data.items} items</p>
      </div>
    </div>
  );
};

export default Cloth;
