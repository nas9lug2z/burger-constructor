import React from 'react';
import classes from './HamburgerButton.module.css';

const HamburgerButton = props => {
	let menuBtnBurgerClasses = [classes.MenuBtnBurger];

	if (props.open) {
		menuBtnBurgerClasses = [classes.MenuBtnBurger, classes.Open];
	}
	console.log(props.open);
	return (
		<div onClick={props.toggleSideDrawer} className={classes.MenuBtn}>
			<div className={menuBtnBurgerClasses.join(' ')}></div>
		</div>
	);
};

export default HamburgerButton;
