import { useGetUserAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import {
  useGetAllCoursesQuery,
  useGetUsersAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layout.Api";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Header from "../Header";
import Heading from "@/app/utils/Heading";
import { styles } from "../styles/style";
import CourseCard from "./courseCard";

type Props = {};

const CoursePage = (props: Props) => {
  const searchParamas = useSearchParams();
  const search = searchParamas?.get("title");
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.courses);
    }
    if (category !== "All") {
      setCourses(
        data?.courses.filter((item: any) =>
          item.name.toLowerCase().includes(search?.toLowerCase())
        )
      );
    }
    if(search){
        setCourses(data?.courses.filter((item: any) => item.name.toLowerCase().includes(search?.toLowerCase())))
    }
  }, [data, category, search]);

  const categories = categoriesData?.layout?.categories;

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <div className="w-[90%] 800px:w-[85%] m-auto min-h-[70vh]">
            <Heading
              title="All courses - Elearning"
              description="Elearning is a programming community"
              keywords="programming community , coding skills , expert insights , collabration, growth"
            />

            <br />
            <div className="w-full flex items-center flex-wrap">
              <div
                className={`h-[35px] ${
                  category === "All" ? " bg-[crimson]" : "bg-[#5050cb]"
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer `}
                onClick={() => setCategory("All")}
              >
                All
              </div>
              {categories &&
                categories.map((item: any, index: number) => (
                  <>
                    <div className="" key={index}>
                      <div
                        className={`h-[35px] ${
                          category === item.title
                            ? " bg-[crimson]"
                            : "bg-[#5050cb]"
                        } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer `}
                        onClick={() => setCategory(item.title)}
                      >
                        {item.title}
                      </div>
                    </div>
                  </>
                ))}
            </div>
            {
                courses && courses.length===0 && (
                    <p className={`${styles.label} justify-center min-h-[50vh] flex items-center `}>
                        {search?"No courses found":"No courses found in this category . Please try another one !"}
                    </p>
                )
            }
            <br />
            <br />
            <div className="grid grid-cols-1 gap5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard key={index} item={item} />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursePage;
