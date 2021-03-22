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
		this.props.history.replace('/');
	};

	confirmOrderHandler = _ => {
		this.setState({ orderConfirmed: true }, _ => {
			this.props.history.replace('/checkout/contact-data');
		});
	};

	render() {
		const checkoutSummaryEl = (
			<CheckoutSummary
				ingredients={this.props.chosenIngredients}
				changeOrder={this.cancelOrderHandler}
				confirmOrder={this.confirmOrderHandler}
				price={this.props.totalOrderPrice}
			/>
		);

		return (
			<Fragment>
				{!this.state.orderConfirmed ? checkoutSummaryEl : null}
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		totalOrderPrice: state.prices.totalOrderPrice,
		chosenIngredients: state.ingredients.chosenIngredients,
	};
};

export default connect(mapStateToProps)(Checkout);
