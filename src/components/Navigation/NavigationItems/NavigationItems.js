import React, { Fragment } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = props => {
	const noAuthMenu = (
		<Fragment>
			<NavigationItem
				close={props.close}
				resetOrder={props.resetOrder}
				orderPosted={props.orderPosted}
				link='/'>
				Burger Builder
			</NavigationItem>
			<NavigationItem
				close={props.close}
				resetOrder={props.resetOrder}
				orderPosted={props.orderPosted}
				link='/auth'>
				Login / Register
			</NavigationItem>
		</Fragment>
	);

	const authMenu = (
		<Fragment>
			<NavigationItem
				close={props.close}
				resetOrder={props.resetOrder}
				orderPosted={props.orderPosted}
				link='/'>
				Burger Builder
			</NavigationItem>
			<NavigationItem
				close={props.close}
				resetOrder={props.resetOrder}
				orderPosted={props.orderPosted}
				link='/orders'>
				My Orders
			</NavigationItem>
			<NavigationItem
				close={props.close}
				resetOrder={props.resetOrder}
				orderPosted={props.orderPosted}
				link='/auth'>
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
