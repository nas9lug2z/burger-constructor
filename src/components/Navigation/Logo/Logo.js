import React, { Fragment } from 'react';
import LogoWhite from '../../../assets/logoWhite.svg';
import LogoBlack from '../../../assets/logoBlack.svg';

import classes from './Logo.module.css';

//pass in props 'white' for white logo, otherwise it will be black

const Logo = props => {
	return (
		<Fragment>
			<div className={classes.Logo}>
				<img src={props.white ? LogoWhite : LogoBlack} alt='Logo'></img>
			</div>
		</Fragment>
	);
};

export default Logo;
