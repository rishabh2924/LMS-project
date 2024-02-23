// pages/ProfileInfo.tsx

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';

const ProfileInfo: React.FC = () => {
  const [name, setName] = useState('John Doe');
  const [email] = useState('john@example.com'); // Email is read-only
  const [loadUser,setLoadUser]=useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [updateAvatar,{isSuccess,error}]= useUpdateAvatarMutation();

  const {} = useLoadUserQuery(undefined,{skip:!loadUser?true:false})


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.readyState===2){
            const avatar=reader.result
            updateAvatar(avatar)
            setProfilePic(reader.result as string);
        }
        
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if(isSuccess){
        setLoadUser(true)
    }
    if(error){
        console.log(error);
        
    }
  },[isSuccess])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission, e.g., update name and profile picture
    console.log('Updated name:', name);
    console.log('Updated profile picture:', profilePic);
  };

  return (
    <div className="max-w-md h-[450px] mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <label htmlFor="profile-pic" className="relative cursor-pointer">
          <Image
            src={profilePic || '/images/Profile.webp'} // Use profile picture if available, otherwise default profile image
            alt="Profile Image"
            className="w-16 h-16 rounded-full mr-4"
            width={64}
            height={64}
          />
          <input
            type="file"
            id="profile-pic"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePicChange}
          />
          <div className="absolute bottom-0 right-0 bg-white rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </label>
        <div>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="text-xl font-bold mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1"
          />
          <p className="text-gray-600">{email}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            readOnly
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfileInfo;
