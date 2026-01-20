const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col items-center max-w-60.25 font-montserrat font-bold gap-3" > 
    
    <img src={product.image} alt={product.name} />
    <h2 className="font-bold  text-base">{product.name}</h2>
    <p className="text-sm text-second-text font-bold">{product.detail}</p>
   
   
   <div className="flex">  <p className="text-muted">{product.price}</p>
    <p className="text-reduced-price-color">{product.reducedPrice}</p></div>
  
<div className="flex gap-1">

  <span className="rounded-full bg-[#23A6F0] p-2"></span>
  <span className="rounded-full bg-[#23856D] p-2"></span>
  <span className="rounded-full bg-[#E77C40] p-2"></span>
  <span className="rounded-full bg-[#252B42] p-2"></span>
 
</div>
     </div>
    );
    }


export default ProductCard;