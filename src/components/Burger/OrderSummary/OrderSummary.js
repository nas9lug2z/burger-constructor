import React, { Fragment } from 'react';

import classes from './OrderSummary.module.css';
import priceFormatter from '../../../utilities/priceFormatter';

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
			<h3>Total price: {priceFormatter.format(props.price)}</h3>
			<div>
				<button onClick={props.modalClosed} className='black-button'>
					Cancel
				</button>
				<button className='black-button' onClick={props.checkoutContinue}>
					Continue
				</button>
			</div>
		</div>
	);
};

export default OrderSummary;
