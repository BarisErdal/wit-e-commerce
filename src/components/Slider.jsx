import { useState } from "react";
import ButtonCta from "./ButtonCta";



export default function Slider({ slides }) {
  const [index, setIndex] = useState(0);

  const next = () =>
    setIndex((prev) => (prev + 1) % slides.length);

  const prev = () =>
    setIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  return (
    <div className="relative w-full  overflow-x-hidden md:h-[90vh] h-[150vh] ">
       <div className="overflow-hidden h-full">
    <div
      className="flex h-full transition-transform duration-500 ease-in-out"
      style={{ transform: `translateX(-${index * 100}%)` }}
    >
      {slides.map((slide,index) => (
        <div
          key={slide.id}
          className={" relative w-full h-full shrink-0 " + slide.backgroundColor}
        >
          {/* Image */}
          <img
            src={slide.src}
            alt={slide.title}
            className={index=== 0 ?`w-full h-full object-scale-down object-bottom md:scale-75 md:object-bottom-right md:absolute md:-bottom-30`: `w-full h-full object-cover`}
          />

          {/* Overlay Text */}
          <div className="absolute top-50 flex flex-col justify-center text-white px-6 font-montserrat
                          items-center md:items-start md:px-24">
            <h2 className="text-base mb-8">
              {slide.season}
            </h2>

            <h2 className="text-[40px] md:text-[58px] font-bold mb-3">
              {slide.title}
            </h2>

            <p className="text-xl mb-6 max-w-md">
              {slide.description}
            </p>

            <ButtonCta className="rounded-[5px] px-6 py-3 bg-success text-white font-semibold hover:bg-white hover:text-success transition">
              {slide.cta}
            </ButtonCta>
          </div>
        </div>
      ))}
    </div>
  </div>

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
      >
        ›
      </button>
    </div>
  );
}
