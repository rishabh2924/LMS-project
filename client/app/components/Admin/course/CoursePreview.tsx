import CoursePlayer from "@/app/utils/CoursePlayer";
import React from "react";
import { styles } from "../../styles/style";
import Ratings from "@/app/utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: () => void;
};

const CoursePreview = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
}: Props) => {
  const discountPercentage =
    ((courseData.estimatedPrice - courseData.price) /
      courseData.estimatedPrice) *
    100;

    const createCourse = () => {
      handleCourseCreate();
    }

  return (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData.demoUrl}
            title={courseData.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {courseData?.price === 0 ? "Free" : "₹" + courseData?.price}
          </h1>
          <h5 className="pl-3 text-xl mt-2 line-through opacity-80">
            {courseData?.estimatedPrice === 0
              ? "Free"
              : "₹" + courseData?.estimatedPrice}
          </h5>
          <h4 className="pl-5 pt-4 text-[22px]">{discountPercentage} % off</h4>
        </div>
        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[150px] my-3 font-Poppins bg-[crimson] cursor-not-allowed`}
          >
            Buy Now @{courseData?.price}
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discount code..."
            className={`${styles.input} 1500px:!w-[50% ] 1100px:w-[60%] ml-3 !mt-0`}
          />
          <div
            className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}
          >
            Apply
          </div>
        </div>
        <p className="pb-1 dark:text-white text-black">
          • Source code included
        </p>
        <p className="pb-1 dark:text-white text-black">
          • Full lifetime access
        </p>
        <p className="pb-1 dark:text-white text-black">
          • Certificate of completion
        </p>
        <p className="pb-3 800px:pb-1 dark:text-white text-black">
          • Premium Support
        </p>
      </div>
      <div className="w-full dark:text-white">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-semibold">
            {courseData?.name}
          </h1>
        </div>
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center">
            <Ratings rating={0} />
            <h5>0 Reviews</h5>
          </div>
          <h5>0 Students</h5>
        </div>
       <br />
       <div className="w-full dark:text-white">
        <h1 className="text-[20px] font-Poppins font-semibold ">
          What will you learn from this course?
        </h1>
      </div>
      {courseData?.benefits?.map((benefit: any, index: number) => (
        <div className="w-full flex 800px:items-center py-2" key={index}>
          <div className="w-[15px] mr-1">
            <IoCheckmarkDoneOutline size={20} />
          </div>
          <p className="pl-2">{benefit?.title}</p>
        </div>
      ))}
      </div>
      <br />
      <div className="w-full dark:text-white">
      <h1 className="text-[25px] font-Poppins font-semibold">
        What are prerequisites for this course?
      </h1>
      {
        courseData?.prerequisites?.map((prerequisite: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{prerequisite?.title}</p>
            </div>
        ))
      }
      </div>
      <br />
      <div className="w-full dark:text-white">
        <h1 className="text-[20px] font-Poppins font-semibold ">
          Course Details
        </h1>
        {courseData?.description}
      </div>
      <br />
      <br />
      <div className="w-full flex items-center justify-between">
        <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer "
        onClick={() => setActive(active - 1)}>
            Previous

        </div>
        <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
        onClick={createCourse}>
            Create
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
