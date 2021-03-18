import axios from 'axios';

const instance = axios.create({
	baseURL:
		'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNVzH9DX0l5GRzDVLbAvg-tAu9bCMQiOw',
});

export default instance;
