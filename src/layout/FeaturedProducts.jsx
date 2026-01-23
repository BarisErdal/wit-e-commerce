import FeaturedCard from "../components/FeaturedCard";

const FeaturedProducts = ({ data }) => {
  return (
    <section className="max-w-7xl flex flex-col justify-center items-center mx-auto pb-28">
      <div className="flec flex-col items-center justify-center text-center font-montserrat max-w-69.75 md:max-w-150">
        <h6 className="text-header-turkuaz font-bold text-sm mb-2.5">Practice Advice</h6>
        <h2 className="text-[40px] text-logo-blue font-bold mb-2.5">Featured Products</h2>
        <p className="text-second-text text-sm font-normal mb-20">Problems trying to resolve the conflict between the two major </p>
      </div>

      <div className=" flex flex-col gap-15 md:flex md:flex-row md:item-center">
        {data.map((f, i) => (
          <FeaturedCard key={i} fData={f} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
