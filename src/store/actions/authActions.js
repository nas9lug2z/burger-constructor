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
			email: authData.email,
		},
	};
};

const authFailed = err => {
	return {
		type: actionTypes.AUTH_FAILED,
		payload: {
			error: err.response.data.error.message,
		},
	};
};

export const logout = _ => {
	localStorage.clear();
	return {
		type: actionTypes.LOGOUT,
	};
};

const authExpires = expirationDate => {
	return dispatch => {
		setTimeout(_ => dispatch(logout()), expirationDate * 1000);
	};
};

export const auth = (email, password, isSignedUp) => {
	return dispatch => {
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
				const expirationDate = new Date(
					new Date().getTime() + res.data.expiresIn * 1000
				);
				localStorage.setItem('tokenId', res.data.idToken);
				localStorage.setItem('userId', res.data.localId);
				localStorage.setItem('expirationDate', expirationDate);
				localStorage.setItem('email', res.data.email);
				dispatch(authSucess(res.data));
				dispatch(authExpires(res.data.expiresIn));
			})
			.catch(err => {
				dispatch(authFailed(err));
			});
	};
};

export const checkAuthStatus = _ => {
	return dispatch => {
		const tokenId = localStorage.getItem('tokenId');
		if (tokenId) {
			const userId = localStorage.getItem('userId');
			const email = localStorage.getItem('email');
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			const now = new Date();
			if (now <= expirationDate) {
				dispatch(
					authSucess({ idToken: tokenId, localId: userId, email: email })
				);
				dispatch(
					authExpires((expirationDate.getTime() - new Date().getTime()) / 1000)
				);
			} else {
				dispatch(logout());
			}
		}
	};
};
