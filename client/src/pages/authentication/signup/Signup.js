import styles from '../form.module.css';
import Authentication from "../Authentication";
import {Link} from "react-router-dom";

const Signup = () => {
    const form =
        <div className={styles['wrapper']}>
            <div className={styles['header']}>
                <div className={styles['title']}>Sign up with your email</div>
                <div className={styles['login']}>Already have an account? <Link to={'/login'}>Login</Link></div>
            </div>
            <div className={styles['form']}>
                <input placeholder={'First Name'}/>
                <input placeholder={'Last Name'}/>
                <input placeholder={'Email'}/>
                <input placeholder={'Password'} type={'password'}/>
                <button className={'btn1'}>Sign Up</button>
            </div>
        </div>

    return <Authentication data={form}/>
}

export default Signup;