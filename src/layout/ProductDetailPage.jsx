import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './ProductDetailPage.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
const ProductDetailPage =()=> {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (  <section className="mt-25">
<div className='p-5'>
   <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 "
      >
        <SwiperSlide>
          <img src="/shop/p1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/shop/p2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/shop/p3.jpg" />
        </SwiperSlide>
       
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-6"
      >
        <SwiperSlide>
          <img src="/shop/p1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/shop/p2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/shop/p3.jpg" />
        </SwiperSlide>
        
      </Swiper>

      </div>

    </section> )
}

export default ProductDetailPage