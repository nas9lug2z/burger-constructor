import React from 'react';

const HamburgerButton = props => {
	// let hamburgerClasses = [classes.Hamburger, classes.HamburgerSqueeze];

	// let hamburgerInner = [classes.HamburgerInner];

	// if (props.black) {
	// 	hamburgerInner.push(classes.BlackColor);
	// }

	return (
		<button
			href='/'
			// className={hamburgerClasses.join(' ')}
			type='button'
			onClick={props.toggleSideDrawer}>
			MENU
		</button>
	);
};

export default HamburgerButton;
