
import { Link } from 'react-router-dom';
import { Avatar } from './Avatar';
import Notification from './Notification';
import SearchForm from "./SearchForm";
import { useEffect, useRef, useState } from 'react';

interface AppBarProps {
    imageUrl?: string | "";
    userData?: {
        username?: string | "";
        name?: string | "";
    }
    fromwhere?: string | "";
    public?: boolean | false;
    loggedIn?: boolean | true;
}

export const AppBar = (props: AppBarProps) => {
    const URL_FOR_Notification = "/notification";
const [isMenuOpen, setIsMenuOpen] = useState(false);
const menuRef = useRef<HTMLDivElement>(null);

const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
};

const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
    }
};

const handleScroll = () => {
    setIsMenuOpen(false);
};

useEffect(() => {
    if (isMenuOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);
    } else {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('scroll', handleScroll);
    }

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('scroll', handleScroll);
    };
}, [isMenuOpen]);
    return (
        <div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 shadow-xl bg-gradient-to-r from-gray-400 to-slate-600 bg-writing-pattern rounded-md">
                <div className="grid grid-cols-2">
                    <div className='grid grid-cols-3'>
                        <div className='grid col-span-1 sm:hidden '>
                            <div className=' flex flex-col justify-center items-center mt-1'>
                                <button
                                    type="button"
                                    className=""
                                    aria-controls="navbar-hamburger"
                                    aria-expanded={isMenuOpen}
                                    onClick={toggleMenu}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 17 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 1h15M1 7h15M1 13h15"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className='grid items-center sm:col-span-full'>
                            <div className="flex flex-col justify-center  text-4xl font-semibold h-full">
                                <div className='flex flex-row justify-center items-center'>
                                    <Link to={(props.loggedIn && props.userData) ? `/blog/${props.userData.username}` : `/`} state={props.userData}>
                                        <div className='flex flex-col justify-center items-center'>
                                            <h1 className="flex flex-row justify-center items-center text-slate-50">Echo</h1>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center w-full pr-2 text-slate-50">
                        <SearchForm />
                    </div>
                </div>
                <div className="hidden sm:grid sm:grid-cols-7 sm:space-x-4">
                    <div className="col-span-2"></div>
                    <div className="flex justify-center px-4 col-span-3">
                        {props.fromwhere !== "Blogwriting" ? (
                            <Link to={(props.userData) ? `/blog/${props.userData.username}/write` : `/signin`} className="flex justify-center w-max" state={props.userData}>
                                <div className="flex justify-center items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        data-name="Layer 1"
                                        viewBox="0 0 112.83 122.88"
                                        className="w-8 h-8 fill-current text-white"
                                    >
                                        <path
                                            d="m103.3 34.19 8.23 3.52a2.15 2.15 0 0 1 1.13 2.82l-2 4.56-12.13-5.21 2-4.56a2.15 2.15 0 0 1 2.82-1.13ZM8.88 7.88h8.19V2.73a2.74 2.74 0 0 1 5.47 0v5.15h12V2.73a2.73 2.73 0 1 1 5.46 0v5.15h12V2.73a2.73 2.73 0 0 1 5.46 0v5.15h12V2.73a2.73 2.73 0 0 1 5.46 0v5.15h9.27a8.91 8.91 0 0 1 8.88 8.88v11.78a12.27 12.27 0 0 0-1.76 2.9l-2 4.56a10 10 0 0 0-.31 1.16 11.24 11.24 0 0 0-.58 1.15l-.6 1.4V16.76a3.6 3.6 0 0 0-3.58-3.58H75v5.15a2.73 2.73 0 0 1-5.46 0v-5.15h-12v5.15a2.73 2.73 0 0 1-5.46 0v-5.15H40v5.15a2.73 2.73 0 1 1-5.46 0v-5.15h-12v5.15a2.74 2.74 0 0 1-5.47 0v-5.15H8.88a3.58 3.58 0 0 0-3.58 3.58v92a3.6 3.6 0 0 0 3.58 3.59h50.28l.56 5.29H8.88A8.89 8.89 0 0 1 0 108.77v-92a8.91 8.91 0 0 1 8.88-8.89Zm11.46 86.47a2.65 2.65 0 0 1 0-5.3h46.38l-2.27 5.3Zm0-17.48a2.65 2.65 0 0 1 0-5.3h52.44a2.52 2.52 0 0 1 1.27.35l-2.12 5Zm0-17.48a2.65 2.65 0 0 1 0-5.3h52.44a2.65 2.65 0 0 1 0 5.3Zm0-17.48a2.65 2.65 0 0 1 0-5.3h52.44a2.65 2.65 0 0 1 0 5.3ZM81 114.6l-6.19 5c-4.85 3.92-4.36 5.06-5-.88l-1-9.34 28.73-67.2 12.18 5.22L81 114.6Zm-10.09-4.31 8 3.42-4.09 3.29c-3.19 2.58-2.87 3.32-3.28-.57l-.66-6.14Z"
                                            style={{ fillRule: 'evenodd' }}
                                        />
                                    </svg>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="text-sm lg:text-base text-slate-50">Write A Blog</div>
                                </div>
                            </Link>
                        ) : (
                            <></>
                        )}
                    </div>

                    {(props.loggedIn || props.loggedIn === undefined) ? (
                        <div className='flex col-span-2'>
                            <div className='flex flex-row justify-center'>
                                <div className='flex flex-col justify-center'>
                                    <div className='flex flex-row mt-2'>
                                        <div className="flex flex-col justify-center md:mr-2 lg:mr-5">
                                            <Notification messageCount={0} url={URL_FOR_Notification} />
                                        </div>
                                        <div className="flex flex-col items-center md:ml-2 lg:ml-5">
                                            <div className='flex w-full'>
                                                {props.userData?.username ? <Avatar size="medium" username={props.userData.username} public={props.public} /> : <></>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='h-full'>
                            <div className="flex flex-col justify-center col-span-1 h-full">
                                <Link to="/signin">
                                    <div className="flex justify-center w-full h-full">
                                        <button className="bg-gradient-to-r from-gray-600 to bg-slate-700 text-white p-2 rounded-lg mt-3">Sign In</button>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex flex-col justify-center col-span-1">
                                <div className='flex justify-center w-full'></div>
                            </div>
                        </div>
                    )}
                </div>
                <div className='h-3 shadow-md'>
                </div>
            </div>
            <div className=' sm:hidden'>
                {(props.loggedIn || props.loggedIn===undefined)?<div>{isMenuOpen && (
                    <div className="fixed inset-0 z-10 flex justify-start">
                        <div
                            ref={menuRef}
                            className="relative w-36 h-36 items-center overflow-y-auto bg-gradient-to-r from-gray-400 to-custom-gray  rounded-b-md rounded-tr-md text-slate-950 font-medium ml-1 mt-17"
                        >
                            <div className="absolute left-4 top-[-8px] w-0 h-0 "></div>
                            <div className="px-1 pb-3 pt-1 text-slate-50 flex flex-row justify-center">
                                <ul>
                                    <li>
                                        <Link
                                            to={`/blog/${props.userData?.username}/write`} state={props.userData}
                                            className="flex flex-row justify-center"
                                            aria-current="page"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Write A Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={`/${props.userData?.username}/profile`} state={props.userData}
                                            className="flex flex-row justify-center"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={`/profile/${props.userData?.username}/edit`} state={props.userData}
                                            className="flex flex-row justify-center"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Edit Profile
                                        </Link>
                                    </li>
                                    <li className=''>
                                        <Link
                                            to={`/profile/${props.userData?.username}/edit`} state={props.userData}
                                            className="flex flex-row justify-center "
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Change Password
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={`/`} state={props.userData}
                                            className="flex flex-row justify-center"
                                            onClick={() =>{
                                                localStorage.clear();
                                            }}
                                        >
                                            SignOut
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}</div>:<div>
                    <div>{isMenuOpen && (
                    <div className="fixed inset-0 z-10 flex justify-start">
                        <div
                            ref={menuRef}
                            className="relative w-28 h-20 items-center overflow-y-auto bg-gray-400 border-l rounded-lg text-slate-950 font-medium ml-1 mt-17"
                        >
                            <div className="absolute items-center left-4 top-[-8px] w-0 h-0 border-l-8 border-l-transparent border-b-8 border-b-slate-100 border-r-8 border-r-transparent"></div>
                            <div className="p-4 items-center">
                                <ul>
                                    <li>
                                        <Link
                                            to={`/signin`} state={props.userData}
                                            className="block px-1 py-2 items-center text-slate-50"
                                            aria-current="page"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            SignIn
                                        </Link>
                                        </li>
                                     </ul>
                                </div>
                            </div>
                    </div>
                      )}
                </div>
                    </div>}
            </div>
        </div>
    );
};












