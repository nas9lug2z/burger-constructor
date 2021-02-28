import * as actionTypes from '../actionTypes';

const initialState = {
	ingredients: {
		egg: 0,
		tomatoes: 0,
		pickles: 0,
		onions: 0,
		bacon: 0,
		cheese: 0,
		beef: 0,
		falafel: 0,
		rucola: 0,
		lettuce: 0,
	},
};

const ingredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.payload.ingredient]:
						state.ingredients[action.payload.ingredient] + 1,
				},
			};
		case actionTypes.REMOVE_INGREDIENT:
			return action.payload.currentQuantity > 0
				? {
						...state,
						ingredients: {
							...state.ingredients,
							[action.payload.ingredient]:
								state.ingredients[action.payload.ingredient] - 1,
						},
				  }
				: state;

		default:
			return state;
	}
};

export default ingredientsReducer;
