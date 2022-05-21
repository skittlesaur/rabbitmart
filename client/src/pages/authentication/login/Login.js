import styles from '../form.module.css';
import {Link} from "react-router-dom";
import Authentication from "../Authentication";

const Login = () => {
    const form =
        <div className={styles['wrapper']}>
            <div className={styles['header']}>
                <div className={styles['title']}>Login with your email</div>
                <div className={styles['login']}>New to Rabbit Mart? <Link to={'/signup'}>Sign Up</Link></div>
            </div>
            <div className={styles['form']}>
                <input placeholder={'Email'}/>
                <input placeholder={'Password'} type={'password'}/>
                <button className={'btn1'}>Login</button>
            </div>
        </div>

    return <Authentication data={form}/>
}

export default Login;