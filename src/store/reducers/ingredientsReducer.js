import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	ingredients: null,
	error: false,
	totalIgCount: 0,
};

const addIngredient = (state, action) => {
	return updateObject(state, {
		error: false,
		totalIgCount: state.totalIgCount + 1,
		ingredients: {
			...state.ingredients,
			[action.payload.ingredient]:
				state.ingredients[action.payload.ingredient] + 1,
		},
	});
};

const removeIngredient = (state, action) => {
	return action.payload.currentQuantity > 0
		? updateObject(state, {
				totalIgCount: state.totalIgCount - 1,
				error: false,
				ingredients: {
					...state.ingredients,
					[action.payload.ingredient]:
						state.ingredients[action.payload.ingredient] - 1,
				},
		  })
		: state;
};

const ingredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_INGREDIENTS:
			return updateObject(state, {
				ingredients: action.payload.ingredients,
				error: false,
			});
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return updateObject(state, { error: true });
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);
		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action);
		case actionTypes.SUBMIT_ORDER:
			return updateObject(state, {
				ingredients: null,
				totalIgCount: 0,
				error: false,
			});
		default:
			return state;
	}
};

export default ingredientsReducer;
