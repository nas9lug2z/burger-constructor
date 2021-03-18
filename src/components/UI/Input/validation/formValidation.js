import lodash from 'lodash';

const formValidation = formFields => {
	let isFormValid = true;
	const transformedFields = Object.entries(lodash.cloneDeep(formFields));
	return transformedFields.every(
		field => field[1].validation.validated && isFormValid
	);
};

export default formValidation;
