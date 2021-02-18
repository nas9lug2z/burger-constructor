import React, { Component, Fragment } from 'react';
import axios from '../../axios-orders';

import classes from './Orders.module.css';

import Order from './Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
	state = {
		loading: true,
		orders: [],
	};

	componentDidMount() {
		this.setState({ loading: true });
		axios
			.get('/orders.json')
			.then(res => {
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({ ...res.data[key], id: key });
				}
				this.setState({ orders: fetchedOrders, loading: false });
				console.log(fetchedOrders);
			})
			.catch(err => this.setState({ loading: false }));
	}

	render() {
		return (
			<Fragment>
				{this.state.loading ? (
					<Spinner />
				) : (
					<div className={classes.Orders}>
						<h1>Orders</h1>
						{this.state.orders.map((order, index) => (
							<Order order={order} key={order.id} id={index + 1} />
						))}
					</div>
				)}
			</Fragment>
		);
	}
}

export default Orders;
