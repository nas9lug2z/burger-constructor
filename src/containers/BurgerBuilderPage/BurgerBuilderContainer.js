import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './BurgerBuilderContainer.module.css';
import * as burgerBuilderActions from '../../store/actions/burgerBuilderActions';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilderContainer extends Component {
	state = {
		checkout: false,
	};

	componentDidMount() {
		this.props.initPrices();
		this.props.initIngredients();
	}

	updatePurchaseState = _ => {
		const sum = Object.values(this.props.ingredients).reduce(
			(accumulator, currentValue) => {
				return accumulator + currentValue;
			},
			0
		);
		return sum > 0;
	};

	checkoutHandler = _ => {
		this.setState({ checkout: true });
	};

	checkoutCancelHandler = _ => {
		this.setState({ checkout: false });
	};

	checkoutContinueHandler = _ => {
		this.props.history.push('/checkout');
	};

	authRedirectHandler = _ => {
		this.props.history.push('/auth');
	};

	render() {
		let burgerComponent = this.props.ingredientsError ? (
			<p>Ingredients can't be loaded!</p>
		) : (
			<Spinner />
		);

		let orderSum = null;

		if (this.props.ingredients) {
			burgerComponent = (
				<div className={classes.Container}>
					<BuildControls
						ingredients={this.props.ingredients}
						addIngredientHandler={ig => {
							this.props.addIngredient(ig);
						}}
						removeIngredientHandler={ig => {
							this.props.removeIngredient(ig, this.props.ingredients[ig]);
						}}
						price={this.props.price}
						purchasable={this.updatePurchaseState()}
						checkout={this.checkoutHandler}
						authenticated={this.props.authenticated}
						auth={this.authRedirectHandler}
					/>
					<Burger ingredients={this.props.ingredients} />
				</div>
			);
			orderSum = (
				<OrderSummary
					ingredients={this.props.ingredients}
					price={this.props.price}
					modalClosed={this.checkoutCancelHandler}
					checkoutContinue={this.checkoutContinueHandler}
				/>
			);
		}

		return (
			<Fragment>
				<main>
					<h1>Build your own burger!</h1>
					{burgerComponent}
				</main>
				<Modal
					show={this.state.checkout}
					modalClosed={this.checkoutCancelHandler}>
					{orderSum}
				</Modal>
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		price: state.prices.initialPrice,
		ingredients: state.chosenIngredients.ingredients,
		ingredientsError: state.chosenIngredients.error,
		authenticated: state.auth.tokenId,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addIngredient: ig => dispatch(burgerBuilderActions.addIngedient(ig)),
		removeIngredient: (ig, currentQuantity) =>
			dispatch(burgerBuilderActions.removeIngedient(ig, currentQuantity)),
		initIngredients: _ => dispatch(burgerBuilderActions.initIngredients()),
		initPrices: _ => dispatch(burgerBuilderActions.initPrices()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilderContainer, axios));
