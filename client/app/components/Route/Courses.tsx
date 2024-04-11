import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from 'react'
import CourseCard from "../Course/courseCard";


type Props = {}

const Courses = (props: Props) => {
    const { data, isLoading } = useGetAllCoursesQuery({});
    const [courses,setCourses]= useState<any>([]);

    useEffect(()=>{
        setCourses(data?.courses)
    },[data])





  return (
    <div >
        <div className="w-[90%] 800px:w-[80%] m-auto">
            <h1 className=" mt-5 text-center font-Poppins-SemiBold text-[25px] 800px:text-[40px] dark:text-white">
                Expand your career 
                <span className="text-gradient"> Opportunity</span>
                <br />
                Opportunity With Our Courses

            </h1>
            <br />
            <br />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6 1500px:grid-cols-4 1500px:gap-9 mb-12 border-0">
                {courses && courses.map((item:any, index:number)=>
                   
                   
                    
                     <CourseCard item={item} key={index} />
                )}
            </div>
        </div>
    </div>
  )
}

export default Courses