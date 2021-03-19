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
		</Fragment>
	);
};

export default Logout;
