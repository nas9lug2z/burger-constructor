import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = props => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link='/'>Burger Builder</NavigationItem>
		{props.authenticated ? (
			<NavigationItem link='/orders'>Orders</NavigationItem>
		) : null}

		<NavigationItem link='/auth'>
			{props.authenticated ? 'Logout' : 'Login / Register'}
		</NavigationItem>
	</ul>
);

export default NavigationItems;
