import React, { Component, Fragment } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import classes from './Orders.module.css';
import * as orderListActions from '../../store/actions/ordersListActions';

import Order from './Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
	componentDidMount() {
		this.props.fetchOrders(this.props.tokenId, this.props.userId);
	}

	render() {
		let orders = null;

		if (this.props.orders) {
			const transformedOrders = Object.entries({ ...this.props.orders }).map(
				order => order[1]
			);

			orders = (
				<div className={classes.Orders}>
					<h1>My Orders</h1>
					{transformedOrders.map((order, index) => (
						<Order order={order} key={order.id} id={index + 1} />
					))}
				</div>
			);
		}

		return <Fragment>{this.props.loading ? <Spinner /> : orders}</Fragment>;
	}
}

const mapStateToProps = state => {
	return {
		orders: state.orderList.orders,
		error: state.orderList.error,
		loading: state.orderList.loading,
		tokenId: state.auth.tokenId,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchOrders: (accessToken, userId) =>
			dispatch(orderListActions.fetchOrders(accessToken, userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
