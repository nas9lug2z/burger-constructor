import React, { Component, Fragment } from 'react';
import axios from '../../../axios-orders';
import lodash, { indexOf } from 'lodash';
import { withRouter } from 'react-router-dom';
import classes from './ContactData.module.css';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { element } from 'prop-types';
class ContactData extends Component {
	state = {
		loading: false,
		orderPosted: false,
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
							onlyNumberChars: true,
						},
					},
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
							minLength: 3,
							requiredChars: ['@', '.'],
						},
					},
				},
			},
		},
	};

	inputValidation = (value, element) => {
		console.log('validation');
		let isValid = false;
		const inputValue = value.trim();

		if (element.validation.rules.minLength) {
			isValid = inputValue.length >= element.validation.rules.minLength;
		}
		//MORE RULES TO BE IMPLEMENTED

		// if (element.validation.rules.requiredChars) {
		// 	let check = 0;
		// 	for (let char of element.validation.rules.requiredChars) {
		// 		if (inputValue.includes(char)) {
		// 			check += 1;
		// 		}
		// 	}

		// 	isValid = inputValue.length === check;
		// }
		return isValid;
	};

	inputChangeHandler = e => {
		const elName = e.target.name;
		const value = e.target.value;
		let orderCopy = lodash.cloneDeep(this.state.order);

		orderCopy.customer[elName].value = value;
		orderCopy.customer[elName].validation.validated = this.inputValidation(
			value,
			orderCopy.customer[elName]
		);

		this.setState({ order: orderCopy });
	};

	submitHandler = _ => {
		this.setState({ loading: true });

		//submitting to the firebase
		const order = {
			ingredients: this.state.order.ingredients,
			price: this.state.order.price,
			customer: {
				name: this.state.order.customer.name,
				address: {
					street: this.state.order.customer.street,
					postalcode: this.state.order.customer.postalcode,
				},
				email: this.state.order.customer.email,
			},
		};
		axios
			.post('/orders.json', order)
			.then(res =>
				this.setState(
					{
						loading: false,
						orderPosted: true,
					},
					_ => this.props.history.replace('/')
				)
			)
			.catch(err =>
				this.setState({
					loading: false,
					orderPosted: false,
				})
			);
	};

	goBackHandler = _ => {
		this.props.history.goBack();
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
				/>
			);
		});

		const contactDataEl = (
			<div className={classes.ContactDataContainer}>
				<h2>Please leave your contact details</h2>
				<form>{inputComponents}</form>
				<button onClick={this.goBackHandler} className='black-button'>
					Cancel
				</button>
				<button onClick={this.submitHandler} className='black-button'>
					Place order
				</button>
			</div>
		);

		return (
			<Fragment>{this.state.loading ? <Spinner /> : contactDataEl}</Fragment>
		);
	}
}

export default ContactData;
