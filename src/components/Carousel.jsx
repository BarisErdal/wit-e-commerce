import { useState } from "react";


const slides = [
  {
    id: 1,
    src: "/Carousel1.jpg",
    title: "NEW COLLECTION",
    season:"SUMMER 2026",
    description: "We know how large objects will act, but things on a  small scale.",
    cta: "SHOP NOW",
  },
  {
    id: 2,
    src: "https://picsum.photos/1200/800?2",
    title: "İndirim",
     season:"SUMMER 2026",
    description: "%40’a varan fırsatlar",
    cta: "Hemen Bak",
  },
  {
    id: 3,
    src: "https://picsum.photos/1200/800?3",
    title: "Özel Seçim",
     season:"SUMMER 2026",
    description: "Editörün favorileri",
    cta: "İncele",
  },
];




export default function Carousel() {
  const [index, setIndex] = useState(0);

  const next = () =>
    setIndex((prev) => (prev + 1) % slides.length);

  const prev = () =>
    setIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  return (
    <div className="relative w-full h-screen overflow-x-hidden">
       <div className="overflow-hidden h-full">
    <div
      className="flex h-full transition-transform duration-500 ease-in-out"
      style={{ transform: `translateX(-${index * 100}%)` }}
    >
      {slides.map((slide) => (
        <div
          key={slide.id}
          className="relative w-full h-full shrink-0"
        >
          {/* Image */}
          <img
            src={slide.src}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay Text */}
          <div className="absolute inset-0 flex flex-col justify-center text-white px-6 font-montserrat
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

            <button className="rounded-[5px] px-6 py-3 bg-success text-white font-semibold hover:bg-white hover:text-success transition">
              {slide.cta}
            </button>
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
