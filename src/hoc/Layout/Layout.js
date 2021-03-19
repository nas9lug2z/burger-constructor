import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	sideDrawerToggleHandler = _ => {
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
					authenticated={this.props.authenticated}
				/>
				<SideDrawer
					showSideDrawer={this.state.showSideDrawer}
					toggleSideDrawer={this.sideDrawerToggleHandler}
					close={this.sideDrawerClosedHandler}
					authenticated={this.props.authenticated}
				/>
				<div className='body'>{this.props.children}</div>
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		authenticated: state.auth.tokenId,
	};
};

const mapDispatchToProp = dispatch => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProp)(Layout);
