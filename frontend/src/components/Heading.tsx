import { Link } from "react-router-dom";
interface HeadingProps{
    message:string;
    functionality:string;
}

export const Heading = (props:HeadingProps) => {
    return(
        <div className=" flex flex-row text-2xl">
            <h1 className=" pr-4">{props.message}</h1>
            <Link className="underline hover:text-blue-500" to={props.functionality === "signin" ? "/signin" : "/signup"}>
      {props.functionality}
    </Link>
        </div>
    )
}