import React, { Fragment } from 'react';

import ingredientClasses from './BurgerInredient.module.css';

import beef from './../../../assets/beef.svg';
import falafel from './../../../assets/falafel.svg';
import lettuce from './../../../assets/lettuce.svg';
import tomatoes from './../../../assets/tomatoes.svg';
import pickles from './../../../assets/pickles.svg';
import rucola from './../../../assets/rucola.svg';
import cheese from './../../../assets/cheese.svg';
import egg from './../../../assets/egg.svg';
import onions from './../../../assets/onions.svg';

const BurgerIngredient = props => {
	// let ingredient = null;
	// switch (props.type) {
	// 	case 'lettuce':
	// 		ingredient = lettuce;
	// 		break;
	// 	case 'pickles':
	// 		ingredient = pickles;
	// 		break;
	// }
	console.log(lettuce);
	console.log(props.type);

	let temp = variable => {
		return variable;
	};

	return (
		<Fragment>
			<img
				src={temp(props.type)}
				className={ingredientClasses.ingredientImg}
				alt={props.type}></img>
		</Fragment>
	);
};

export default BurgerIngredient;
