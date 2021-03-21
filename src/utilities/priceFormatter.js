const priceFormatter = new Intl.NumberFormat('es-ES', {
	style: 'currency',
	currency: 'EUR',
	minimumFractionDigits: 2,
});
export default priceFormatter;
