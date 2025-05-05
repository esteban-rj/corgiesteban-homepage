import { useState, useEffect, useRef } from 'react';
import './Carrousel.css';

const Carrousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 100, gap: 50 });
  
  useEffect(() => {
    // Load images from the public/carrousel folder
    const loadImagesFromPublicFolder = async () => {
      try {
        const publicImages = [
          '/carrousel/aws.png',
          '/carrousel/java.webp',
          '/carrousel/python.webp',
          '/carrousel/terraform.png',
          '/carrousel/docker.webp',
        ];
        setImages(publicImages);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };
    
    loadImagesFromPublicFolder();
    
    // Update image dimensions on window resize
    const updateDimensions = () => {
      const sideWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--side-image-width') || '100', 10);
      const gapSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--image-gap') || '50', 10);
      setImageDimensions({ width: sideWidth, gap: gapSize });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Get three images to display, handling wrap-around at the end
  const getVisibleImages = () => {
    if (images.length < 3) return [];
    
    const visibleImages = [];
    for (let i = 0; i < 3; i++) {
      // Calculate index with wrap-around
      const imgIndex = (currentIndex + i) % images.length;
      visibleImages.push({
        src: images[imgIndex],
        index: imgIndex
      });
    }
    return visibleImages;
  };
  
  const nextSlide = () => {
    if (isTransitioning || images.length < 3) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsTransitioning(false);
    }, 250); // Match the CSS transition time
  };
  
  const prevSlide = () => {
    if (isTransitioning || images.length < 3) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 250); // Match the CSS transition time
  };
  
  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000); // Auto advance every 3 seconds
      
      return () => clearInterval(interval);
    }
  }, [images.length, isTransitioning]);
  
  // Calculate transform for slide animation
  const getTransformStyle = () => {
    if (!carouselRef.current) return {};
    
    // Use the side image width and gap from our state
    const slideWidth = imageDimensions.width + imageDimensions.gap;
    
    return {
      transform: isTransitioning 
        ? `translateX(-${slideWidth}px)` 
        : 'translateX(0)',
      transition: isTransitioning ? 'transform 250ms ease-in-out' : 'none'
    };
  };
  
  const visibleImages = getVisibleImages();
  
  return (
    <div className="carrousel-container">
      {images.length > 0 && (
        <>
          <button 
            className="nav-button prev" 
            onClick={prevSlide}
            disabled={isTransitioning}
          >
            &lt;
          </button>
          
          <div className="carrousel-viewport">
            <div 
              className="carrousel-viewport-inner"
              ref={carouselRef}
              style={getTransformStyle()}
            >
              {visibleImages.map((image, index) => (
                <div 
                  className={`carrousel-image ${index === 1 ? 'center' : ''} ${isTransitioning ? 'slide-transition' : ''}`} 
                  key={`slide-${image.index}`}
                >
                  <img 
                    src={process.env.PUBLIC_URL + image.src} 
                    alt={`Slide ${image.index}`} 
                    onError={(e) => {
                      console.error(`Error loading image: ${image.src}`);
                      e.target.src = '/carrousel/placeholder.png'; // Fallback image
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="nav-button next" 
            onClick={nextSlide}
            disabled={isTransitioning}
          >
            &gt;
          </button>
        </>
      )}
    </div>
  );
};

export default Carrousel;
