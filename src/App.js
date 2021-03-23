import React, { Component, withErrorHandler, Fragment, Suspense } from 'react';
import { Route, Switch, Redur } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';

import Layout from './containers/Layout/Layout';
import BurgerBuilderContainer from './containers/BurgerBuilderPage/BurgerBuilderContainer';
// import Checkout from './containers/Checkout/Checkout';
// import ContactData from './containers/Checkout/ContactData/ContactData';

// import Auth from './containers/Auth/Auth';
import Spinner from './components/UI/Spinner/Spinner';
// import Orders from './containers/Orders/Orders';
const Orders = React.lazy(_ => import('./containers/Orders/Orders'));
const Auth = React.lazy(_ => import('./containers/Auth/Auth'));
const Checkout = React.lazy(_ => import('./containers/Checkout/Checkout'));
const ContactData = React.lazy(_ =>
	import('./containers/Checkout/ContactData/ContactData')
);

class App extends Component {
	componentDidMount() {
		this.props.checkAuthStatus();
	}

	render() {
		return (
			<Fragment>
				<Layout>
					<Suspense fallback={<Spinner />}>
						<Switch>
							<Route
								exact
								path='/orders'
								render={props => <Orders {...props} />}
							/>
							<Route exact path='/auth' render={props => <Auth {...props} />} />
							{this.props.authenticated && this.props.purchasable !== 0 ? (
								<Route
									exact
									path='/checkout/contact-data'
									render={props => <ContactData {...props} />}
								/>
							) : null}
							{this.props.authenticated && this.props.purchasable !== 0 ? (
								<Route
									exact
									path='/checkout'
									render={props => <Checkout {...props} />}
								/>
							) : null}
							<Route exact path='/' component={BurgerBuilderContainer} />
							<Route render={_ => <h1>404 Not Found</h1>} />
						</Switch>
					</Suspense>
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
