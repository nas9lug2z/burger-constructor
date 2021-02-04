import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import HamburgerButton from '../NavigationItems/HamburgerButton/HamburgerButton';

const Toolbar = props => {
	return (
		<header className={classes.Toolbar}>
			<nav className={classes.DesktopOnly}>
				<NavigationItems />
			</nav>
			<HamburgerButton
				toggleSideDrawer={props.toggleSideDrawer}
				open={props.showSideDrawer}
			/>
			<Logo white />
		</header>
	);
};

export default Toolbar;
