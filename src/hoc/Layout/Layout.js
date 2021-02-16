import React, { Component, Fragment } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false,
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
				<body>{this.props.children}</body>
			</Fragment>
		);
	}
}

export default Layout;