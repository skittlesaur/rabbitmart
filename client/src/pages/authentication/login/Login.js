import styles from '../form.module.css';
import {Link, useNavigate} from "react-router-dom";
import Authentication from "../Authentication";
import {useState} from "react";
import Error from "../../../components/feedback/error/Error";
import {authLogin} from "../../../actions/auth";
import {useDispatch} from "react-redux";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    const handleLogin = () => {
        const {email, password} = data;

        if (!email)
            return setError("Enter an email address");

        if (!password)
            return setError("Enter a password");

        if (!validateEmail(email))
            return setError("Enter a valid email address");

        if (password.length < 6)
            return setError("Your password must be at least 6 characters long.");

        const onSuccess = () => {
            navigate('/');
        }

        const onError = (e) => {
            setError(e.message);
        }

        dispatch(authLogin(email, password, onSuccess, onError));
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const form =
        <div className={styles['wrapper']}>
            {error && <Error error={error} setError={setError}/>}
            <div className={styles['header']}>
                <div className={styles['title']}>Login with your email</div>
                <div className={styles['login']}>New to Rabbit Mart? <Link to={'/signup'}>Sign Up</Link></div>
            </div>
            <div className={styles['form']}>
                <input onChange={(e) => handleChange(e)} name={'email'} value={data.email} placeholder={'Email'}
                       type={'email'}/>
                <input onChange={(e) => handleChange(e)} name={'password'} value={data.password}
                       placeholder={'Password'} type={'password'}/>
                <button onClick={handleLogin} className={'btn1'}>Login</button>
            </div>
        </div>

    return <Authentication data={form}/>
}

export default Login;