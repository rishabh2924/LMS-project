// components/ChangePassword.tsx

import {  useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

type Props={
    setActive:(active:number)=>void;
}

const ChangePassword: React.FC<Props>= ({setActive}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [updatePassword,{isSuccess,error}] = useUpdatePasswordMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
    setState(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate and submit form
    if (newPassword === confirmPassword) {
       try {
        await updatePassword({newPassword,oldPassword})
        toast.success("Password updated successfully")
        setActive(1);
        
       } catch (error) {
        console.log(error);
        
       }
    } else {
      toast.error("passwords don't match");
    }
  };

  return (
    <div className="max-w-md h-[450px]  mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="old-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Old Password</label>
          <input
            type="password"
            id="old-password"
            value={oldPassword}
            onChange={(e) => handleChange(e, setOldPassword)}
            className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => handleChange(e, setNewPassword)}
            className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => handleChange(e, setConfirmPassword)}
            className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md w-full"
            required
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

export default ChangePassword;
