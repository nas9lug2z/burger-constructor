import React from 'react';
import Logo from '../../../assets/logo.svg';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = props => {
	return (
		<header className={classes.Toolbar}>
			<div className={classes.Logo}>
				<img src={Logo} alt='Logo'></img>
			</div>
			<div>MENU</div>

			<nav>
				<NavigationItems />
			</nav>
		</header>
	);
};

export default Toolbar;
