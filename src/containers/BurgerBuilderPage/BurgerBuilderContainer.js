import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
	};

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
		}
	};

	render() {
		// console.log(this.addIngredientHandler('egg'));
		return (
			<main>
				<h1>Build your own burger!</h1>
				<div className={classes.Container}>
					<BuildControls
						ingredients={this.state.ingredients}
						addIngredientHandler={this.addIngredientHandler}
						removeIngredientHandler={this.removeIngredientHandler}
						price={this.state.price}
					/>
					<Burger ingredients={this.state.ingredients} />
				</div>
			</main>
		);
	}
}
export default BurgerBuilderContainer;
