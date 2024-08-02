import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { decodedTokenType } from '../pages/PublicProfile';
import { jwtDecode } from 'jwt-decode';


interface AvatarProps {
  onClose: () => void;
  urls: {
    profile: string;
    editProfile: string;
  };
}

export const OverlayAvatar: React.FC<AvatarProps> = ({ onClose, urls }) => {
  const history = useNavigate();
  const token=localStorage.getItem("token");
  if(token===null){
    return <>
    <div>
      <div className=" flex flex-col justify-center  h-screen">
          <div className=" flex flex-row justify-center text-green-200">
              <div className=" text-2xl font-semibold ">

              <div>
                  <div>Please sign in to view this page</div>
                  <Link to={"/signin"}>
                  <div className=" text-2xl">Click</div>
                  </Link>
                  <div>Here to signin</div>
              </div>
              </div>
          </div>
      </div>
    </div>
    </>
  }
  const userData:decodedTokenType=jwtDecode(token);
  
  // Handle click outside of the notification panel
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleScroll = () => {
      onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
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
        className="flex flex-col justify-center bg-slate-600 p-3 rounded-xl relative w-40 mt-17"
      >
        <button className="absolute top-2 right-2 text-slate-50" onClick={onClose}>
          &times;
        </button>
        <div className="flex flex-row justify-center text-slate-100">
          <div className="flex flex-col justify-center">
            <Link to={urls.profile}>
              <div className=" flex flex-row justify-center">Profile</div>
            </Link>
            <Link to={urls.editProfile}>
              <div className=" flex flex-row justify-center items-center">Edit Profile</div>
            </Link>
            <Link to={`/${userData.username}/changepassword`}>
            <div className=' items-center'>Change Password</div>
            </Link>
            <button onClick={handleSignOut}>
              <div className="items-center">Sign Out</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
