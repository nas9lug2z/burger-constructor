import React, { Component, Fragment } from 'react';
import lodash from 'lodash';
import { connect } from 'react-redux';

import inputValidation from '../../../components/UI/Input/validation/inputValidation';
import formValidation from '../../../components/UI/Input/validation/formValidation';
import * as actions from '../../../store/actions/index';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
	state = {
		orderPosted: false,
		formValid: false,
		order: {
			ingredients: this.props.location.state.ingredients,
			price: this.props.location.state.price,
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

				email: {
					value: '',
					htmlTag: 'input',
					htmlTagConfig: {
						type: 'email',
						placeholder: 'Your Email',
					},
					validation: {
						validated: false,
						rules: {
							minLength: 8,
							requiredChars: ['@', '.'],
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
			Object.entries({ ...this.props.ingredients }).filter(
				elem => elem[1] !== 0
			)
		);

		//submitting to the firebase
		const order = {
			userId: this.props.userId,
			ingredients: reducedIngredients,
			price: this.props.price,
			customer: {
				name: this.state.order.customer.name.value,
				address: {
					street: this.state.order.customer.street.value,
					postalcode: this.state.order.customer.postalcode.value,
				},
				email: this.state.order.customer.email.value,
			},
		};
		this.props.submitOrder(order, this.props.accessToken);
	};

	goBackHandler = _ => {
		this.props.history.goBack();
	};

	goHomeHandler = _ => {
		this.props.history.replace('/');
		this.props.resetOrder();
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
					<h3>Your order price: {this.props.price}</h3>
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
		price: state.prices.initialPrice,
		ingredients: state.chosenIngredients.ingredients,
		orderPosted: state.order.orderPosted,
		order: state.order.order,
		orderError: state.order.error,
		errorMessage: state.order.errorMessage,
		loading: state.order.loading,
		userId: state.auth.userId,
		accessToken: state.auth.tokenId,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		submitOrder: (order, token) => dispatch(actions.submitOrder(order, token)),
		resetOrder: _ => dispatch(actions.resetOrder()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
