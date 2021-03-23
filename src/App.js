import React, { Component, withErrorHandler, Fragment } from 'react';
import { Route, Switch, Redur } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';

import Layout from './containers/Layout/Layout';
import BurgerBuilderContainer from './containers/BurgerBuilderPage/BurgerBuilderContainer';
import Checkout from './containers/Checkout/Checkout';
import ContactData from './containers/Checkout/ContactData/ContactData';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {
	componentDidMount() {
		this.props.checkAuthStatus();
	}

	render() {
		return (
			<Fragment>
				<Layout>
					<Switch>
						<Route exact path='/orders' component={Orders} />
						<Route exact path='/auth' component={Auth} />
						{this.props.authenticated && this.props.purchasable !== 0 ? (
							<Route
								exact
								path='/checkout/contact-data'
								component={ContactData}
							/>
						) : null}
						{this.props.authenticated && this.props.purchasable !== 0 ? (
							<Route exact path='/checkout' component={Checkout} />
						) : null}
						<Route exact path='/' component={BurgerBuilderContainer} />
						<Route render={_ => <h1>404 Not Found</h1>} />
					</Switch>
				</Layout>
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		authenticated: state.auth.tokenId !== null,
		purchasable: state.ingredients.totalIgCount,
		orderPosted: state.order.orderPosted,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		checkAuthStatus: _ => dispatch(actions.checkAuthStatus()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
