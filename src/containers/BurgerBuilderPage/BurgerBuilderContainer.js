import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

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
		if (!this.props.fetchedIngredients) {
			this.props.initPrices();
			this.props.initIngredients();
		}
	}

	updatePurchaseState = _ => {
		const sum = Object.values(this.props.chosenIngredients).reduce(
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
		let burgerComponent = this.props.chosenIngredientsError ? (
			<p>Ingredients can't be loaded!</p>
		) : (
			<Spinner />
		);

		let orderSum = null;

		if (this.props.chosenIngredients) {
			burgerComponent = (
				<div className={classes.Container}>
					<BuildControls
						ingredients={this.props.chosenIngredients}
						addIngredientHandler={ig => {
							this.props.addIngredient(ig);
						}}
						removeIngredientHandler={ig => {
							this.props.removeIngredient(ig, this.props.chosenIngredients[ig]);
						}}
						price={this.props.totalOrderPrice}
						checkout={this.checkoutHandler}
						authenticated={this.props.authenticated}
						auth={this.authRedirectHandler}
						totalIgCount={this.props.totalIgCount}
					/>
					<Burger ingredients={this.props.chosenIngredients} />
				</div>
			);
			orderSum = (
				<OrderSummary
					ingredients={this.props.chosenIngredients}
					price={this.props.totalOrderPrice}
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
		totalOrderPrice: state.prices.totalOrderPrice,
		fetchedIngredients: state.ingredients.fetchedIngredients,
		chosenIngredients: state.ingredients.chosenIngredients,
		ingredientsError: state.ingredients.error,
		authenticated: state.auth.tokenId,
		totalIgCount: state.ingredients.totalIgCount,
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
)(BurgerBuilderContainer);
