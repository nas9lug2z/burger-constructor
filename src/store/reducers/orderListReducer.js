import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	orders: null,
	loading: false,
	error: false,
};

const orderListReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_ORDERS_START:
			return updateObject(state, { loading: true, error: false });
		case actionTypes.FETCH_ORDERS_SUCESS:
			return updateObject(state, {
				orders: action.payload.orders,
				loading: false,
				error: false,
			});
		case actionTypes.FETCH_ORDERS_FAILED:
			return updateObject(state, { loading: false, error: true });
		default:
			return state;
	}
};

export default orderListReducer;
