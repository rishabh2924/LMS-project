import { useState } from 'react';
import { HiUser, HiDocumentText, HiCollection, HiPencilAlt, HiDesktopComputer, HiLightBulb, HiChartBar, HiCog, HiLogout, HiMenuAlt4, HiUserGroup } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';

interface props{
  collapsed:boolean;
  setCollapsed:React.Dispatch<React.SetStateAction<boolean>>
}

const AdminSidebar = ({collapsed, setCollapsed}:props) => {
  

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`h-full fixed top-0 left-0 ${collapsed ? "800px:w-[5%] w-1/5" : "800px:w-[15%] w-1/2"} bg-blue-900 text-white overflow-y-auto  scrollbar-thin  scrollbar-thumb-blue-500 scrollbar-track-transparent  flex flex-col justify-between`}>
      {/* Collapse button */}
      <button  onClick={toggleCollapse} className="py-2 sticky top-0 bg-blue-700 text-white text-center">
        {collapsed ? <HiMenuAlt4 className="w-6 h-6" /> : '<<'}
      </button>

      <div>
        {/* Profile section */}
        <div className="p-4 flex items-center">
          <Image src="/images/profile.webp" alt="Profile" width={40} height={40} className={`rounded-full ${collapsed ? 'hidden' : 'block'}`} />
          <span className={`${collapsed ? 'hidden' : 'block'} ml-2`}>Admin Name</span>
        </div>

        {/* Data section */}
        <div className="p-2">
          <Link href={'/admin/users'}>
          <button className="w-full flex items-center py-2 mb-2 bg-blue-800 text-white rounded">
            <HiUser className="w-6 h-6 mr-2" />
            {!collapsed && <span className="text-sm">Users</span>}
          </button>
          </Link>
          <button className="w-full flex items-center py-2 mb-2 bg-blue-800 text-white rounded">
            <HiDocumentText className="w-6 h-6 mr-2" />
            {!collapsed && <span className="text-sm">Invoices</span>}
          </button>
        </div>

        {/* Content section */}
        <div className="p-2">
          <Link href={'/admin/create-course'}>
          <button className="w-full flex items-center py-2 mb-2 bg-blue-800 text-white rounded">
            <HiPencilAlt className="w-6 h-6 mr-2" />
            {!collapsed && <span className="text-sm">Create Course</span>}
          </button>
          </Link>
          <Link href={'/admin/all-courses'}>
          <button className="w-full flex items-center py-2 mb-2 bg-blue-800 text-white rounded">
            <HiDesktopComputer className="w-6 h-6 mr-2" />
            {!collapsed && <span className="text-sm">Live Course</span>}
          </button>
          </Link>
        </div>

        {/* Management */}
        <div className="p-2">
          <Link href={'/admin/manage-team'}>
          <button className="w-full flex items-center py-2 mb-2 bg-blue-800 text-white rounded">
            <HiUserGroup className="w-6 h-6 mr-2" />
            {!collapsed && <span className="text-sm">Manage Team</span>}
          </button>
          </Link>
          
        </div>

        {/* Custom section */}
        <div className="p-2">
          <Link href={'/admin/hero'}>
          <button className="w-full flex items-center py-2 mb-2 bg-blue-800 text-white rounded">
            <HiLightBulb className="w-6 h-6 mr-2" />
            {!collapsed && <span className="text-sm">Hero</span>}
          </button>
          </Link>
          <Link href={'/admin/faq'}>
          <button className="w-full flex items-center py-2 mb-2 bg-blue-800 text-white rounded">
            <HiDocumentText className="w-6 h-6 mr-2" />
            {!collapsed && <span className="text-sm">FAQ</span>}
          </button>
          </Link>
          <Link href={'/admin/categories'}>
          <button className="w-full flex items-center py-2 mb-2 bg-blue-800 text-white rounded">
            <HiCollection className="w-6 h-6 mr-2" />
            {!collapsed && <span className="text-sm">Categories</span>}
          </button>
          </Link>
        </div>

        {/* Analytics section */}
        <div className="p-2">
          <button className="w-full flex items-center py-2 mb-2 bg-blue-800 text-white rounded">
            <HiChartBar className="w-6 h-6 mr-2" />
            {!collapsed && <span className="text-sm">Courses Analytics</span>}
          </button>
          <button className="w-full flex items-center py-2 mb-2 bg-blue-800 text-white rounded">
            <HiChartBar className="w-6 h-6 mr-2" />
            {!collapsed && <span className="text-sm">Order Analytics</span>}
          </button>
          <button className="w-full flex items-center py-2 mb-2 bg-blue-800 text-white rounded">
            <HiChartBar className="w-6 h-6 mr-2" />
            {!collapsed && <span className="text-sm">User Analytics</span>}
          </button>
        </div>
      </div>

      {/* Settings and Logout */}
      <div className="p-2 mt-20">
        <button className="w-full flex items-center py-2 mb-2 bg-blue-800 text-white rounded">
          <HiCog className="w-6 h-6 mr-2" />
          {!collapsed && <span className="text-sm">Settings</span>}
        </button>
        <button className="w-full flex items-center py-2 mb-2 bg-blue-800 text-white rounded">
          <HiLogout className="w-6 h-6 mr-2" />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
