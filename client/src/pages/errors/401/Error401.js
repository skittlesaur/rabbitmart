import Main from "../main/Main";
import {Link} from "react-router-dom";

const Error401 = () => {
    const user = !!localStorage.getItem('profile');
    const message =
        <>
            {
                user? <>This may have occurred because you don't have permission to view requested page. <Link to={"/"}>Go to Home</Link></>:
                    <>This may have occurred because you are not logged in. Try <Link to={'/login'}>Logging in</Link></>
            }
        </>
    return <Main code={401} message={message}/>
}

export default Error401;