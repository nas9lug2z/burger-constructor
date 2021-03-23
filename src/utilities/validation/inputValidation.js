const inputValidation = (value, rules) => {
	const inputValue = value.trim();
	let isValid = true;

	if (rules.onlyNumberChars && isValid) {
		isValid = validationRules.checkNumbersOnly(inputValue);
	}

	if (rules.requiredChars && isValid) {
		isValid = validationRules.checkRequiredChars(
			inputValue,
			rules.requiredChars
		);
	}

	if (rules.minLength && isValid) {
		isValid = validationRules.checkMinLength(inputValue, rules.minLength);
	}

	if (rules.maxLength && isValid) {
		isValid = validationRules.checkMaxLength(inputValue, rules.maxLength);
	}

	return isValid;
};

const validationRules = {
	checkMinLength(value, rule) {
		return value.length >= rule;
	},

	checkMaxLength(value, rule) {
		return value.length <= rule;
	},

	checkRequiredChars(value, rule) {
		let check = 0;
		for (let char of rule) {
			if (value.includes(char)) {
				check += 1;
			}
		}
		return rule.length === check;
	},

	checkNumbersOnly(value) {
		const numbers = /^[0-9]+$/;
		return value.match(numbers);
	},
};

export default inputValidation;
