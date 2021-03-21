import React from 'react';

import classes from './CheckoutSummary.module.css';
import priceFormatter from '../../../utilities/priceFormatter';

import Burger from '../../Burger/Burger';

const CheckoutSummary = props => {
	return (
		<div className={classes.CheckoutSummary}>
			<h2>Here is your burger:</h2>
			<Burger ingredients={props.ingredients} />
			<h3>Total price: {priceFormatter.format(props.price)}</h3>
			<button onClick={props.cancelOrder} className='black-button'>
				Cancel
			</button>
			<button className='black-button' onClick={props.confirmOrder}>
				Confirm Order
			</button>
		</div>
	);
};

export default CheckoutSummary;
