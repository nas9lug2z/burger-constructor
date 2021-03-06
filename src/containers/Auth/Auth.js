import React, { Component, Fragment } from 'react';
import lodash from 'lodash';
import { connect } from 'react-redux';

import inputValidation from '../../utilities/validation/inputValidation';
import formValidation from '../../utilities/validation/formValidation';
import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Login from './Login/Login';
import Register from './Register/Register';
import Logout from './Logout/Logout';

class Auth extends Component {
	state = {
		formValid: false,
		isSignedUp: true,
		fields: {
			email: {
				value: '',
				htmlTag: 'input',
				htmlTagConfig: {
					type: 'email',
					placeholder: 'Email Address',
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
			password: {
				value: '',
				htmlTag: 'input',
				htmlTagConfig: {
					type: 'password',
					placeholder: 'Password (min. 8 characters)',
				},
				validation: {
					validated: false,
					rules: {
						minLength: 8,
					},
				},
				touchedbyuser: false,
			},
		},
	};

	inputChangeHandler = e => {
		const elName = e.target.name;
		let fieldsDeepCopy = lodash.cloneDeep(this.state.fields);

		fieldsDeepCopy[elName].value = e.target.value;
		fieldsDeepCopy[elName].validation.validated = inputValidation(
			e.target.value,
			fieldsDeepCopy[elName].validation.rules
		);
		fieldsDeepCopy[elName].touchedbyuser = true;

		const isFormValid = formValidation(fieldsDeepCopy);

		this.setState({ fields: fieldsDeepCopy, formValid: isFormValid });
	};

	authHandler = _ => {
		this.props.auth(
			this.state.fields.email.value,
			this.state.fields.password.value,
			this.state.isSignedUp
		);
	};

	switchAuthMethodHandler = _ => {
		this.setState(prevState => {
			return { isSignedUp: !prevState.isSignedUp };
		});
	};

	render() {
		const deepCopyFields = Object.entries(lodash.cloneDeep(this.state.fields));

		const inputFieldsEl = deepCopyFields.map((elem, index) => {
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

		let authFormEl = (
			<Fragment>
				{this.state.isSignedUp ? (
					<Login
						submit={this.authHandler}
						switchAuthMethod={this.switchAuthMethodHandler}>
						{inputFieldsEl}
					</Login>
				) : (
					<Register
						submit={this.authHandler}
						switchAuthMethod={this.switchAuthMethodHandler}>
						{inputFieldsEl}
					</Register>
				)}
			</Fragment>
		);

		if (this.props.authenticated) {
			authFormEl = (
				<Logout
					logout={this.props.logout}
					purchasable={this.props.purchasable}
					checkoutContinue={_ => this.props.history.push('/checkout')}
				/>
			);
		}

		return (
			<div className='pageContainer'>
				{this.props.loading ? <Spinner /> : authFormEl}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		authenticated: state.auth.tokenId !== null,
		purchasable: state.ingredients.totalIgCount,
	};
};

const mapDispatchToProp = dispatch => {
	return {
		auth: (email, password, isSignedUp) =>
			dispatch(actions.auth(email, password, isSignedUp)),
		logout: _ => dispatch(actions.logout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProp)(Auth);
