import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';

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
		price: 4.5,
	};

	render() {
		return (
			<Fragment>
				<h1>Build your own burger!</h1>
				<div>
					<p>Build controls</p>
					<Burger ingredients={this.state.ingredients} />
				</div>
				<p>Price</p>
				<button>Checkout</button>
			</Fragment>
		);
	}
}
export default BurgerBuilderContainer;
