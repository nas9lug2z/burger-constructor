import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import classes from './BurgerBuilderContainer.module.css';
class BurgerBuilderContainer extends Component {
	state = {
		ingredients: {
			egg: 1,
			tomatoes: 2,
			pickles: 0,
			onions: 0,
			bacon: 1,
			cheese: 1,
			beef: 0,
			falafel: 0,
			rucola: 1,
			lettuce: 0,
		},
		price: 4.5,
	};

	render() {
		return (
			<main>
				<h1>Build your own burger!</h1>
				<div className={classes.Container}>
					<BuildControls ingredients={this.state.ingredients} />
					<Burger ingredients={this.state.ingredients} />
				</div>
				<p>Price: {this.state.price}€</p>
				<button>Checkout</button>
			</main>
		);
	}
}
export default BurgerBuilderContainer;
