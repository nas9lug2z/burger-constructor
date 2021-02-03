import React, { Fragment } from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import BurgerBuilderContainer from '../../containers/BurgerBuilderPage/BurgerBuilderContainer';

const Layout = props => {
	return (
		<Fragment>
			<Toolbar />
			<BurgerBuilderContainer />
		</Fragment>
	);
};

export default Layout;
