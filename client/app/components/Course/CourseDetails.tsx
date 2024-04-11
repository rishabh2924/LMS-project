import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { UseSelector } from "react-redux";
import { format } from "timeago.js";
import { styles } from "../styles/style";
import CourseContentList from "./CourseContentList";
import {Elements} from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm"

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
};

const CourseDetails = ({ data, clientSecret, stripePromise }: Props) => {
  console.log(data);

  const user = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);
  const discountPercentage =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);
  const handleOrder = (e: any) => {
    setOpen(true);
  };

  return (
    <div>
      <div className="w-[90%] 800px:w-[80%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-semibold text-black dark:text-white ">
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data.rating} />
                <h5 className="text-black dark:text-white">
                  {data.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {data.purchased} Students
              </h5>
            </div>
            <br />
            <h1 className="text-[25px] font-Poppins font-[600] ☐ text-black dark:text-white">
              What you will learn from this course?
            </h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px: items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
            <br />
            <br />
            <h1 className="text-[25px] font-Poppins font-semibold text-black dark:text-white">
              What are the prereqisite for starting this course?
            </h1>
            {data.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex 800px: items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline
                    size={20}
                    className="text-black dark:text-white"
                  />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
            <br />
            <br />
            <h1 className="text-[25px] font-Poppins font-semibold text-black dark:text-white ">
              Course Overview
            </h1>
            <CourseContentList data={data?.courseData} isDemo={true} />
            <p className="text-lg mt-lg whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
              {data?.description}
            </p>
            <br />
            <br />
            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={data.rating} />
                <div className="mb-2 800px:mb-[unset]"></div>
                <h5 className="text-[25px] font-Poppins  text-black dark:text-white">
                  {Number.isInteger(data?.rating)
                    ? data?.rating.toFixed(1)
                    : data?.rating.toFixed(2)}{" "}
                  Course Rating . {data?.reviews?.length} Reviews
                </h5>
              </div>
              <br />
              {data?.reviews &&
                [...data?.reviews].reverse().map((item: any, index: number) => {
                  return (
                    <div className="w-full pb-4" key={index}>
                      <div className="flex">
                        <div className="w-[50px] h-[50px] ">
                          <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer ">
                            <h1 className="uppercase text-lg text-black dark:text-white">
                              {item.user.name.slice(0, 2)}
                            </h1>
                          </div>
                        </div>
                        <div className="hidden 800px:block pl-2">
                          <div className="flex items-center">
                            <h5 className="text-lg pr-2 text-black dark:text-white">
                              {item.user.name}
                            </h5>
                            <Ratings rating={item.rating} />
                          </div>
                          <p className="text-black dark:text-white">
                            {item.comment}
                          </p>
                          <small className="text-black dark:text-white">
                            {format(item.createdAt)}.
                          </small>
                        </div>
                        <div className="pl-2 felx 800px:hidden items-center">
                          <h5 className="pl-2 flex 800px:hidden items-center">
                            <Ratings rating={item.rating} />
                          </h5>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>{" "}
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full ">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="w-full 800px:w-[35%] relative">
                <div className="flex items-center">
                  <h1 className="pt-5 text-[25px]  text-black dark:text-white">
                    {data.price === 0 ? "Free" : data.price + "$"}
                  </h1>
                  <h5 className="pl-3 text-xl mt-2 line-through opacity-80 text-black dark:text-white">
                    {data.estimatedPrice + "$"}
                  </h5>
                  <h4 className="pl-5 pt-4 text-2xl text-black dark:text-white ">
                    {discountPercentagePrice + "% off"}
                  </h4>
                </div>
                <div className="flex items-center">
                  {isPurchased ? (
                    <Link
                      className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson] `}
                      href={`/course-access/${data._id}`}
                    >
                      Enter to Course
                    </Link>
                  ) : (
                    <div
                      className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson] `}
                      onClick={handleOrder}
                    >
                      Buy Now {data.price === 0 ? "Free" : data.price + "$"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className="w-full h-screen bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-50 flex items-center justify-center ">
            <div className="w-[500px] min-h-[500px]  bg-white rounded-xl shadow p-3">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className=" text-black cursor-pointer "
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
                {
                  stripePromise && clientSecret && (
                    <Elements stripe={stripePromise} options={{clientSecret}}>
                      <CheckOutForm setOpen={setOpen} data={data}/>
                    </Elements>
                  )
                }
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
