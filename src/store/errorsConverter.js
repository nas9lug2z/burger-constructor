import { Fragment } from 'react';

const emailExists = (
	<Fragment>
		<h2>An account with this email address exists. Please log in</h2>
	</Fragment>
);

const errorConverter = errorMessage => {
	switch (errorMessage) {
		case 'EMAIL_EXISTS':
			return emailExists;
		default:
			return 'An error has occured';
	}
};

export default errorConverter;
