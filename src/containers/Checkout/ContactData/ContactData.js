import React, { Component, Fragment } from 'react';
import axios from '../../../axios-orders';
import { withRouter } from 'react-router-dom';
import classes from './ContactData.module.css';

import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component {
	state = {
		// customer: {
		// 	name: '',
		// 	email: '',
		// 	address: {
		// 		street: '',
		// 		postalCode: '',
		// 	},
		// },
		loading: false,
		orderPosted: false,
	};

	goBackHandler = _ => {
		this.props.history.goBack();
	};

	submitHandler = _ => {
		this.setState({ loading: true });
		const inputNodeList = document.querySelectorAll('input');
		const inputSummary = {};

		for (let node of inputNodeList) {
			inputSummary[node.name] = node.value;
		}
		// this.setState(
		// 	{
		// 		customer: {
		// 			name: inputSummary.name,
		// 			email: inputSummary.email,
		// 			address: {
		// 				street: inputSummary.street,
		// 				postalCode: inputSummary.postalcode,
		// 			},
		// 		},
		// 	},
		// 	_ => console.log(this.state)
		// );

		const date = new Date();
		const order = {
			ingredient: this.props.location.state.ingredients,
			price: this.props.location.state.price,
			customer: {
				name: inputSummary.name,
				address: {
					street: inputSummary.street,
					postalcode: inputSummary.postalcode,
				},
				email: inputSummary.email,
			},
			deliveryMethod: 'fastest',
			date: date,
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

	render() {
		const contactDataEl = (
			<div className={classes.ContactDataContainer}>
				<h2>Please leave your contact details</h2>{' '}
				<form>
					<input type='text' name='name' placeholder='Your Name' />{' '}
					<input type='text' name='email' placeholder='Your Email' />{' '}
					<input type='text' name='street' placeholder='Your Street' />{' '}
					<input type='text' name='postalcode' placeholder='Your Postalcode' />
				</form>
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
