import React from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions = ({ active, setActive }: Props) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Prewiew",
  ];
  return (
    <div>
      {options.map((option: any, index: number) => {
        return (
          <div className="w-full flex py-5" key={index}>
            <div
              className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${
                active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
              } relative`}
            >
              <IoMdCheckmark className="text-[25px]" />
              {index !== options.length - 1 && (
                <div
                  className={` absolute h-[30px] w-1 ${
                    active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                  } bottom-[-100%] `}
                >
                 
                </div>
              )}
              
            </div>
            <h5
                    className={` ml-3 ${
                      active === index
                        ? "dark:text-white text-black"
                        : "dark:text-white text-black"
                    } text-base `}
                  >
                    {option}
                  </h5>
          </div>
        );
      })}
    </div>
  );
};

export default CourseOptions;
