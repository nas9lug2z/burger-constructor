import React from 'react';

import classes from './BuildControl.module.css';

const BuildControl = props => {
	// console.log(props.changeQuantityHandler('egg'));
	return (
		<div className={classes.Ingredient}>
			<button
				onClick={props.addIngredientHandler}
				className={classes.PlusButton}>
				+
			</button>
			<span className={classes.Quantity}>{props.quantity}</span>
			<button
				onClick={props.removeIngredientHandler}
				className={classes.MinusButton}>
				-
			</button>
			<span className={classes.IngredientName}>{props.ingredientName}</span>
		</div>
	);
};

export default BuildControl;
