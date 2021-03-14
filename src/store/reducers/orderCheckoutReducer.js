import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	loading: false,
	order: null,
	orderPosted: false,
	error: false,
	errorMessage: null,
};

const orderCheckoutReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SUBMIT_ORDER_START:
			return updateObject(state, {
				loading: true,
			});
		case actionTypes.RESET_ORDER:
			return updateObject(state, {
				order: null,
				orderPosted: false,
				error: false,
				loading: false,
			});
		case actionTypes.POST_ORDER_FAILED:
			return updateObject(state, {
				order: action.payload.order,
				orderPosted: false,
				error: true,
				errorMessage: action.payload.error,
				loading: false,
			});
		case actionTypes.SUBMIT_ORDER:
			return updateObject(state, {
				order: action.payload.order,
				orderPosted: true,
				error: false,
				loading: false,
			});
		default:
			return state;
	}
};

export default orderCheckoutReducer;
