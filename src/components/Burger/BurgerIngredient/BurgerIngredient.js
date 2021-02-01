import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ingredientClasses from './BurgerInredient.module.css';

import beef from './../../../assets/beef.svg';
import falafel from './../../../assets/falafel.svg';
import lettuce from './../../../assets/lettuce.svg';
import tomatoes from './../../../assets/tomatoes.svg';
import pickles from './../../../assets/pickles.svg';
import rucola from './../../../assets/rucola.svg';
import bacon from './../../../assets/bacon.svg';
import cheese from './../../../assets/cheese.svg';
import egg from './../../../assets/egg.svg';
import onions from './../../../assets/onions.svg';

const BurgerIngredient = props => {
	let ingredient = null;
	switch (props.type) {
		case 'egg':
			ingredient = egg;
			break;
		case 'tomatoes':
			ingredient = tomatoes;
			break;
		case 'pickles':
			ingredient = pickles;
			break;
		case 'onions':
			ingredient = onions;
			break;
		case 'bacon':
			ingredient = bacon;
			break;
		case 'cheese':
			ingredient = cheese;
			break;
		case 'beef':
			ingredient = beef;
			break;
		case 'falafel':
			ingredient = falafel;
			break;
		case 'rucola':
			ingredient = rucola;
			break;
		case 'lettuce':
			ingredient = lettuce;
			break;
		default:
			ingredient = null;
			break;
	}

	return (
		<Fragment>
			<img
				src={ingredient}
				className={ingredientClasses.ingredientImg}
				alt={props.type}></img>
		</Fragment>
	);

	BurgerIngredient.propTypes = {
		type: PropTypes.string.isRequired,
	};
};

export default BurgerIngredient;
