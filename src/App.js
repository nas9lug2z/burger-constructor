import React, { Component, withErrorHandler, Fragment } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilderContainer from './containers/BurgerBuilderPage/BurgerBuilderContainer';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<Fragment>
				<Layout>
					<Switch>
						<Route path='/orders' component={Orders} />
						<Route path='/checkout' component={Checkout} />
						<Route path='/' component={BurgerBuilderContainer} />
					</Switch>
				</Layout>
			</Fragment>
		);
	}
}

export default App;
