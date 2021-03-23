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
					orderPosted={this.props.orderPosted}
					resetOrder={this.props.resetOrder}
					close={this.sideDrawerClosedHandler}
				/>
				<SideDrawer
					showSideDrawer={this.state.showSideDrawer}
					toggleSideDrawer={this.sideDrawerToggleHandler}
					close={this.sideDrawerClosedHandler}
					orderPosted={this.props.orderPosted}
					authenticated={this.props.authenticated}
					resetOrder={this.props.resetOrder}
				/>
				<div className='body'>{this.props.children}</div>
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		authenticated: state.auth.tokenId,
		orderPosted: state.order.orderPosted,
	};
};

const mapDispatchToProp = dispatch => {
	return {
		resetOrder: _ => dispatch(actions.resetOrder()),
	};
};

export default connect(mapStateToProps, mapDispatchToProp)(Layout);
