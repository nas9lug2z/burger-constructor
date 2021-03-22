import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import lodash from 'lodash';
import inputValidation from '../../../components/UI/Input/validation/inputValidation';
import formValidation from '../../../components/UI/Input/validation/formValidation';
import * as actions from '../../../store/actions/index';
import priceFormatter from '../../../utilities/priceFormatter';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
	state = {
		formValid: false,
		order: {
			ingredients: this.props.chosenIngredients,
			price: this.props.totalOrderPrice,
			customer: {
				name: {
					value: '',
					htmlTag: 'input',
					htmlTagConfig: {
						type: 'text',
						placeholder: 'Your Name',
					},
					validation: {
						validated: false,
						rules: {
							minLength: 3,
						},
					},
					touchedbyuser: false,
				},

				street: {
					value: '',
					htmlTag: 'input',
					htmlTagConfig: {
						type: 'text',
						placeholder: 'Your Street',
					},
					validation: {
						validated: false,
						rules: {
							minLength: 8,
						},
					},
					touchedbyuser: false,
				},

				postalcode: {
					value: '',
					htmlTag: 'input',
					htmlTagConfig: {
						type: 'text',
						placeholder: 'Postal Code',
					},
					validation: {
						validated: false,
						rules: {
							minLength: 4,
							onlyNumberChars: true,
						},
					},
					touchedbyuser: false,
				},
			},
		},
	};

	inputChangeHandler = e => {
		const elName = e.target.name;
		const value = e.target.value;
		let orderCopy = lodash.cloneDeep(this.state.order);

		//set value in the order copy and validate it
		orderCopy.customer[elName].value = value;
		orderCopy.customer[elName].validation.validated = inputValidation(
			value,
			orderCopy.customer[elName].validation.rules
		);
		orderCopy.customer[elName].touchedbyuser = true;

		//validate the whole form
		const isFormValid = formValidation(orderCopy.customer);

		this.setState({ order: orderCopy, formValid: isFormValid });
	};

	submitHandler = _ => {
		//remove ingredients with 0:
		let reducedIngredients = Object.fromEntries(
			Object.entries({ ...this.props.chosenIngredients }).filter(
				elem => elem[1] !== 0
			)
		);

		//submitting to the firebase
		const order = {
			userId: this.props.userId,
			ingredients: reducedIngredients,
			price: this.props.totalOrderPrice,
			customer: {
				name: this.state.order.customer.name.value,
				email: this.props.userEmail,
				address: {
					street: this.state.order.customer.street.value,
					postalcode: this.state.order.customer.postalcode.value,
				},
			},
		};
		this.props.submitOrder(order, this.props.accessToken);
		this.redirectHomeTimeout();
	};

	goBackHandler = _ => {
		this.props.history.goBack();
	};

	redirectHomeTimeout = _ => {
		setTimeout(_ => this.goHomeHandler(), 10000);
	};

	goHomeHandler = _ => {
		this.props.resetOrder();
		this.props.history.replace('/');
	};

	render() {
		const extractedInputElements = Object.entries(
			lodash.cloneDeep(this.state.order.customer)
		);
		const inputComponents = extractedInputElements.map((elem, index) => {
			const [elemName, elemProperties] = elem;
			return (
				<Input
					key={elemName + index}
					name={elemName}
					htmltag={elemProperties.htmlTag}
					type={elemProperties.htmlTagConfig.type}
					placeholder={elemProperties.htmlTagConfig.placeholder}
					isrequired={elemProperties.validation}
					changed={this.inputChangeHandler}
					touchedbyuser={elemProperties.touchedbyuser}
				/>
			);
		});

		let contactDataEl = (
			<div className='pageContainer'>
				<h2>Please leave your contact details</h2>
				<form>{inputComponents}</form>
				<button onClick={this.goBackHandler} className='black-button'>
					Cancel
				</button>
				<button
					onClick={this.submitHandler}
					className='black-button'
					disabled={!this.state.formValid}>
					Place order
				</button>
			</div>
		);

		if (this.props.orderError) {
			contactDataEl = (
				<div className='pageContainer'>
					<h2>There was an error processing your order.</h2>
					<h3>Order message: {this.props.orderError}</h3>
					<button onClick={this.goHomeHandler} className='black-button'>
						Return to the home page
					</button>
				</div>
			);
		}

		if (this.props.orderPosted) {
			contactDataEl = (
				<div className='pageContainer'>
					<h2>Your order has been sent to the restaurant!</h2>
					<h3>
						Your order price:{' '}
						{priceFormatter.format(this.props.totalOrderPrice)}
					</h3>
					<p>You will be redirected to the Home page in X seconds</p>
					<button onClick={this.goHomeHandler} className='black-button'>
						Return to the home page
					</button>
				</div>
			);
		}

		return (
			<Fragment>{this.props.loading ? <Spinner /> : contactDataEl}</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		totalOrderPrice: state.prices.totalOrderPrice,
		chosenIngredients: state.ingredients.chosenIngredients,
		orderPosted: state.order.orderPosted,
		orderError: state.order.error,
		errorMessage: state.order.errorMessage,
		loading: state.order.loading,
		userId: state.auth.userId,
		accessToken: state.auth.tokenId,
		userEmail: state.auth.email,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		submitOrder: (order, token) => dispatch(actions.submitOrder(order, token)),
		resetOrder: _ => dispatch(actions.resetOrder()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
