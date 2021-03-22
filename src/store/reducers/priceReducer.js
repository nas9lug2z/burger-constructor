import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	initialPrice: 0,
	ingredientPrices: null,
	totalOrderPrice: null,
};

//Aux functions
const addIngredient = (state, action) => {
	const newPrice =
		Math.round(
			(state.totalOrderPrice +
				state.ingredientPrices[action.payload.ingredient]) *
				100
		) / 100;
	return updateObject(state, { totalOrderPrice: newPrice });
};

const removeIngredient = (state, action) => {
	const newPrice =
		Math.round(
			(state.totalOrderPrice -
				state.ingredientPrices[action.payload.ingredient]) *
				100
		) / 100;
	return action.payload.currentQuantity > 0
		? updateObject(state, { totalOrderPrice: newPrice })
		: state;
};

const setPrices = (state, action) => {
	return updateObject(state, {
		initialPrice: action.payload.initialPrice,
		ingredientPrices: action.payload.ingredientPrices,
		totalOrderPrice: action.payload.initialPrice,
	});
};

//REDUCER
const priceReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_PRICES:
			return setPrices(state, action);
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);
		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action);
		case actionTypes.RESET_ORDER:
			return updateObject(state, { totalOrderPrice: state.initialPrice });
		default:
			return state;
	}
};

export default priceReducer;
