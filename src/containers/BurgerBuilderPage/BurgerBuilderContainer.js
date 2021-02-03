import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import classes from './BurgerBuilderContainer.module.css';

const PRICES = {
	egg: 1,
	tomatoes: 0.45,
	pickles: 0.35,
	onions: 0.4,
	bacon: 1.2,
	cheese: 1,
	beef: 2.85,
	falafel: 2.15,
	rucola: 0.6,
	lettuce: 0.55,
};
class BurgerBuilderContainer extends Component {
	state = {
		ingredients: {
			egg: 0,
			tomatoes: 0,
			pickles: 0,
			onions: 0,
			bacon: 0,
			cheese: 0,
			beef: 0,
			falafel: 0,
			rucola: 0,
			lettuce: 0,
		},
		price: 4.25,
		purchasable: false,
		checkout: false,
	};

	checkoutHandler = _ => {
		this.setState({ checkout: true });
	};

	checkoutCancelHandler = _ => {
		this.setState({ checkout: false });
	};

	updatePurchaseState(ingredients) {
		const sum = Object.values(ingredients).reduce(
			(accumulator, currentValue) => {
				return accumulator + currentValue;
			},
			0
		);
		if (sum === 0) {
			this.setState({ purchasable: false });
		} else {
			this.setState({ purchasable: true });
		}
	}

	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = updatedCount;
		const oldPrice = this.state.price;
		const updatedPrice = Math.round((oldPrice + PRICES[type]) * 100) / 100;
		this.setState({ ingredients: updatedIngredients, price: updatedPrice });
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount > 0) {
			const updatedCount = oldCount - 1;
			const updatedIngredients = {
				...this.state.ingredients,
			};
			updatedIngredients[type] = updatedCount;
			const oldPrice = this.state.price;
			const updatedPrice = Math.round((oldPrice - PRICES[type]) * 100) / 100;
			this.setState({ ingredients: updatedIngredients, price: updatedPrice });
			this.updatePurchaseState(updatedIngredients);
		}
	};

	render() {
		return (
			<main>
				<h1>Build your own burger!</h1>
				<div className={classes.Container}>
					<BuildControls
						ingredients={this.state.ingredients}
						addIngredientHandler={this.addIngredientHandler}
						removeIngredientHandler={this.removeIngredientHandler}
						price={this.state.price}
						purchasable={this.state.purchasable}
						clicked={this.checkoutHandler}
					/>
					<Burger ingredients={this.state.ingredients} />
					<Modal
						show={this.state.checkout}
						modalClosed={this.checkoutCancelHandler}>
						<OrderSummary
							ingredients={this.state.ingredients}
							price={this.state.price}
							modalClosed={this.checkoutCancelHandler}
						/>
					</Modal>
				</div>
			</main>
		);
	}
}
export default BurgerBuilderContainer;
