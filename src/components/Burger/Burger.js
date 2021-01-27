import React, { Fragment } from 'react';

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
		<Fragment>
			<p>[Burger.js]</p>
			<img
				src={upperBread}
				alt='upper bread'
				className={ingredientClasses.ingredientImg}></img>
			{transformedIngredients}
			<img
				src={bottomBread}
				alt='bottom bread'
				className={ingredientClasses.ingredientImg}></img>
		</Fragment>
	);
};
export default Burger;
