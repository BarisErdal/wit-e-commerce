const ProductCard = ({ product }) => {
  return (
 <div className="
      flex flex-col
      items-center
      w-full
      max-w-full
      md:max-w-80.25
      font-montserrat
      font-bold
      gap-3
    ">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-auto object-contain"
      />

      <h2 className="text-base text-center">{product.name}</h2>
      <p className="text-sm text-second-text text-center">
        {product.detail}
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
    </div>
    );
    }


export default ProductCard;