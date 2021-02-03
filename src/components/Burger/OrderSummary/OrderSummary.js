import React from 'react';

import classes from './OrderSummary.module.css';

const OrderSummary = props => {
	const ingredientQuantities = Object.values(props.ingredients);

	const ingredientsList = Object.keys(props.ingredients).map((ig, index) => {
		if (ingredientQuantities[index] > 0) {
			return (
				<li className={classes.ListItem} key={ig + ingredientQuantities[index]}>
					{ig}: {ingredientQuantities[index]}
				</li>
			);
		}
	});

	return (
		<div className={classes.OrderSummary}>
			<h2 className={classes.Title}>Your burger:</h2>
			<ul className={classes.List}>
				<li className={classes.ListItem} key='bread'>
					Bread: 1
				</li>
				{ingredientsList}
			</ul>
			<h3>Price: {props.price} €</h3>
			<div>
				<button onClick={props.modalClosed} className='black-button'>
					Cancel
				</button>
				<button className='black-button'>Confirm Order</button>
			</div>
		</div>
	);
};

export default OrderSummary;
