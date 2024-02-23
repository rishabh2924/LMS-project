import React, { FC, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import ProfileInfo from './ProfileInfo'


type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const {}= useLogOutQuery(undefined,{skip:!logout?true:false})

  const logOutHandler = async () => {
    setLogout(true);
     await signOut();
    

  };


  return (
    <div className="w-[85%] h-screen flex mx-auto">
      <div
        className={`w-[310px] 800px:w-[600px] h-[450px] dark:bg-slate-900  bg-white bg-opacity-90 border border-black  rounded-lg shadow-xl dark:shadow-sm mt-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
        
      </div>
      {active=== 1 && (
          <ProfileInfo/>
        )}
    </div>
  );
};

export default Profile;
