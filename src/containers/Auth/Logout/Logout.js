import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import * as classes from '../Auth.module.css';

const Logout = props => {
	console.log(props);
	const redirect = _ => props.history.push('/checkout');

	return (
		<Fragment>
			<button
				className={`${classes.Inline} black-button`}
				onClick={props.logout}>
				Logout
			</button>
			<button
				className={`${classes.Inline} black-button`}
				onClick={props.checkoutContinue}>
				Proceed to checkout
			</button>
		</Fragment>
	);
};

export default Logout;
