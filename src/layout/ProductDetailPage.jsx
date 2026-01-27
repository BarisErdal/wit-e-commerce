import ProductDetailCard from "../components/ProductDetailCard";
import Tabs from "../components/Tabs";
import { tabs } from "../data/tabsData";
import { productDetailBestseller } from "../data/productBestseller";
import ProductCard from "../components/ProductCard";
import { brandsData } from "../data/data";

const ProductDetailPage = () => {
 
 
  return (
    <section className="mt-25">
      <ProductDetailCard />
      <Tabs tabs={tabs} />

<div className="md:max-w-5xl md:grid md:grid-cols-4 gap-4 flex flex-col items-center mx-auto">
    {productDetailBestseller.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>



<div
        className="
  grid
  grid-cols-1
  sm:grid-cols-3
  md:grid-cols-4
  lg:grid-cols-6
  gap-3
  place-items-center
  mt-20
  max-w-7xl
  mx-auto
  px-4
"
      >
        {brandsData.map((b, i) => (
          <img
            key={i}
            src={b.src}
            alt=""
            className="w-25 sm:w-12 md:w-14 lg:w-15 h-auto object-contain"
          />
        ))}
      </div>



    </section>
  );
};

export default ProductDetailPage;
