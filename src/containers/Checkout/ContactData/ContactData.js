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

	stateDeepCopy = _ => {
		return lodash.cloneDeep(this.state);
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
		console.log(`is valid? ${isValid}`);

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
		const inputNodeList = document.querySelectorAll('input');
		const inputSummary = {};

		for (let node of inputNodeList) {
			inputSummary[node.name] = node.value;
		}

		//setting the state with input elements

		this.setState(
			{
				customer: {
					name: inputSummary.name,
					email: inputSummary.email,
					address: {
						street: inputSummary.street,
						postalCode: inputSummary.postalcode,
					},
				},
			},
			_ => console.log(this.state)
		);

		//submitting to the firebase
		const order = {
			ingredients: this.props.location.state.ingredients,
			price: this.props.location.state.price,
			customer: {
				name: inputSummary.name,
				address: {
					street: inputSummary.street,
					postalcode: inputSummary.postalcode,
				},
				email: inputSummary.email,
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
