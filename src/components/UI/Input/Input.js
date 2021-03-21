import React, { Fragment } from 'react';
import classes from './Input.module.css';

const Input = props => {
	let inputEl = null;

	switch (props.htmltag) {
		case 'input':
			inputEl = (
				<input
					className={classes.Input}
					name={props.name}
					type={props.type}
					placeholder={props.placeholder}
					onChange={props.changed}
				/>
			);
			break;
		case 'textarea':
			inputEl = (
				<textarea
					className={classes.Input}
					{...props}
					onChange={props.changed}
				/>
			);
			break;
		default:
			inputEl = (
				<input className={classes.Input} {...props} onChange={props.changed} />
			);
	}

	return (
		<Fragment>
			<label className={classes.Label}></label>
			{inputEl}
			{props.isrequired && props.touchedbyuser ? (
				!props.isrequired.validated ? (
					<span className={classes.Validation}>*This field is requiered</span>
				) : null
			) : null}
		</Fragment>
	);
};

export default Input;
