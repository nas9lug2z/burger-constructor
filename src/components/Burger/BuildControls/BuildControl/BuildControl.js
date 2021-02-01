import React from 'react';

import classes from './BuildControl.module.css';

const BuildControl = props => {
	// console.log(props.ingredients);
	return (
		<div className={classes.Ingredient}>
			<button className={classes.PlusButton}>+</button>
			<span className={classes.Quantity}>{props.quantity}</span>
			<button className={classes.MinusButton}>-</button>
			<span className={classes.IngredientName}>{props.ingredientName}</span>
		</div>
	);
};

export default BuildControl;
