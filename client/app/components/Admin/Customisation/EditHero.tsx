"use client";
import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layout.Api";
import { log } from "console";
import React, { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "../../styles/style";
import toast from "react-hot-toast";
import { AnyAaaaRecord } from "dns";

type Props = {};

const EditHero = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout,{isLoading,isSuccess,error}]= useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title);
      setSubTitle(data?.layout?.banner?.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }

    if (isSuccess) {
        refetch();
        toast.success("Hero  updated successfully")
    }
    if(error){
        if('data' in error){
            const errorData = error as any;
            toast.error(errorData?.data?.message)
        }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      if (reader.readyState === 2) {
          setImage(e.target.result as string);
      }
    }
    reader.readAsDataURL(file);

  };
  const handleEdit = async () => {

    await editLayout({type:"Banner",image,title,subTitle})
  };
  return (
    <>
      <div className="w-full flex items-center">
        <div className=" absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[500px] 1100px:w-[500px]    "></div>
        <div className="1000px:w-[50%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] ">
          <div className="relative flex items-center justify-end">
            <img
              src={image}
              className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-auto z-[10] "
            />
            <input
              type="file"
              name=""
              id="banner"
              accept="image/*"
              className="hidden"
              onChange={handleUpdate}
            />
            <label htmlFor="banner" className="absolute bottom-0 right-0 z-20 ">
              <AiOutlineCamera className=" dark:text-white text-black text-lg cursor-pointer " />
            </label>
          </div>
        </div>
        <div className="1000px:w-[50%] flex flex-col items-center 1000px:mt-0 text-center 1000px:text-left mt-[150px] ">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="dark:text-white resize-none text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[60px] 1500px:text-[70px] font-Poppins border-none bg-transparent  outline-none"
            rows={2}
          />
          <textarea
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className="dark:text-white resize-none text-[#000000c7] text-xl px-3 w-full   font-Poppins border-none bg-transparent  outline-none"
            rows={4}
          />
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]
${
  data?.layout?.banner?.title !== title ||
  data?.layout?.banner?.subTitle !== subTitle ||
  data?.layout?.banner?.image?.url !== image
    ? "!cursor-pointer !bg-[#42d383] "
    : "!cursor-not-allowed"
}
!rounded absolute bottom-12 right-12 `}
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? handleEdit
                : () => null
            }
          >
            Save
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
