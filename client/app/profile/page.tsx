"use client";
import React, { useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);



  return (
    <div>
      <Protected>
        <div className="">
          <Heading
            title={`${user ? user.name : "Profile"} profile`}
            description="Online learning platform"
            keywords="elearning,MERN,Programing, learning, online"
          />
          <Header
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
            activeItem={activeItem}
          />
          <Profile user={user} />
        </div>
      </Protected>
    </div>
  );
};

export default Page;
