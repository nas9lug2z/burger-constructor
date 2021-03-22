import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	fetchedIngredients: null,
	chosenIngredients: null,
	totalIgCount: 0,
	error: false,
};

const addIngredient = (state, action) => {
	return updateObject(state, {
		error: false,
		totalIgCount: state.totalIgCount + 1,
		chosenIngredients: {
			...state.chosenIngredients,
			[action.payload.ingredient]:
				state.chosenIngredients[action.payload.ingredient] + 1,
		},
	});
};

const removeIngredient = (state, action) => {
	return action.payload.currentQuantity > 0
		? updateObject(state, {
				totalIgCount: state.totalIgCount - 1,
				error: false,
				chosenIngredients: {
					...state.chosenIngredients,
					[action.payload.ingredient]:
						state.chosenIngredients[action.payload.ingredient] - 1,
				},
		  })
		: state;
};

const setIngredients = (state, action) => {
	return updateObject(state, {
		fetchedIngredients: action.payload.ingredients,
		chosenIngredients: action.payload.ingredients,
		error: false,
	});
};

const resetOrder = (state, action) => {
	return updateObject(state, {
		chosenIngredients: { ...state.fetchedIngredients },
		totalIgCount: 0,
		error: false,
	});
};

const ingredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_INGREDIENTS:
			return setIngredients(state, action);
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return updateObject(state, { error: true });
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);
		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action);
		case actionTypes.RESET_ORDER:
			return resetOrder(state, action);
		default:
			return state;
	}
};

export default ingredientsReducer;
