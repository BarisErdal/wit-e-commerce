import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { Star, Heart, Eye, ShoppingCart } from "lucide-react";
import ButtonCta from "./ButtonCta";
import "./ProductDetailCard.css";

const ProductDetailCard = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const images =
    product?.images?.length > 0
      ? product.images.map((img) => img.url)
      : ["/shop/p1.jpg", "/shop/p2.jpg", "/shop/p3.jpg"];

  const ratingValue = Number(product?.rating || 0);
  const filledStars = Math.round(ratingValue);
  const isInStock = (product?.stock || 0) > 0;

  return (
    <div className="md:flex md:max-w-6xl md:mx-auto md:gap-8 overflow-hidden pt-20">
      {/* LEFT – IMAGE SLIDER */}
      <div className="p-5 md:max-w-105 w-full min-w-0">
        <Swiper
          spaceBetween={10}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="w-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt="product"
                className="w-full max-w-full object-cover rounded-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* THUMBNAILS */}
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper mt-6 w-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt="thumb"
                className="w-full max-w-full object-cover rounded-md cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* RIGHT – PRODUCT DETAILS */}
      <div className="font-montserrat p-5 flex-1 min-w-0">
        <h3 className="font-semibold text-xl text-dark-bg mb-3">
          {product?.name || "Product"}
        </h3>

        <div className="flex items-center gap-1 mb-5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              fill={i < filledStars ? "#F3CD03" : "none"}
              color="#F3CD03"
              strokeWidth={0}
              size={22}
            />
          ))}
          <p className="ml-2 text-sm font-bold text-second-text">
            Rating: {ratingValue ? ratingValue.toFixed(2) : "N/A"}
          </p>
        </div>

        <h4 className="text-2xl font-bold text-dark-bg mb-1">
          ${product?.price ?? "--"}
        </h4>

        <h5 className="text-sm text-second-text font-bold mb-8">
          Availability :{" "}
          <span className="text-header-turkuaz">
            {isInStock ? "In Stock" : "Out of Stock"}
          </span>
        </h5>

        <p className="text-light3-gray text-sm font-semibold tracking-wide pb-4 mb-6 border-b border-muted">
          {product?.description || "Product description is unavailable."}
        </p>

        <div className="flex gap-3 mb-10">
          <span className="w-8 h-8 rounded-full bg-header-turkuaz" />
          <span className="w-8 h-8 rounded-full bg-reduced-price-color" />
          <span className="w-8 h-8 rounded-full bg-[#E77C40]" />
          <span className="w-8 h-8 rounded-full bg-[#252B42]" />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <ButtonCta variant="primary">Select Options</ButtonCta>
          <Heart className="cursor-pointer" />
          <ShoppingCart className="cursor-pointer" />
          <Eye className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
