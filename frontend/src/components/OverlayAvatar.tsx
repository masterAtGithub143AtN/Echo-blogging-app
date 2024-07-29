import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';


interface AvatarProps {
  onClose: () => void;
  urls: {
    profile: string;
    editProfile: string;
  };
}

export const OverlayAvatar: React.FC<AvatarProps> = ({ onClose, urls }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const history = useNavigate();

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

  const handleSignOut = () => {
    localStorage.clear();
    history('/');
  };

  return (
    <div className="fixed inset-0 bg-transparent flex justify-end items-start rounded-3xl shadow-xl">
      <div
        ref={overlayRef}
        className="flex flex-col justify-center bg-gray-200 p-3 rounded-xl relative w-1/3 xl:w-1/6 max-w-md mt-20 mr-1"
      >
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          &times;
        </button>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col justify-center">
            <Link to={urls.profile}>
              <div className="">Profile</div>
            </Link>
            <Link to={urls.editProfile}>
              <div className="pt-1">Edit Profile</div>
            </Link>
            <button onClick={handleSignOut}>
              <div className="pt-1">Sign Out</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
