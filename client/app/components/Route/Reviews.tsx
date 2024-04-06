import React from "react";
import { styles } from "../styles/style";
import Image from "next/image";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
    {
      "name": "John Smith",
      "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
      "profession": "Software Engineer",
      "comment": "Great product! Very useful and user-friendly. It has all the features I need to streamline my workflow and boost productivity. The customer support is also excellent.",
      "rating": 5
    },
    {
      "name": "Emily Johnson",
      "avatar": "https://randomuser.me/api/portraits/women/2.jpg",
      "profession": "Graphic Designer",
      "comment": "I love the design! It's sleek and modern. The interface is intuitive, making it easy for me to create stunning designs. I highly recommend it to other designers.",
      "rating": 4.5
    },
    {
      "name": "Michael Davis",
      "avatar": "https://randomuser.me/api/portraits/men/3.jpg",
      "profession": "Marketing Manager",
      "comment": "This product helped increase our sales significantly. Its analytics tools provide valuable insights that have informed our marketing strategies. Overall, it's been a game-changer for our team.",
      "rating": 4.8
    },
    {
      "name": "Sarah Lee",
      "avatar": "https://randomuser.me/api/portraits/women/4.jpg",
      "profession": "Teacher",
      "comment": "As an educator, I find this tool extremely helpful for my students. It offers a wide range of resources and interactive features that engage learners effectively. I've seen a noticeable improvement in student performance since implementing it in my classroom.",
      "rating": 4.7
    },
    {
      "name": "David Brown",
      "avatar": "https://randomuser.me/api/portraits/men/5.jpg",
      "profession": "Freelance Writer",
      "comment": "The features are amazing! Definitely worth the investment. As a writer, I rely on this tool for organizing my ideas, managing my projects, and tracking my progress. It's become an indispensable part of my workflow.",
      "rating": 4.9
    },
    {
      "name": "Jessica Wilson",
      "avatar": "https://randomuser.me/api/portraits/women/6.jpg",
      "profession": "HR Manager",
      "comment": "Our entire team enjoys using this software. It streamlines our processes efficiently. From recruitment to performance management, it has simplified HR tasks and improved collaboration across departments.",
      "rating": 4.6
    },
    {
      "name": "Christopher Taylor",
      "avatar": "https://randomuser.me/api/portraits/men/7.jpg",
      "profession": "Financial Analyst",
      "comment": "I highly recommend this product to anyone looking to manage their finances effectively. Its comprehensive tools and customizable reports make financial analysis and planning a breeze. It's helped me make informed decisions and achieve my financial goals.",
      "rating": 4.8
    },
    {
      "name": "Amanda Martinez",
      "avatar": "https://randomuser.me/api/portraits/women/8.jpg",
      "profession": "Nurse",
      "comment": "This tool has made my job much easier. Thank you! As a nurse, I have a busy schedule and need to stay organized. This software helps me keep track of patient records, appointments, and medication schedules efficiently.",
      "rating": 4.5
    }
  ]
  
  

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px: flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../../public/images/hero.webp")}
            alt="business"
            width={500}
            height={700}
            className="rounded-full aspect-square "
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px: !text-[40px]`}>
            Our Students Are <span className="text-gradient">Our Strength</span>
            {""}
            <br /> See What They Say About Us
          </h3>
          <br />
          <p className={styles.label}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque unde
            voluptatum dignissimos, nulla perferendis dolorem voluptate nemo
            possimus magni deleniti natus accusamus officiis quasi nihil
            commodi, praesentium quidem, quis doloribus?
          </p>
        </div>
        
      </div>
      <br />
        <br />
        <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(6)]:!mt-[-20px] ">
            {
                reviews && reviews.map((item, index) => {
                    return (
                        <ReviewCard item={item} key={index} />
                    )
                })
            }
        </div>
    </div>
  );
};

export default Reviews;
