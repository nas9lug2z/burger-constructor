import React, { Component, Fragment } from 'react';
import classes from './ContactData.module.css';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
	};

	goBackHandler = _ => {
		this.props.history.goBack();
	};

	submitHandler = _ => {
		const inputNodeList = document.querySelectorAll('input');
		const inputSummary = {};

		for (let node of inputNodeList) {
			inputSummary[node.name] = node.value;
		}

		this.setState(
			{
				name: inputSummary.name,
				email: inputSummary.email,
				address: {
					street: inputSummary.street,
					postalCode: inputSummary.postalcode,
				},
			},
			_ => console.log(this.state)
		);
	};

	render() {
		return (
			<div className={classes.ContactDataContainer}>
				<h2>Please leave your contact details</h2>
				<form>
					<input type='text' name='name' placeholder='Your Name' />
					<input type='text' name='email' placeholder='Your Email' />
					<input type='text' name='street' placeholder='Your Street' />
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
	}
}

export default ContactData;
