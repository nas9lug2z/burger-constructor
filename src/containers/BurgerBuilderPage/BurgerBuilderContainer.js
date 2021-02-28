import React, { Component, Fragment } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './BurgerBuilderContainer.module.css';
import * as actionTypes from '../../store/actionTypes';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilderContainer extends Component {
	state = {
		purchasable: false,
		checkout: false,
		checkoutConfirmed: false,
		loading: false,
		error: false,
	};

	// componentDidMount() {
	// 	axios
	// 		.get('/ingredients.json')
	// 		.then(res => {
	// 			this.setState({ ingredients: res.data });
	// 		})
	// 		.catch(err => {
	// 			this.setState({ error: true });
	// 		});
	// }

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

	render() {
		let burgerComponent = this.state.error ? (
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
							// this.updatePurchaseState(this.props.ingredients);
						}}
						removeIngredientHandler={ig => {
							this.props.removeIngredient(ig, this.props.ingredients[ig]);
							// this.updatePurchaseState(this.props.ingredients);
						}}
						price={this.props.price}
						purchasable={this.updatePurchaseState()}
						clicked={this.checkoutHandler}
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

		if (this.state.loading) {
			orderSum = <Spinner />;
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
		price: state.prices.price,
		ingredients: state.chosenIngredients.ingredients,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addIngredient: ig =>
			dispatch({
				type: actionTypes.ADD_INGREDIENT,
				payload: { ingredient: ig },
			}),
		removeIngredient: (ig, currentQuantity) =>
			dispatch({
				type: actionTypes.REMOVE_INGREDIENT,
				payload: { ingredient: ig, currentQuantity: currentQuantity },
			}),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilderContainer, axios));
