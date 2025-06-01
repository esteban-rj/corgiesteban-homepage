import React, { useState } from 'react';

const AboutMe = () => {
  const [isSectionHovered, setIsSectionHovered] = useState(false);

  return (
    <section 
      className="bg-white py-16"
      onMouseEnter={() => setIsSectionHovered(true)}
      onMouseLeave={() => setIsSectionHovered(false)}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          About Me !
        </h2>
        <div className="flex flex-wrap -mx-4 md:justify-center">
          <div className="w-full md:w-1/4 px-4 mb-8 md:mb-0">
            <p>
              Music 🎶, F1 🏎️, anime 🎥, pets 🐶 and 💻 Software lover...<br /><br />
              Enjoy working in the technological field to seek, innovate and searching for solutions to meet the client requirements. I enjoy development, Cloud architecture and artificial intelligence.
            </p>
          </div>
          <div className="w-full md:w-1/4 px-4 flex justify-center items-center">
            <img
              src="/cogi-programming-v5.gif" // Assuming public folder is served from the root
              alt="Corgi Programmer"
              width={400}
              height={400}
              className={`rounded-lg ${isSectionHovered ? 'animate-rotate-corgi' : ''}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe; 