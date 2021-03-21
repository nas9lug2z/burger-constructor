import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const submitOrderStart = _ => {
	return {
		type: actionTypes.SUBMIT_ORDER_START,
	};
};

const postOrderFailed = (err, order) => {
	return {
		type: actionTypes.POST_ORDER_FAILED,
		payload: {
			error: err,
			order: order,
		},
	};
};

const postOrder = order => {
	return {
		type: actionTypes.SUBMIT_ORDER,
		payload: {
			order: order,
		},
	};
};

export const submitOrder = (order, accessToken) => {
	return dispatch => {
		dispatch(submitOrderStart());
		axios
			.post(`/orders.json?auth=${accessToken}`, order)
			.then(_ => dispatch(postOrder(order)))
			.catch(err => dispatch(postOrderFailed(err)));
	};
};

export const resetOrder = _ => {
	return {
		type: actionTypes.RESET_ORDER,
	};
};
