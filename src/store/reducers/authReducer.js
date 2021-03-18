import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	tokenId: null,
	userId: null,
	error: null,
	loading: null,
};

const expirationDate = date => {};

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
			});
		default:
			return state;
	}
};

export default authReducer;
