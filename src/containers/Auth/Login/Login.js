import React, { Fragment } from 'react';
import * as classes from '../Auth.module.css';

const Login = props => {
	return (
		<Fragment>
			<h1>Login to make an order</h1>
			<form>{props.children}</form>
			<button className='black-button' onClick={props.goBackHandler}>
				Go Back
			</button>
			<button className='black-button' onClick={props.submit}>
				Login
			</button>
			<div>
				<span>Don't have an account?</span>
				<button
					className={`${classes.Inline} black-button`}
					onClick={props.switchAuthMethod}>
					Register
				</button>
			</div>
		</Fragment>
	);
};

export default Login;
