import { useState, useEffect } from 'react';
import './Skills.css';

const Skills = () => {
  const [images] = useState([
    '/skills/angular.png',
    '/skills/react.png',
    '/skills/aws.png',
    '/skills/java.webp',
    '/skills/python.webp',
    '/skills/terraform.png',
    '/skills/docker.webp',
    '/skills/go.png',
    '/skills/devops.png',
    '/skills/mlops.png',
    '/skills/linux.png',
    '/skills/github.png'
  ]);

  const [hoverText, setHoverText] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = async (skillName) => {
    try {
      const response = await fetch(`/skills/${skillName.toLowerCase()}.txt`);
      if (response.ok) {
        const text = await response.text();
        setHoverText(text);
      } else {
        setHoverText('No description available');
      }
    } catch (error) {
      console.error('Error loading skill description:', error);
      setHoverText('Error loading description');
    }
  };

  const handleMouseMove = (e) => {
    setHoverPosition({
      x: e.clientX + 20, // Offset from cursor
      y: e.clientY + 20
    });
  };

  return (
    <div className="grid-container" onMouseMove={handleMouseMove}>
      <div className="grid">
        {images.map((image, index) => {
          const skillName = image.split('/').pop().split('.')[0];
          return (
            <div 
              key={index} 
              className="grid-item"
              onMouseEnter={() => {
                setIsHovering(true);
                handleMouseEnter(skillName);
              }}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img 
                src={process.env.PUBLIC_URL + image} 
                alt={`Image ${index}`}
                onError={(e) => {
                  console.error(`Error loading image: ${image}`);
                  e.target.src = '/skills/placeholder.png';
                }}
              />
              <div className="image-label">
                {skillName.toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>
      {isHovering && (
        <div 
          className="hover-text-box"
          style={{
            left: `${hoverPosition.x}px`,
            top: `${hoverPosition.y}px`
          }}
        >
          {hoverText}
        </div>
      )}
    </div>
  );
};

export default Skills;
