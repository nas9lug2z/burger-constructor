import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';

class BurgerBuilderContainer extends Component {
	state = {
		ingredients: {
			beef: 1,
			falafel: 0,
			lettuce: 2,
			tomatoes: 0,
			pickles: 1,
			rucola: 0,
			bacon: 0,
			cheese: 0,
			egg: 0,
			onions: 0,
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
