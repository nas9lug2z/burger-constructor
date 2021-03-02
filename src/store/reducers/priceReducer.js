import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	initialPrice: 0,
	ingredientPrices: null,
};

//Aux functions
const addIngredient = (state, action) => {
	const newPrice =
		Math.round(
			(state.initialPrice + state.ingredientPrices[action.payload.ingredient]) *
				100
		) / 100;
	return updateObject(state, { initialPrice: newPrice });
};

const removeIngredient = (state, action) => {
	const newPrice =
		Math.round(
			(state.initialPrice - state.ingredientPrices[action.payload.ingredient]) *
				100
		) / 100;
	return action.payload.currentQuantity > 0
		? updateObject(state, { initialPrice: newPrice })
		: state;
};

//REDUCER
const priceReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_PRICES:
			return updateObject(state, {
				initialPrice: action.payload.initialPrice,
				ingredientPrices: action.payload.ingredientPrices,
			});
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);
		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action);
		default:
			return state;
	}
};

export default priceReducer;
