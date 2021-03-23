import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const NavigationItem = props => {
	const onClickEvents = _ => {
		console.log(`order posted: ${props.orderPosted}`);
		// props.close();
		if (props.orderPosted) {
			props.resetOrder();
		}
	};
	return (
		<li className={classes.NavigationItem} onClick={onClickEvents}>
			<NavLink to={props.link} exact activeClassName={classes.active}>
				{props.children}
			</NavLink>
		</li>
	);
};

export default NavigationItem;
