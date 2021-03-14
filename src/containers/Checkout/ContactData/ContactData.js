import React, { Component, Fragment } from 'react';
import axios from '../../../axios-orders';
import lodash from 'lodash';
import { connect } from 'react-redux';

import classes from './ContactData.module.css';
import validationRules from '../../../components/UI/Input/validation/validation';
import * as orderCheckoutActions from '../../../store/actions/orderCheckoutActions';

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
					touchedByUser: false,
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
					touchedByUser: false,
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
					touchedByUser: false,
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
					touchedByUser: false,
				},
			},
		},
	};

	inputValidation = (value, element) => {
		const inputValue = value.trim();
		const rules = element.validation.rules;
		let isValid = true;

		if (rules.onlyNumberChars && isValid) {
			isValid = validationRules.checkNumbersOnly(inputValue);
		}

		if (rules.requiredChars && isValid) {
			isValid = validationRules.checkRequiredChars(
				inputValue,
				rules.requiredChars
			);
		}

		if (rules.minLength && isValid) {
			isValid = validationRules.checkMinLength(inputValue, rules.minLength);
		}

		if (rules.maxLength && isValid) {
			isValid = validationRules.checkMaxLength(inputValue, rules.maxLength);
		}

		return isValid;
	};

	formValidation = formFields => {
		let isFormValid = true;
		const transformedFields = Object.entries(lodash.cloneDeep(formFields));
		return transformedFields.every(
			field => field[1].validation.validated && isFormValid
		);
	};

	inputChangeHandler = e => {
		const elName = e.target.name;
		const value = e.target.value;
		let orderCopy = lodash.cloneDeep(this.state.order);

		//set value in the order copy and validate it
		orderCopy.customer[elName].value = value;
		orderCopy.customer[elName].validation.validated = this.inputValidation(
			value,
			orderCopy.customer[elName]
		);
		orderCopy.customer[elName].touchedByUser = true;

		//validate the whole form
		const isFormValid = this.formValidation(orderCopy.customer);

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
		this.props.submitOrder(order);
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
					isRequired={elemProperties.validation}
					changed={this.inputChangeHandler}
					touchedByUser={elemProperties.touchedByUser}
				/>
			);
		});

		let contactDataEl = (
			<div className={classes.ContactDataContainer}>
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
				<div className={classes.ContactDataContainer}>
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
				<div className={classes.ContactDataContainer}>
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
	};
};

const mapDispatchToProps = dispatch => {
	return {
		submitOrder: order => dispatch(orderCheckoutActions.submitOrder(order)),
		resetOrder: _ => dispatch(orderCheckoutActions.resetOrder()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
