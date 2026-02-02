const Cloth = ({ data }) => {
  return (
 <div className="relative font-montserrat w-full max-w-full overflow-hidden">
      <img
        src={data.img}
        alt={data.title}
        className="w-full h-auto object-cover aspect-3/4"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h4 className="font-bold text-base text-white mb-7">
          {data.title}
        </h4>
        <p className="font-bold text-sm text-white">
          {data.rating} items
        </p>
      </div>
    </div>
  );
};

export default Cloth;
