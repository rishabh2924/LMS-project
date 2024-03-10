"use client";
import AllCourses from "@/app/components/Admin/course/AllCourses";
import AdminProtected from "@/app/hooks/useAdminProtected";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    //<AdminProtected>
      <div>
        <AllCourses/>
      </div>
    //</AdminProtected>
  );
};

export default page;
