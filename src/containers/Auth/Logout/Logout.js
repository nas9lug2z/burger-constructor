import React, { Fragment } from 'react';
import * as classes from '../Auth.module.css';

const Logout = props => {
	return (
		<Fragment>
			<button
				className={`${classes.Inline} black-button`}
				onClick={props.logout}>
				Logout
			</button>
			{props.purchasable !== 0 ? (
				<button
					className={`${classes.Inline} black-button`}
					onClick={props.checkoutContinue}>
					Proceed to checkout
				</button>
			) : null}
		</Fragment>
	);
};

export default Logout;
