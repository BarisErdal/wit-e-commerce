import { useSelector } from "react-redux";
import  ProductCard from "../components/ProductCard";

const Bestsellers = () => {

    const homeProducts = useSelector((s) => s.product.productList);
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

      <div className="md:max-w-5xl md:grid md:grid-cols-4 gap-4 flex flex-col items-center">
    {homeProducts.slice(0,8).map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
     </section>                       
    );

    }
    
    
export default Bestsellers;
