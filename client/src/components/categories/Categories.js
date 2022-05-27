import FruitsAndVegetables from '../../shared/assets/categories/fruits_vegetables.png';
import MeatPoultrySeafood from '../../shared/assets/categories/meat_poultry_seafood.png';
import Breakfast from '../../shared/assets/categories/breakfast.png';
import ChocolateCandy from '../../shared/assets/categories/chocolate_candy.png';
import DairyEggs from '../../shared/assets/categories/dairy_eggs.png';
import ColdDrinks from '../../shared/assets/categories/cold.png';
import Snacks from '../../shared/assets/categories/snacks.png';
import IceCream from '../../shared/assets/categories/icecream.png';
import styles from './categories.module.css';
import {Link} from "react-router-dom";

const Categories = () => {
    const categories = [
        {
            display: "Fruits & Vegetables",
            to: 'fruits-vegetables',
            img: FruitsAndVegetables
        },
        {
            display: "Meat, Poultry & Seafood",
            to: 'meat-poultry-seafood',
            img: MeatPoultrySeafood
        },
        {
            display: "Breakfast",
            to: 'breakfast',
            img: Breakfast
        },
        {
            display: "Chocolate & Candy",
            to: 'chocolate-candy',
            img: ChocolateCandy
        },
        {
            display: "Dairy & Eggs",
            to: 'dairy-eggs',
            img: DairyEggs
        },
        {
            display: "Beverages",
            to: 'beverages',
            img: ColdDrinks
        },
        {
            display: "Chips & Crackers",
            to: 'chips-crackers',
            img: Snacks
        },
        {
            display: "Ice Cream",
            to: 'ice-cream',
            img: IceCream
        }
    ]

    return (
        <div className={styles['categories']}>
            <div className={`${styles['categories-scroll']}`}>
                {categories.map((item, i) =>
                    <Link key={i} to={`/products/${item.to}`} className={styles['category']}>
                        <div>{item.display}</div>
                        <img src={item.img} alt={item.display}/>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Categories;