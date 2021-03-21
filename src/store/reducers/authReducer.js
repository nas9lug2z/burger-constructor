import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	tokenId: null,
	userId: null,
	email: null,
	error: null,
	loading: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return updateObject(state, {
				loading: true,
			});
		case actionTypes.AUTH_FAILED:
			return updateObject(state, {
				loading: false,
				error: action.payload.error,
			});
		case actionTypes.AUTH_SUCESS:
			return updateObject(state, {
				loading: false,
				error: null,
				tokenId: action.payload.tokenId,
				userId: action.payload.userId,
				email: action.payload.email,
			});
		case actionTypes.LOGOUT:
			return updateObject(state, {
				error: null,
				tokenId: null,
				userId: null,
				email: null,
				loading: false,
			});
		default:
			return state;
	}
};

export default authReducer;
