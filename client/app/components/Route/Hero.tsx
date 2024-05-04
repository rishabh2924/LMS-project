"use client";
import { SearchOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface HeroProps {
  imageUrl: string;
  text: string;
}

// Example image and text for an e-learning platform

const Hero: React.FC<HeroProps> = ({ imageUrl, text }) => {
  const [search, setSearch] = React.useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search==="") {
      return ;
    }
    else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <section className="flex flex-col md:flex-row justify-between items-center py-10 px-4 md:px-10">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <Image
          src={imageUrl}
          alt="E-Learning Platform"
          width={200}
          height={200}
          className="hero_animation w-[70%] rounded-full aspect-square object-cover"
        />
      </div>
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold dark:text-white text-gray-900">
          {text}
        </h1>
        <form
          className=" w-full flex items-center mt-10 "
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Search for your favorite courses ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none dark:text-white bg-transparent "
          />
          <button
            type="submit"
            className="px-4 py-2 mr-40  bg-blue-500  rounded-r-md "
          >
            <SearchOutlined />
          </button>
        </form>
      </div>
    </section>
  );
};
export default Hero;
