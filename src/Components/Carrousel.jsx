import { useState } from 'react';
import './Carrousel.css';

const Carrousel = () => {
  const [images] = useState([
    '/skills/aws.png',
    '/skills/java.webp',
    '/skills/python.webp',
    '/skills/terraform.png',
    '/skills/docker.webp',
    '/skills/go.png',
    '/skills/devops.png',
    '/skills/mlops.png'
  ]);

  return (
    <div className="grid-container">
      <div className="grid">
        {images.map((image, index) => (
          <div key={index} className="grid-item">
            <img 
              src={process.env.PUBLIC_URL + image} 
              alt={`Image ${index}`}
              onError={(e) => {
                console.error(`Error loading image: ${image}`);
                e.target.src = '/skills/placeholder.png';
              }}
            />
            <div className="image-label">
              {image.split('/').pop().split('.')[0]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carrousel;
