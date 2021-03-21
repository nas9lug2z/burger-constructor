import React, { Fragment } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = props => {
	const noAuthMenu = (
		<Fragment>
			<NavigationItem link='/'>Burger Builder</NavigationItem>
			<NavigationItem link='/auth'>Login / Register</NavigationItem>
		</Fragment>
	);

	const authMenu = (
		<Fragment>
			<NavigationItem link='/'>Burger Builder</NavigationItem>
			<NavigationItem link='/orders'>My Orders</NavigationItem>
			<NavigationItem link='/auth'>Logout</NavigationItem>
		</Fragment>
	);

	return (
		<ul className={classes.NavigationItems}>
			{props.authenticated ? authMenu : noAuthMenu}
		</ul>
	);
};

export default NavigationItems;
