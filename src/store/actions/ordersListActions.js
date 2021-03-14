import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const fetchOrdersStart = _ => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	};
};

const setOrders = orders => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCESS,
		payload: {
			orders: orders,
		},
	};
};

const fetchOrdersFailed = _ => {
	return {
		type: actionTypes.FETCH_ORDERS_FAILED,
	};
};

export const fetchOrders = _ => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		axios
			.get('/orders.json')
			.then(res => {
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({ ...res.data[key], id: key });
				}
				dispatch(setOrders(fetchedOrders));
			})
			.catch(err => {
				dispatch(fetchOrdersFailed());
			});
	};
};
