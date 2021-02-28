import React from 'react';

import classes from './BuildControls.module.css';

import BuildControl from './/BuildControl/BuildControl';

const BuildControls = props => {
	const ingredientQuantities = Object.values(props.ingredients);

	const ingredientsList = Object.keys(props.ingredients).map((ig, index) => {
		return (
			<BuildControl
				ingredientName={ig}
				quantity={ingredientQuantities[index]}
				key={ig + ingredientQuantities[index]}
				addIngredientHandler={_ => props.addIngredientHandler(ig)}
				removeIngredientHandler={_ => props.removeIngredientHandler(ig)}
			/>
		);
	});

	return (
		<div className={classes.BuildControlsContainer}>
			<p>Choose your ingredients: </p>
			<div className={classes.IngredientsList}>{ingredientsList}</div>
			<div>
				<p>Price: {props.price}€</p>
				<button
					disabled={!props.purchasable}
					onClick={props.clicked}
					className='black-button'>
					Checkout
				</button>
			</div>
		</div>
	);
};

export default BuildControls;
