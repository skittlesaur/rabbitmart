import {Link} from "react-router-dom";
import Main from "../main/Main";

const Error404 = () => {
    const message =
        <>
            Requested page doesn't exist or is unavailable. <Link to={'/'}>Go back to Home</Link>
        </>
    return <Main code={404} message={message}/>
}

export default Error404;