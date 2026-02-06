import { useSelector } from "react-redux";
import  ProductCard from "../components/ProductCard";

const Bestsellers = () => {

    const productList = useSelector((s) => s.product.productList);

    const bestSellers = productList.sort((a,b) =>  b["sell_count"]-a["sell_count"])
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center">  
    
       <div className="text-center mb-12">
        <h2 className="text-2xl font-bold tracking-wide">
          BESTSELLER PRODUCTS
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Problems trying to resolve the conflict between
        </p>
      </div>

      <div className="w-full md:max-w-5xl md:grid md:grid-cols-4 md:gap-4 flex flex-col items-center md:items-stretch md:justify-items-stretch">
    {bestSellers.slice(0,8).map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
     </section>                       
    );

    }
    
    
export default Bestsellers;
