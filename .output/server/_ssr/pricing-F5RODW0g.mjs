// node_modules/.nitro/vite/services/ssr/assets/pricing-F5RODW0g.js
/** Subtotal and final total are calculated from server/catalog prices and quantities. */
function orderTotals(items) {
	const subtotal = items.reduce((sum, p) => {
		return sum + (p.unitPrice ?? p.price ?? 0) * (p.quantity ?? 1);
	}, 0);
	return {
		subtotal,
		delivery: 0,
		total: subtotal
	};
}
export { orderTotals };
