import FruitsAndVegetables from '../../shared/assets/categories/fruits_vegetables.png';
import MeatPoultrySeafood from '../../shared/assets/categories/meat_poultry_seafood.png';
import Breakfast from '../../shared/assets/categories/breakfast.png';
import ChocolateCandy from '../../shared/assets/categories/chocolate_candy.png';
import LaundryHomecare from '../../shared/assets/categories/laundry_homecare.png';
import Petcare from '../../shared/assets/categories/petcare.png';
import Bakery from '../../shared/assets/categories/bakery.png';
import DairyEggs from '../../shared/assets/categories/dairy_eggs.png';
import Frozen from '../../shared/assets/categories/frozen.png';
import ColdDrinks from '../../shared/assets/categories/cold.png';
import Snacks from '../../shared/assets/categories/snacks.png';
import Milk from '../../shared/assets/categories/milk.png';
import Hot from '../../shared/assets/categories/hot.png';
import IceCream from '../../shared/assets/categories/icecream.png';
import Baking from '../../shared/assets/categories/baking.png';
import styles from './categories.module.css';
import {Link} from "react-router-dom";

const Categories = () => {
    const categories = [
        {
            display: "Fruits & Vegetables",
            to: '',
            img: FruitsAndVegetables
        },
        {
            display: "Meat, Poultry & Seafood",
            to: '',
            img: MeatPoultrySeafood
        },
        {
            display: "Breakfast",
            to: '',
            img: Breakfast
        },
        {
            display: "Chocolate & Candy",
            to: '',
            img: ChocolateCandy
        },
        {
            display: "Laundry & Home Care",
            to: '',
            img: LaundryHomecare
        },
        {
            display: "Pet Care",
            to: '',
            img: Petcare
        },
        {
            display: "Bakery",
            to: '',
            img: Bakery
        },
        {
            display: "Dairy & Eggs",
            to: '',
            img: DairyEggs
        },
        {
            display: "Frozen",
            to: '',
            img: Frozen
        },
        {
            display: "Milk",
            to: '',
            img: Milk
        },
        {
            display: "Cold Drinks",
            to: '',
            img: ColdDrinks
        },
        {
            display: "Snacks",
            to: '',
            img: Snacks
        },
        {
            display: "Hot Drinks",
            to: '',
            img: Hot
        },
        {
            display: "Ice Cream",
            to: '',
            img: IceCream
        },
        {
            display: "Cooking & Baking",
            to: '',
            img: Baking
        }
    ]

    return (
        <div className={styles['categories']}>
            <div className={`${styles['categories-scroll']}`}>
                {categories.map((item, i) =>
                    <Link to={`/products/${item.to}`} className={styles['category']}>
                        <div>{item.display}</div>
                        <img src={item.img} alt={item.display}/>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Categories;