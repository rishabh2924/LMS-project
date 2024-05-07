import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import { useEffect, useState } from "react";
import { HiBell } from "react-icons/hi";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardHeader: React.FC = () => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState<any>([]);
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/do1ocezun/video/upload/v1715054733/LMS/gu2zytzxgwssokabdbh9.wav"
    )
  );

  const playerNotificationSound = () => {
    audio.play();
  };
  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  useEffect(() => {
    if (data) {
      setNotification(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess, refetch]);

  useEffect(() => {
    const playerNotificationSound = () => {
      audio.play();
    };
    socketId.on("newNotification", (data: any) => {
      refetch();
      playerNotificationSound();
    });
  }, [playerNotificationSound, refetch]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="flex w-full justify-end items-center px-4 py-4 border-b ">
      <div className="w-full bg-gray-100 opacity-50" onClick={ toggleNotification}></div>
      <ThemeSwitcher />
      <button onClick={toggleNotification}>
        <HiBell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        <span className="absolute top-5 right-5 bg-[#3ccba0] text-red-500 text-xs w-4 h-4 rounded-full flex justify-center items-center">
          {notification && notification.length}
        </span>
      </button>
      {showNotification && (
        <div className="absolute right-0 top-10 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-10">
          {/* Notification content */}
          {notification &&
            notification.map((item: any, index: number) => (
              <>
                <div className="dark:bg-[#2d3a4e] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
                  <div className="w-full flex items-center justify-between p-2">
                    <p className="text-black dark:text-white">{item.title}</p>
                    <p className="text-black dark:text-white cursor-pointer"
                    onClick={() => handleNotificationStatusChange(item._id)}>
                      Mark as read
                    </p>
                  </div>
                  <p className="px-2 text-black dark:text-white">
                    {item.message}
                  </p>
                  <p className="p-2 text-black dark:text-white text-[14px]">
                    {format(item.createdAt)}
                  </p>
                </div>
              </>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
