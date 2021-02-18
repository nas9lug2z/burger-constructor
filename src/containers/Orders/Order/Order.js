import React, { Fragment } from 'react';
import classes from './Order.module.css';

const Order = props => {
	let igArray = [];
	const ingredients = Object.keys(props.order.ingredient).map((ig, index) => {
		igArray.push(`${ig} (${props.order.ingredient[ig]})`);
	});

	// let ingredients = props.order.ingredient;
	// console
	// 	.log
	// 	// ingredients.map(par, index => {
	// 	// 	ingredients[index];
	// 	// })
	// 	();
	return (
		<div className={classes.Order}>
			<h4>
				{props.id}. Order No. {props.order.id}
			</h4>
			<p>Your burger ingredients: {igArray.join(', ')}</p>
			{/* <p>Inregients: {props.order.ingredient.map(ingredient => ingredient)}</p> */}
			<h4>Price: {props.order.price}€</h4>
		</div>
	);
};

export default Order;
