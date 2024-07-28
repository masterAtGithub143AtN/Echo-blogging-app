import React, { useEffect, useRef } from 'react';

interface NotificationOverlayProps {
  onClose: () => void;
  url: string;
}

const NotificationOverlay: React.FC<NotificationOverlayProps> = ({ onClose}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Fetch notifications from the provided URL (implement fetch logic as needed)
  const notifications = []; // Replace with actual fetched notifications

  // Handle click outside of the notification panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-transparent flex justify-end items-start rounded-3xl shadow-xl">
      <div ref={overlayRef} className="bg-gray-200 p-6 rounded-xl relative w-1/3 xl:w-1/4 max-w-md mt-20 mr-1">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 pt-2">Notifications</h2>
        {notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          <ul>
            {/* {notifications.map((notification, index) => (
              <li key={index} className="mb-2">
                {notification}
              </li>
            ))} */}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationOverlay;
