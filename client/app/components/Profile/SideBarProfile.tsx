import Image from "next/image";
import React from "react";
import Profile from "../../../public/images/Profile.webp";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";

type Props = {
  user: any;
  active: number;
  setActive: (active: number) => void;
  avatar: string | null;
  logOutHandler: () => void;
};

const SideBarProfile = ({
  user,
  active,
  setActive,
  avatar,
  logOutHandler,
}: Props) => {
  return (
    <div className=" m-1 border dark:border-slate-800 rounded-lg ">
      <div
        className={`w-full flex items-center  py-4 cursor-pointer 
    ${active === 1 ? "dark:bg-slate-800 bg-[#e8e8e8]" : "bg-transparent"}`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user.avatar || avatar ? user.avatar.url || avatar : Profile}
          alt=""
          width={30}
          height={30}
          className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
        />
        <h5 className="pl-2 800px:block hidden font-Poppins text-gray-600 dark:text-white ">
          My Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3  py-4 cursor-pointer 
    ${active === 2 ? "dark:bg-slate-800 bg-[#e8e8e8]" : "bg-transparent"}`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} fill={`${"purple"}`} />
        <h5 className="pl-2 800px:block hidden font-Poppins text-gray-600 dark:text-white">
          {" "}
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3  py-4 cursor-pointer 
    ${active === 3 ? "dark:bg-slate-800 bg-[#e8e8e8]" : "bg-transparent"}`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} fill={`${"purple"}`} />
        <h5 className="pl-2 800px:block hidden font-Poppins text-gray-600 dark:text-white">
          {" "}
          Enrolled Courses
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3  py-4 cursor-pointer 
    ${active === 4 ? "dark:bg-slate-800 bg-[#e8e8e8]" : "bg-transparent"}`}
        onClick={logOutHandler}
      >
        <AiOutlineLogout size={20} fill={`${"purple"}`} />
        <h5 className="pl-2 800px:block hidden font-Poppins text-gray-600 dark:text-white">
          {" "}
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
