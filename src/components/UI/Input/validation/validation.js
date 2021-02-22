const validation = {
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

export default validation;
