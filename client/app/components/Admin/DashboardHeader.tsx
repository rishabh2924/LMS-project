import { ThemeSwitcher } from '@/app/utils/ThemeSwitcher';
import { useState } from 'react';
import { HiBell } from 'react-icons/hi';

const DashboardHeader: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  return (
    <div className="flex justify-end items-center px-4 py-4 border-b ">
        <ThemeSwitcher/>
      <button onClick={toggleNotification}>
        <HiBell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>
      {showNotification && (
        <div className="absolute right-0 mt-20 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-10">
          {/* Notification content */}
          <div className="p-4">You have a new notification!</div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
