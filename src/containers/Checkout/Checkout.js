import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
	state = {
		ingredients: {},
		price: 0,
		orderConfirmed: false,
	};

	componentDidMount() {
		const searchQuery = new URLSearchParams(this.props.location.search);
		let receivedPrice = 0;
		let receivedIngredients = {};
		for (let par of searchQuery.entries()) {
			if (par[0] === 'price') {
				receivedPrice = par[1];
			} else {
				receivedIngredients[par[0]] = par[1];
			}
		}
		this.setState({ price: receivedPrice, ingredients: receivedIngredients });
	}
	cancelOrderHandler = _ => {
		this.setState({ orderConfirmed: false });
		this.props.history.goBack();
	};

	confirmOrderHandler = _ => {
		this.setState({ orderConfirmed: true }, _ => {
			this.props.history.replace('/checkout/contact-data', {
				ingredients: this.state.ingredients,
				price: this.state.price,
			});
		});
	};

	render() {
		const checkoutSummaryEl = (
			<CheckoutSummary
				ingredients={this.state.ingredients}
				cancelOrder={this.cancelOrderHandler}
				confirmOrder={this.confirmOrderHandler}
				price={this.state.price}
			/>
		);
		return (
			<Fragment>
				{!this.state.orderConfirmed ? checkoutSummaryEl : null}
				<Route
					path={`${this.props.match.url}/contact-data`}
					component={ContactData}
				/>
			</Fragment>
		);
	}
}

export default Checkout;
