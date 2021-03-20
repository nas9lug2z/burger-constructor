import React, { Fragment } from 'react';
import * as classes from '../Auth.module.css';

const Register = props => {
	return (
		<Fragment>
			<h1>Register to make an order</h1>
			<form>{props.children}</form>
			<button className='black-button' onClick={props.submit}>
				Register
			</button>
			<div>
				<span>Already registered?</span>
				<button
					className={`${classes.Inline} black-button`}
					onClick={props.switchAuthMethod}>
					Login
				</button>
			</div>
		</Fragment>
	);
};

export default Register;
