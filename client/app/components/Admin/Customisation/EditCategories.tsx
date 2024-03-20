import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layout.Api";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "../../styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
    if (layoutSuccess) {
      toast.success("Categories updated successfully");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error]);

  const handleCategoriesAdd= (id:any,value:string)=>{
    setCategories((prev:any)=>prev.map((item:any)=>item._id === id ? {...item,title:value} : item))
  }

  const newCategoriesHandler= ()=>{
    if(categories[categories.length-1].title===""){
        toast.error("Catergory title cannot be empty")
    }else{
        setCategories((prev:any)=>[...prev,{title:""}])
    }
  }

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryEmpty = (category: any[]) => {
    return category.some((item: any) => item.title === "");
  };

  const handleEdit= async ()=>{
        if(!areCategoriesUnchanged(data?.layout?.categories,categories )){
            await editLayout({
                type:"Categories",categories:categories})
        }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="text-center">
          <h1 className={`${styles.title}`}> All Categories</h1>
          {categories.map((item: any, index: number) => {
            return (
              <div className="p-3" key={index}>
                <div className="flex items-center w-full justify-center">
                  <input
                    type="text"
                    className={`${styles.input} !w-[unset] !border-none !text-xl `}
                    value={item.title}
                    onChange={(e) =>
                      handleCategoriesAdd(item._id, e.target.value)
                    }
                    placeholder="Enter category title..."
                  />
                  <AiOutlineDelete
                    className="dark:text-white text-black text-lg cursor-pointer"
                    onClick={() => {
                      setCategories((prev: any) =>
                        prev.filter((item: any) => item._id !== item._id)
                      );
                    }}
                  />
                </div>
              </div>
            );
          })}
          <br />
          <br />
          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline className="dark:text-white text-black text-[25px] cursor-pointer "
            onClick={newCategoriesHandler}/>
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-40px  dark:text-white text-black bg-[#cccccc34]
       ${
         areCategoriesUnchanged(data?.layout?.categories, categories) ||
         isAnyCategoryEmpty(categories)
           ? "!cursor-not-allowed"
           : "!cursor-pointer !bg-[#42d383]"
       }  !rounded absolute bottom-12 right-12`}
            onClick={
              areCategoriesUnchanged(data?.layout?.categories, categories) ||
              isAnyCategoryEmpty(categories)
                ? () => {}
                : handleEdit
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
