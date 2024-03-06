import React from "react";
import { styles } from "../../styles/style";
import { IoMdAddCircle } from "react-icons/io";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}: Props) => {
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisiteChange = (index: number, value: string) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisites= () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const handleNext=()=>{
    if(benefits[benefits.length-1]?.title!=="" && prerequisites[prerequisites.length-1]?.title!==""){
      setActive(active+1)
    }
    else{
        toast.error("Please fill all the fields")
    }
  }

  return (
    <div className="w-[80%] m-auto mt-24  block">
      <div className="">
        <label htmlFor="email" className={`${styles.label}`}>
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit, index) => {
          return (
            <input
              type="text"
              key={index}
              name="benefits"
              placeholder="You will be able to build a full stack LMS Platform..."
              className={`${styles.input} my-2`}
              value={benefit.title}
              onChange={(e: any) => {
                handleBenefitChange(index, e.target.value);
              }}
            />
          );
        })}
        <IoMdAddCircle
          style={{ margin: "10px 0px", cursor: "pointer" }}
          className={`dark:text-white w-10`}
          onClick={handleAddBenefits}
        />
      </div>
      <div className="">
        <label htmlFor="email" className={`${styles.label}`}>
          What are the prerequisites for starting this course?
        </label>
        <br />
        {prerequisites.map((prerequisite, index) => {
          return (
            <input
              type="text"
              key={index}
              name="prerequisites"
              placeholder="You need to have basic understanding of ..."
              className={`${styles.input} my-2`}
              value={prerequisite.title}
              onChange={(e: any) => {
                handlePrerequisiteChange(index, e.target.value);
              }}
            />
          );
        })}
        <IoMdAddCircle
          style={{ margin: "10px 0px", cursor: "pointer" }}
          className={`dark:text-white w-10`}
          onClick={handleAddPrerequisites}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer "
        onClick={() => setActive(active - 1)}>
            Previous

        </div>
        <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
        onClick={handleNext}>
            Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
