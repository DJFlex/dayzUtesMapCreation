import React from 'react';
import bannerImage from '../assets/dayz-banner.jpg';

const Banner: React.FC = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] mb-8 overflow-hidden">
      <img 
        src={bannerImage} 
        alt="DayZ landscape with sunset" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-2 drop-shadow-lg">
            Welcome to the DayZ Map Building Guide
          </h2>
          <p className="text-white text-xl md:text-2xl font-medium drop-shadow-lg">
            Build your world. Survive your way.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
