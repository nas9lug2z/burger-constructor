import React, { Component, Fragment } from 'react';
import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './BurgerBuilderContainer.module.css';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

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
		ingredients: null,
		price: 4.25,
		purchasable: false,
		checkout: false,
		checkoutConfirmed: false,
		loading: false,
		error: false,
	};

	componentDidMount() {
		axios
			.get('/ingredients.json')
			.then(res => {
				this.setState({ ingredients: res.data });
			})
			.catch(err => {
				this.setState({ error: true });
			});
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
		this.setState({
			ingredients: updatedIngredients,
			price: updatedPrice,
		});
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
			this.setState({
				ingredients: updatedIngredients,
				price: updatedPrice,
			});
			this.updatePurchaseState(updatedIngredients);
		}
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

	checkoutHandler = _ => {
		this.setState({ checkout: true });
	};

	checkoutCancelHandler = _ => {
		this.setState({ checkout: false });
	};

	checkoutContinueHandler = _ => {
		// this.setState({ loading: true });
		// const date = new Date();
		// const order = {
		// 	ingredient: this.state.ingredients,
		// 	price: this.state.price,
		// 	customer: {
		// 		name: 'Nastia',
		// 		address: {
		// 			street: 'Street 4',
		// 			zipcode: '4555',
		// 			country: 'Spain',
		// 		},
		// 		email: 'test@example.com',
		// 	},
		// 	deliveryMethod: 'fastest',
		// 	date: date,
		// };
		// axios
		// 	.post('/orders.json', order)
		// 	.then(res =>
		// 		this.setState({
		// 			loading: false,
		// 			checkout: false,
		// 			checkoutConfirmed: true,
		// 		})
		// 	)
		// 	.catch(err =>
		// 		this.setState({
		// 			loading: false,
		// 			checkout: false,
		// 			checkoutConfirmed: false,
		// 		})
		// 	);

		const transformedIngredients = [];

		for (let ingredient in this.state.ingredients) {
			if (this.state.ingredients[ingredient] !== 0) {
				transformedIngredients.push(
					`${encodeURIComponent(ingredient)}=${encodeURIComponent(
						this.state.ingredients[ingredient]
					)}`
				);
			}
		}

		this.props.history.push({
			pathname: '/checkout',
			search: `?${transformedIngredients.join('&')}`,
		});
	};

	render() {
		let burgerComponent = this.state.error ? (
			<p>Ingredients can't be loaded!</p>
		) : (
			<Spinner />
		);

		let orderSum = null;

		if (this.state.ingredients) {
			burgerComponent = (
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
				</div>
			);
			orderSum = (
				<OrderSummary
					ingredients={this.state.ingredients}
					price={this.state.price}
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

export default withErrorHandler(BurgerBuilderContainer, axios);
