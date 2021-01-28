import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';

class BurgerBuilderContainer extends Component {
	state = {
		ingredients: {
			egg: 0,
			tomatoes: 0,
			pickles: 1,
			onions: 0,
			bacon: 1,
			cheese: 0,
			beef: 1,
			falafel: 0,
			rucola: 1,
			lettuce: 1,
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
