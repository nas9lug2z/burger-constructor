import React, { Component, Fragment } from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import BurgerBuilderContainer from '../../containers/BurgerBuilderPage/BurgerBuilderContainer';

class Layout extends Component {
	state = {
		showSideDrawer: true,
	};

	sideDrawerToggleHandler = _ => {
		console.log('clicked');
		this.setState(prevState => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	sideDrawerClosedHandler = _ => {
		this.setState({ showSideDrawer: false });
	};

	render() {
		return (
			<Fragment>
				<Toolbar
					toggleSideDrawer={this.sideDrawerToggleHandler}
					showSideDrawer={this.state.showSideDrawer}
				/>
				<SideDrawer
					showSideDrawer={this.state.showSideDrawer}
					toggleSideDrawer={this.sideDrawerToggleHandler}
					close={this.sideDrawerClosedHandler}
				/>
				<BurgerBuilderContainer />
			</Fragment>
		);
	}
}

export default Layout;
