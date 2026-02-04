import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



const slugify = (text = "") =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const ProductCard = ({ product }) => {
  const categories = useSelector((s) => s.product.categories);
  const category = categories.find((c) => c.id === product.category_id);
  const categoryName = category?.code?.split(":")[1] || category?.title || "category";
  const gender = category?.gender === "k" ? "kadin" : category?.gender ? "erkek" : "unisex";
  const productNameSlug = slugify(product.name);
  const categoryNameSlug = slugify(categoryName);



  return (
 <Link
    to={`/shop/${gender}/${categoryNameSlug}/${product.category_id}/${productNameSlug}/${product.id}`}
    className="
   group flex flex-col items-center w-full font-montserrat font-bold gap-3
   cursor-pointer transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg
    "
  >
      <div className="w-full aspect-3/4 overflow-hidden bg-gray-100">
     <img
        src={product.images?.[0]?.url || "/shop/p1.jpg"}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
