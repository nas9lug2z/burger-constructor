import React, { Component, withErrorHandler, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import BurgerBuilderContainer from './containers/BurgerBuilderPage/BurgerBuilderContainer';
import Checkout from './containers/Checkout/Checkout';
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
						<Route path='/orders' component={Orders} />
						<Route path='/auth' component={Auth} />
						<Route path='/checkout' component={Checkout} />
						<Route path='/' component={BurgerBuilderContainer} />
					</Switch>
				</Layout>
			</Fragment>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		checkAuthStatus: _ => dispatch(actions.checkAuthStatus()),
	};
};

export default connect(null, mapDispatchToProps)(App);
