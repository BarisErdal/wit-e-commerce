import { Link } from "react-router-dom";



const ProductCard = ({ product}) => {



  return (
 <Link to={`/shop/${product.id}`}
 
 className="
   flex flex-col items-center w-full font-montserrat font-bold gap-3
    ">
      <div className="w-full aspect-3/4 overflow-hidden bg-gray-100">
       <img
        src={product?.images[0]?.url}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
      </div>

      <h2 className="text-base text-center">{product.name}</h2>
      <p className="text-sm text-second-text text-center">
        {product.description}
      </p>

      <div className="flex gap-2">
        <p className="text-muted">{product.price}</p>
        <p className="text-reduced-price-color">
          {product.reducedPrice}
        </p>
      </div>

      <div className="flex gap-1">
        <span className="rounded-full bg-header-turkuaz p-2"></span>
        <span className="rounded-full bg-reduced-price-color p-2"></span>
        <span className="rounded-full bg-[#E77C40] p-2"></span>
        <span className="rounded-full bg-[#252B42] p-2"></span>
      </div>
    </Link>
    );
    }


export default ProductCard;