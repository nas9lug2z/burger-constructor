import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
	state = {
		orderConfirmed: false,
	};

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
				ingredients={this.props.ingredients}
				cancelOrder={this.cancelOrderHandler}
				confirmOrder={this.confirmOrderHandler}
				price={this.props.price}
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

const mapStateToProps = state => {
	return {
		price: state.prices.initialPrice,
		ingredients: state.ingredients.ingredients,
	};
};

export default connect(mapStateToProps)(Checkout);
