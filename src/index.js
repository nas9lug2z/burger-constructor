import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ingredientsReducer from './store/reducers/ingredientsReducer';
import priceReducer from './store/reducers/priceReducer';
import orderCheckoutReducer from './store/reducers/orderCheckoutReducer';
import orderListReducer from './store/reducers/orderListReducer';
import authReducer from './store/reducers/authReducer';

const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	order: orderCheckoutReducer,
	prices: priceReducer,
	orderList: orderListReducer,
	auth: authReducer,
});

const composeEnhancers =
	process.env.NODE_ENV === 'development'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null || compose;

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(
	<React.StrictMode>{app}</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
