import styles from './checkout.module.css';
import '../.././shared/css/master.css';
import {useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import Error from "../../components/feedback/error/Error";
import {postOrder} from "../../actions/orders";

const Checkout = () => {
    const [error, setError] = useState('');
    const fname = useRef();
    const lname = useRef();
    const email = useRef();
    const phone = useRef();
    const city = useRef();
    const area = useRef();
    const street = useRef();
    const building_number = useRef();
    const floor = useRef();
    const apartment_number = useRef();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.products.cart_validation);

    const handleCheckout = () => {

        if (!fname.current.value)
            return setError("Enter a first name");
        if (!lname.current.value)
            return setError("Enter a last name");
        if (!email.current.value)
            return setError("Enter an email address");
        if (!validateEmail(email.current.value))
            return setError("Enter a valid email address");
        if (!phone.current.value)
            return setError("Enter a phone number");
        if (!validatePhone(phone.current.value))
            return setError("Enter a valid phone number");
        if (!city.current.value)
            return setError("Enter a city");
        if (!area.current.value)
            return setError("Enter an area");
        if (!street.current.value)
            return setError("Enter a street");
        if (!building_number.current.value)
            return setError("Enter a building number");
        if (isNaN(building_number.current.value))
            return setError("Enter a valid building number");
        if (!floor.current.value)
            return setError("Enter a floor");
        if (isNaN(floor.current.value))
            return setError("Enter a valid building number");
        if (!apartment_number.current.value)
            return setError("Enter an apartment number");
        if (isNaN(apartment_number.current.value))
            return setError("Enter a valid building number");


        const onSuccess = (url) => {
            window.location.href = url;
        }

        const onError = (e) => {
            setError(e.message);
        }


        const data = {

            name: {
                first: fname.current.value,
                last: lname.current.value,
            },
            email: email.current.value,
            phone_number: phone.current.value,
            address: {
                country: 'Egypt',
                city: city.current.value,
                area: area.current.value,
                street: street.current.value,
                building_number: building_number.current.value,
                floor: floor.current.value,
                apartment_number: apartment_number.current.value
            }
        };

        dispatch(postOrder(cart.token, data, onSuccess, onError));

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
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    return (
        <div className={styles['wrapper']}>
            {error && <Error error={error} setError={setError}/>}
            <div className={'heading-wrapper'}>
                <h1 className={'heading'}>Checkout</h1>
            </div>

            <div className={styles['form']}>
                <input ref={fname} type="text" placeholder="First Name"/>
                <input ref={lname} type="text" placeholder="Last Name"/>

                <input ref={email} type="text" placeholder="Email"/>
                <input ref={phone} type="text" placeholder="Phone"/>
                <input ref={city} type="text" placeholder="City"/>

                <input ref={area} type="text" placeholder="Area"/>
                <input ref={street} type="text" placeholder="Street"/>
                <input ref={building_number} type="text" placeholder="Building Number"/>

                <input ref={floor} type="text" placeholder="Floor"/>
                <input ref={apartment_number} type="text" placeholder="Apartment Number"/>
            </div>

            <div className={styles['total']}>
                <div className={styles["total-text"]}>Total Price:</div>
                <div className={styles['total-amount']}>{cart.total} EGP</div>
            </div>

            <div className={styles['total-wrapper']}>
                <button onClick={handleCheckout} className={'btn1'}>Checkout</button>
            </div>

        </div>
    )
}
export default Checkout;