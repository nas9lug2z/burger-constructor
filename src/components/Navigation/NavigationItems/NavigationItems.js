import React, { Fragment } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = props => {
	const noAuthMenu = (
		<Fragment>
			<NavigationItem close={props.close} link='/'>
				Burger Builder
			</NavigationItem>
			<NavigationItem close={props.close} link='/auth'>
				Login / Register
			</NavigationItem>
		</Fragment>
	);

	const authMenu = (
		<Fragment>
			<NavigationItem close={props.close} link='/'>
				Burger Builder
			</NavigationItem>
			<NavigationItem close={props.close} link='/orders'>
				My Orders
			</NavigationItem>
			<NavigationItem close={props.close} link='/auth'>
				Logout
			</NavigationItem>
		</Fragment>
	);

	return (
		<ul className={classes.NavigationItems}>
			{props.authenticated ? authMenu : noAuthMenu}
		</ul>
	);
};

export default NavigationItems;
