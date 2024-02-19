"use client";
import Link from "next/link";
import React, { FC, useState } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModel from "../utils/CustomModel";
import Login from "../components/auth/Login"
import SignUp from "../components/auth/SignUp"
import Verification from "../components/auth/Verification"

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({open, activeItem, setOpen,route,setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  if (typeof window !== "undefined") {
    window.onscroll = () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
  }
  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500 "
            : " w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full ">
          <div className="w-full h-[80px]  flex items-center justify-between py-3">
            <Link
              href={"/"}
              className={`text-[25px] font-Poppins font-medium text-black dark:text-white`}
            >
              ECademy
            </Link>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* only for mobile */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(!openSidebar)}
                />
              </div>
              <HiOutlineUserCircle
                size={25}
                className="hidden 800px:block cursor-pointer dark:text-white text-black "
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>
        {/* Mobile sidebar */}
        {openSidebar && (
          <div
            className="fixed top-0 left-0 w-full h-screen dark:bg-[unset] bg-[#00000024] z-[9999]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                onClick={() => setOpen(true)}
              />
              <br/>
              <br />
              <p className="text-md px-2 pl-5 text-black dark:text-white">
                Copyrifght © 2024. All rights reserved.
              </p>
            </div>
          </div>
        )}
      </div>
      {route==="Login" && (
        <>
        {
          open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              Component={Login}
            />
          )
        }
        </>
  )}
      {route==="sign-up" && (
        <>
        {
          open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              Component={SignUp}
            />
          )
        }
        </>
  )}
      {route==="verification" && (
        <>
        {
          open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              Component={Verification}
            />
          )
        }
        </>
  )}
    </div>
  );
};

export default Header;
