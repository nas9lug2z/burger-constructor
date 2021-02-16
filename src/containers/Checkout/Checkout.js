import React, { Component, Fragment } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
	state = { ingredients: { bacon: 1, lettuce: 1, cheese: 1, beef: 1 } };

	componentDidMount() {
		const searchQuery = new URLSearchParams(this.props.location.search);
		let receivedIngredients = {};
		for (let par of searchQuery.entries()) {
			receivedIngredients[par[0]] = par[1];
		}
		console.log(receivedIngredients);
		this.setState({ ingredients: receivedIngredients });
	}
	cancelOrderHandler = _ => {
		this.props.history.goBack();
	};

	confirmOrderHandler = _ => {
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		return (
			<Fragment>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					cancelOrder={this.cancelOrderHandler}
					confirmOrder={this.confirmOrderHandler}
				/>
			</Fragment>
		);
	}
}

export default Checkout;
