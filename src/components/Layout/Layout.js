import React, { Fragment } from 'react';

import BurgerBuilderContainer from '../../containers/BurgerBuilderPage/BurgerBuilderContainer';

const Layout = props => {
	return (
		<Fragment>
			<p>Navbar</p>
			<BurgerBuilderContainer />
		</Fragment>
	);
};

export default Layout;
