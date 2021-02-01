import React from 'react';

import classes from './Burger.module.css';
import ingredientClasses from './BurgerIngredient/BurgerInredient.module.css';

import upperBread from './../../assets/upper-bread.svg';
import bottomBread from './../../assets/bottom-bread.svg';

import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';

const Burger = props => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map(igKey => {
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				return <BurgerIngredient key={igKey + i} type={igKey} />;
			});
		})
		.reduce((oldArr, el) => {
			return oldArr.concat(el);
		}, []);
	// take an inicial value - [] in this case - and loops though the array of existing elements adding them to the inicial value - empty array in this case

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients!</p>;
	}

	return (
		<div className={classes.BurgerContainer}>
			<img
				src={upperBread}
				alt='upper bread'
				className={ingredientClasses.ingredientImg}
				style={{ zIndex: 20 }}></img>
			{transformedIngredients}
			<img
				src={bottomBread}
				alt='bottom bread'
				className={ingredientClasses.ingredientImg}
				style={{ zIndex: 1 }}></img>
		</div>
	);
};
export default Burger;
