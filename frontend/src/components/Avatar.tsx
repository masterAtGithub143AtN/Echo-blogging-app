import { Link } from "react-router-dom"

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
    console.log(username);
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
            {link ? (
                <Link to={isPublic ? `/public/${username}` : `/${username}/profile`} className="">
                    {avatarContent}
                </Link>
            ) : (
                avatarContent
            )}
        </div>
    );
};
