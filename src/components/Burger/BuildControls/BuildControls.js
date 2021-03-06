import React from 'react';

import classes from './BuildControls.module.css';
import priceFormatter from '../../../utilities/priceFormatter';

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

	const purchasable = props.totalIgCount > 0;

	return (
		<div className={classes.BuildControlsContainer}>
			<p>Choose your ingredients: </p>
			<div className={classes.IngredientsList}>{ingredientsList}</div>
			<div>
				<p>Price: {priceFormatter.format(props.price)}</p>
				<button
					disabled={!purchasable}
					onClick={props.authenticated ? props.checkout : props.auth}
					className='black-button'>
					Checkout
				</button>
			</div>
		</div>
	);
};

export default BuildControls;
