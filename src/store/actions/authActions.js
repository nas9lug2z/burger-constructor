import axios from 'axios';
import * as actionTypes from './actionTypes';

const APIKEY = 'AIzaSyCNVzH9DX0l5GRzDVLbAvg-tAu9bCMQiOw';
const generateURL = (apiKey, method) => {
	return `https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=${apiKey}`;
};
let method = 'signUp';

const authStart = _ => {
	return {
		type: actionTypes.AUTH_START,
	};
};

const authSucess = authData => {
	return {
		type: actionTypes.AUTH_SUCESS,
		payload: {
			tokenId: authData.idToken,
			userId: authData.localId,
		},
	};
};

const authFailed = err => {
	return {
		type: actionTypes.AUTH_FAILED,
		payload: {
			error: err,
		},
	};
};

export const auth = (email, password, isSignedUp) => {
	return dispatch => {
		console.log(email, password, isSignedUp);
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		axios
			.post(
				generateURL(APIKEY, isSignedUp ? 'signInWithPassword' : 'signUp'),
				authData
			)
			.then(res => {
				console.log(res);
				dispatch(authSucess(res.data));
			})
			.catch(err => {
				console.log(err.response);
				dispatch(authFailed(err.response.data.error.message));
			});
	};
};
