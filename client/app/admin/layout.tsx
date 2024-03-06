'use client'
import { useState } from "react";
import AdminSidebar from "../components/Admin/AdminSidebar"
import DashboardHeader from "../components/Admin/DashboardHeader";

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="flex h-full">
        <div className={` ${collapsed ? "800px:w-[5%] w-1/5" : "800px:w-[15%] w-1/2"}   h-full`}>
          <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
        <div className={`${collapsed ? "800px:w-[95%] w-4/5" : "800px:w-[85%] w-1/2"} h-screen overflow-auto `}>
            <DashboardHeader/>
          {children}
        </div>
      </div>
    )
  }