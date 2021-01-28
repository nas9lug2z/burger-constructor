import React from 'react';

import classes from './Burger.module.css';

import ingredientClasses from './BurgerIngredient/BurgerInredient.module.css';
import upperBread from './../../assets/upper-bread.svg';
import bottomBread from './../../assets/bottom-bread.svg';

import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';

const Burger = props => {
	console.log(props.ingredients);

	const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
		return [...Array(props.ingredients[igKey])].map((_, i) => {
			return <BurgerIngredient key={igKey + i} type={igKey} />;
		});
	});

	console.log(transformedIngredients);

	return (
		<div className={classes.Burger}>
			<p>[Burger.js]</p>
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
