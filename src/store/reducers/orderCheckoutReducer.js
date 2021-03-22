import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	loading: false,
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
				orderPosted: false,
				error: false,
				loading: false,
			});
		case actionTypes.POST_ORDER_FAILED:
			return updateObject(state, {
				orderPosted: false,
				error: true,
				errorMessage: action.payload.error,
				loading: false,
			});
		case actionTypes.SUBMIT_ORDER:
			return updateObject(state, {
				orderPosted: true,
				error: false,
				loading: false,
			});
		default:
			return state;
	}
};

export default orderCheckoutReducer;
