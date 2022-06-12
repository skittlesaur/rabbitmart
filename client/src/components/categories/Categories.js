import FruitsAndVegetables from '../../shared/assets/categories/fruits_vegetables.png';
import MeatPoultrySeafood from '../../shared/assets/categories/meat_poultry_seafood.png';
import Breakfast from '../../shared/assets/categories/breakfast.png';
import ChocolateCandy from '../../shared/assets/categories/chocolate_candy.png';
import DairyEggs from '../../shared/assets/categories/dairy_eggs.png';
import ColdDrinks from '../../shared/assets/categories/cold.png';
import Snacks from '../../shared/assets/categories/snacks.png';
import IceCream from '../../shared/assets/categories/icecream.png';
import All from '../../shared/assets/categories/all.png';
import styles from './categories.module.css';
import {Link} from "react-router-dom";

const Categories = () => {
    const categories = [
        {
            display: "All",
            img: All
        },
        {
            display: "Fruits and Vegetables",
            img: FruitsAndVegetables
        },
        {
            display: "Meat Poultry and Seafood",
            img: MeatPoultrySeafood
        },
        {
            display: "Breakfast",
            img: Breakfast
        },
        {
            display: "Chocolate and Candy",
            img: ChocolateCandy
        },
        {
            display: "Dairy and Eggs",
            img: DairyEggs
        },
        {
            display: "Beverages",
            img: ColdDrinks
        },
        {
            display: "Chips and Crackers",
            img: Snacks
        },
        {
            display: "Ice Cream",
            img: IceCream
        }
    ]

    return (
        <div className={styles['categories']}>
            <div className={`${styles['categories-scroll']}`}>
                {categories.map((item, i) =>
                    <Link key={i} to={`/products?category=${item.display}`} className={styles['category']}>
                        <div>{item.display}</div>
                        <img src={item.img} alt={item.display}/>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Categories;