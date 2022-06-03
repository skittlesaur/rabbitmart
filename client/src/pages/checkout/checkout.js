import {Link, useNavigate} from "react-router-dom";
import styles from './checkout.module.css';
import {useState, useRef, useEffect} from "react";
import {useDispatch} from "react-redux";
import Error from "../../components/feedback/error/Error";
import {postOrder} from "../../actions/orders";
const Checkout = () => {
    const [error, setError] = useState('');
    const fname = useRef();
    const lname = useRef();
    const email = useRef();
    const phone = useRef();
    const country = useRef();
    const city = useRef();
    const area = useRef();
    const street = useRef();
    const building_number = useRef();
    const floor = useRef();
    const apartment_number = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const totalPrice = 
    const handleCheckout = () => {
        
        if (!fname.current.value)
            return setError("Enter a first name");
        if (!lname.current.value)
            return setError("Enter a last name");
        if(!email.current.value)
            return setError("Enter an email address");
        if(!validateEmail(email.current.value))
            return setError("Enter a valid email address");
        if(!phone.current.value)
            return setError("Enter a phone number");
        if(!validatePhone(phone.current.value))
            return setError("Enter a valid phone number");
        if(!city.current.value)
            return setError("Enter a city");
        if(!country.current.value)
            return setError("Enter a country");
        if(!area.current.value)
            return setError("Enter an area");
        if(!street.current.value)
            return setError("Enter a street");
        if(!building_number.current.value)
            return setError("Enter a building number");
        if(isNaN(building_number.current.value))
            return setError("Enter a valid building number");
        if(!floor.current.value)
            return setError("Enter a floor");
        if(isNaN(floor.current.value))
            return setError("Enter a valid building number");
        if(!apartment_number.current.value)
            return setError("Enter an apartment number");
        if(isNaN(apartment_number.current.value))
            return setError("Enter a valid building number");



        const onSuccess = () => {
            navigate('/');
        }

        const onError = (e) => {
            setError(e.message);
        }

        
        const data = {
            
            fname: fname.current.value,
            lname: lname.current.value,
            email: email.current.value,
            phone: phone.current.value,
            country: country.current.value,
            city: city.current.value,
            area: area.current.value,
            street: street.current.value,
            building_number: building_number.current.value,
            floor: floor.current.value,
            apartment_number: apartment_number.current.value
        
    };

        dispatch(postOrder(data, onSuccess, onError));

    }
    const validatePhone = (phone) => {
        return String(phone)
            .toLowerCase()
            .match(
                /^01[0-2,5]{1}[0-9]{8}$/
            );
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    return (
        <div className={styles['wrapper']}>
            {error && <Error error={error} setError={setError}/>}
                <div className={'heading-wrapper'}>
                    <h1 className={'heading'}>Checkout</h1>
                </div>
                
                <div className={styles['form']}>
                <input ref={fname} type = "text" placeholder="first name" />
                <input ref={lname} type = "text" placeholder="last name"/>
                
                <input ref={email} type = "text" placeholder="email"/>
                <div></div>
                <input ref={phone} type = "text" placeholder="phone"/>
                <input ref={country} type = "text" placeholder="country" />
                <input ref={city} type = "text" placeholder="city" />
                <div></div>
                <input ref={area} type = "text" placeholder="area" />
                <input ref={street} type = "text" placeholder="street" />
                <input ref={building_number} type = "text" placeholder="building number" />
                <div></div>
                <input ref={floor} type = "text" placeholder="floor" />
                <input ref={apartment_number} type = "text" placeholder="apartment number" />
                <div>total price: </div> 

            </div>
            <div className={styles['button-wrapper']}>
                <button onClick={handleCheckout} className = {'btn1'}>Checkout</button>
            </div>
            
        </div>
        )
}
export default Checkout;