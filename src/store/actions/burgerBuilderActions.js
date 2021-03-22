import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const addIngedient = ig => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		payload: { ingredient: ig },
	};
};

export const removeIngedient = (ig, currentQuantity) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		payload: {
			ingredient: ig,
			currentQuantity: currentQuantity,
		},
	};
};

//Init ingredients
const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		payload: {
			ingredients: ingredients,
		},
	};
};

const fetchIngredientsFailed = _ => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	};
};

export const initIngredients = _ => {
	return dispatch => {
		axios
			.get('/ingredients.json')
			.then(res => {
				dispatch(setIngredients(res.data));
			})
			.catch(err => {
				dispatch(fetchIngredientsFailed());
			});
	};
};

//Init prices
const setPrices = prices => {
	return {
		type: actionTypes.SET_PRICES,
		payload: {
			initialPrice: prices.initialPrice,
			ingredientPrices: prices.ingredientPrices,
		},
	};
};

export const initPrices = _ => {
	return dispatch => {
		axios
			.get('/prices.json')
			.then(res => {
				dispatch(setPrices(res.data));
			})
			.catch(err => {
				dispatch(fetchIngredientsFailed());
			});
	};
};
