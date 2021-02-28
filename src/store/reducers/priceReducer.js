import * as actionTypes from '../actionTypes';

const PRICES = {
	egg: 1,
	tomatoes: 0.45,
	pickles: 0.35,
	onions: 0.4,
	bacon: 1.2,
	cheese: 1,
	beef: 2.85,
	falafel: 2.15,
	rucola: 0.6,
	lettuce: 0.55,
};

const initialState = {
	price: 4.35,
};

const priceReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				price:
					Math.round((state.price + PRICES[action.payload.ingredient]) * 100) /
					100,
			};
		case actionTypes.REMOVE_INGREDIENT:
			return action.payload.currentQuantity > 0
				? {
						...state,
						price:
							Math.round(
								(state.price - PRICES[action.payload.ingredient]) * 100
							) / 100,
				  }
				: state;
		default:
			return state;
	}
};

export default priceReducer;
