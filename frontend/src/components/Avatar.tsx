import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { OverlayAvatar } from "./OverlayAvatar";

interface AvatarProps {
    username: string;
    size: "small" | "medium" | "large";
    public?: boolean | false;
    link?: boolean | true;
}

export const Avatar = ({ username, size, public: isPublic = false, link = true }: AvatarProps) => {
    let w;
    let h;
    let text;

    if (size === "small") {
        w = "w-6";
        h = "h-6";
        text = "text-base";
    } else if (size === "medium") {
        w = "w-10";
        h = "h-10";
        text = "text-xl";
    } else {
        w = "w-16";
        h = "h-16";
        text = "text-3xl";
    }
    // console.log(username);

  // Fetch notifications from the provided URL (implement fetch logic as needed)
  const notifications = []; // Replace with actual fetched notifications


    // Handle click outside of the notification panel

    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const toggleOverlay = () => {
      setIsOverlayVisible(!isOverlayVisible);
    };
    const urls={
        profile:`/${username}/profile`,
        editProfile:`/profile/${username}/edit`
    }

    const avatarContent = (
        <div className={`flex flex-col justify-center bg-slate-600 pb-0.5 ${w} ${h} border rounded-md border-white bg-gray-700`}>
            <div className="flex flex-row justify-center w-full">
                <div className="relative inline-flex items-center justify-center overflow-hidden">
                    <div className={` ${text} text-white dark:text-gray-300 w-full justify-center`}>{username.slice(0, 2)}</div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {isPublic==false ? <button onClick={toggleOverlay}>
                {avatarContent}
            </button>:<div>
            {link ? (
                        <Link to={isPublic ? `/public/${username}` : `/${username}/profile`} className="">
                            {avatarContent}
                        </Link>
                    ) : (
                        avatarContent
                    )}
                </div>}

                {isPublic==false && (isOverlayVisible) &&  (
                <OverlayAvatar onClose={toggleOverlay} urls={urls} />
                )}
        </div>
    );
};



