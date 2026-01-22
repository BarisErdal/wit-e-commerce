import FeaturedCard from "../components/FeaturedCard";

const FeaturedProducts = ({ data }) => {
  return (
    <section className="max-w-7xl flex justify-center mx-auto">


      <div className=" flex flex-col gap-15 md:flex md:flex-row md:item-center">
      {data.map((f, i) => (
        <FeaturedCard key={i} fData={f} />
      ))}

      </div>
    </section>
  );
};

export default FeaturedProducts;
