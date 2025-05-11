import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import './Carrousel.css';

const Carrousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [images] = useState([
    '/carrousel/aws.png',
    '/carrousel/java.webp',
    '/carrousel/python.webp',
    '/carrousel/terraform.png',
    '/carrousel/docker.webp',
  ]);

  // Get the current image name without extension
  const getCurrentImageName = () => {
    if (images.length === 0) return '';
    const fileName = images[activeIndex].split('/').pop();
    return fileName.split('.')[0];
  };

  return (
    <div className="carrousel-container">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[EffectCoverflow]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="mySwiper"
        spaceBetween={30}
        initialSlide={2}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img 
              src={process.env.PUBLIC_URL + image} 
              alt={`Slide ${index}`}
              onError={(e) => {
                console.error(`Error loading image: ${image}`);
                e.target.src = '/carrousel/placeholder.png';
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="image-label">
        {getCurrentImageName()}
      </div>
    </div>
  );
};

export default Carrousel;
