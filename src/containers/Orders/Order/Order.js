import React from 'react';
import classes from './Order.module.css';

const Order = props => {
	let igArray = [];
	Object.keys(props.order.ingredients).map((ig, index) => {
		igArray.push(`${ig} (${props.order.ingredients[ig]})`);
	});

	return (
		<div className={classes.Order}>
			<h4>
				{props.id}. Order No. {props.order.id}
			</h4>
			<p>Your burger ingredients: {igArray.join(', ')}</p>
			<h4>Price: {props.order.price}€</h4>
		</div>
	);
};

export default Order;
