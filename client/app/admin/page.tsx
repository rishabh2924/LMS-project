"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminProtected from "../hooks/useAdminProtected";
import DashboardHero from "../components/Admin/DashboardHero";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      {/* <AdminProtected> */}
        <Heading
          title="Admin"
          description="Admin dashboard"
          keywords="elearning,MERN,Programing, learning, online"
        />
        <DashboardHero isDashboard={true}/>
        
      {/* </AdminProtected> */}
    </div>
  );
};

export default page;
