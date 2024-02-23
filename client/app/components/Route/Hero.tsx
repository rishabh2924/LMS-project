'use client'
import Image from 'next/image';
import React from 'react';

interface HeroProps {
  imageUrl: string;
  text: string;
}


// Example image and text for an e-learning platform


const Hero: React.FC<HeroProps> = ({ imageUrl, text }) => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center py-10 px-4 md:px-10">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <Image src={imageUrl} alt="E-Learning Platform" width={200} height={200} className="hero_animation w-full h-auto" />
      </div>
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold dark:text-white text-gray-900">{text}</h1>
      </div>
    </section>
  );
};
export default Hero;
