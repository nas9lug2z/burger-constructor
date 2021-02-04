import React, { Fragment } from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import HamburgerButton from '../NavigationItems/HamburgerButton/HamburgerButton';

const SideDrawer = props => {
	let dynamicClasses = [classes.SideDrawer];

	if (props.showSideDrawer) {
		dynamicClasses.push(classes.Open);
	} else {
		dynamicClasses.push(classes.Close);
	}

	return (
		<Fragment>
			<BackDrop show={props.showSideDrawer} clicked={props.close} />
			<div className={dynamicClasses.join(' ')}>
				<div className={classes.LogoSideDrawer}>
					<Logo white />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Fragment>
	);
};

export default SideDrawer;
