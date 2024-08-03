import { Link } from "react-router-dom";
interface HeadingProps{
    message:string;
    functionality:string;
}

export const Heading = (props:HeadingProps) => {
    return(
        <div className=" flex flex-row text-xl">
            <div className=" flex flex-row justify-center items-center">
            <h1 className=" pr-1 text-sky-700 font-extralight">{props.message}</h1>
            </div>
            <div className=" flex flex-col justify-center text-sky-700">
            <Link className="underline hover:text-blue-500" to={props.functionality === "signin" ? "/signin" : "/signup"}>
      {props.functionality}
    </Link>
            </div>
        </div>
    )
}