import styles from './adminNewProduct.module.css';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {postProduct} from "../../../../actions/products";
import SuccessImage from "../../../../shared/assets/state/success.png";
import Error from "../../../../components/feedback/error/Error";

const FORM = 'FORM';
const SUCCESS = 'SUCCESS';

const INITIAL_PRODUCT = {
    product_id: '',
    name: '',
    price: '',
    weight: '',
    measurement: '',
    category: '',
    image: ''
};

const AdminNewProduct = () => {

    const dispatch = useDispatch();
    const categories = ["Beverages", "Breakfast", "Chips & Crackers", "Dairy & Eggs", "Fruits & Vegetables", "Meat Poultry and Seafood"];
    const [state, setState] = useState(FORM)
    const [error, setError] = useState('');

    const [product, setProduct] = useState(INITIAL_PRODUCT);

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'product_id':
                e.target.value = e.target.value.toUpperCase();
                break;
            case 'measurement':
                e.target.value = e.target.value.toLowerCase();
                break;
            default:
                break;
        }

        setProduct({...product, [e.target.name]: e.target.value});
    }

    const handleSubmit = () => {

        if (!product.product_id || product.product_id.length !== 6)
            return setError('Enter a 6 characters product id');

        if (!product.name)
            return setError('Enter a valid product name');

        if (!product.price)
            return setError('Enter a valid product price');

        if (!product.weight)
            return setError('Enter a valid product weight');

        if (!product.measurement)
            return setError('Enter a valid product measurement');

        if (!product.category || product.category === 'Category')
            return setError('Enter a valid product category');

        if (!product.image || !product.image.match(/(https?:\/\/)?.*(\.png|\.jpg|\.jpeg)/))
            return setError('Enter a valid image URL');


        const onSuccess = () => {
            setState(SUCCESS);
        }

        const onError = (e) => {
            setError(e.message)
        }

        dispatch(postProduct(product, onSuccess, onError));
    }

    const handleReset = () => {
        setState(FORM);
        setProduct(INITIAL_PRODUCT);
    }

    if (state === SUCCESS)
        return (
            <div className={styles['wrapper']}>
                <div className={styles['response-wrapper']}>
                    <img src={SuccessImage} alt={'Successfully Updated'}/>
                    <p>{product.name} was added successfully to the database</p>
                    <div className={'btn2'} onClick={handleReset}>Add More</div>
                </div>
            </div>
        )

    return (
        <div className={styles['wrapper']}>
            {error && <Error error={error} setError={setError}/>}
            <div className={'heading'}>
                <h1>New Product</h1>
            </div>
            <div className={styles['form']}>
                <input maxLength={6} placeholder={'Product Id'} name={'product_id'} value={product.product_id}
                       onChange={(e) => handleChange(e)}/>
                <input placeholder={'Product Name'} name={'name'} value={product.name} className={styles['two']}
                       onChange={(e) => handleChange(e)}/>
                <input placeholder={'Price'} type={'number'} name={'price'} value={product.price}
                       onChange={(e) => handleChange(e)}/>
                <input placeholder={'Weight'} type={'number'} name={'weight'} value={product.weight}
                       onChange={(e) => handleChange(e)}/>
                <input placeholder={'Measurement'} maxLength={3} name={'measurement'} value={product.measurement}
                       onChange={(e) => handleChange(e)}/>
                <select defaultValue={'Category'} className={styles['full']} name={'category'}
                        onChange={(e) => handleChange(e)}>
                    <option disabled={true}>Category</option>
                    {categories.map((category, i) => <option key={i} value={category}>{category}</option>)}
                </select>
                <input placeholder={'Image'} type={'url'} name={'image'} value={product.image}
                       className={styles['full']}
                       onChange={(e) => handleChange(e)}/>
            </div>
            <button onClick={handleSubmit} className={`btn1 ${styles['submit']}`}>Add</button>
        </div>
    );
}

export default AdminNewProduct;