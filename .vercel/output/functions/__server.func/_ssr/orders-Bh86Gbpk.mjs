import { formatPrice, getPrice, products } from "./products-vOGwWypY.mjs";
// node_modules/.nitro/vite/services/ssr/assets/orders-Bh86Gbpk.js
var ORDERS_STORAGE_KEY = "auvyra:orders";
var LAST_ORDER_KEY = "auvyra:last_order_id";
function generateOrderId() {
	const date = /* @__PURE__ */ new Date();
	return `AUV-${date.getFullYear().toString().slice(-2)}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
}
function validateCustomer(customer, options) {
	const errors = {};
	if (!customer.name || customer.name.trim().length < 2) errors.name = "Please enter your full name (at least 2 characters)";
	if (!customer.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) errors.email = "Please enter a valid email address for digital delivery";
	const phoneDigits = customer.whatsapp.replace(/\D/g, "");
	if (!phoneDigits || phoneDigits.length < 10) errors.whatsapp = "Please enter a valid 10-digit WhatsApp phone number";
	if (options?.requireAddress) {
		if (!customer.address || customer.address.trim().length < 8) errors.address = "Please enter complete delivery street address for physical books";
		if (!customer.city || customer.city.trim().length < 2) errors.city = "Please enter city / town";
		const pin = (customer.pincode || "").replace(/\D/g, "");
		if (!pin || pin.length < 6) errors.pincode = "Please enter a valid 6-digit postal pincode";
	}
	return {
		valid: Object.keys(errors).length === 0,
		errors
	};
}
/** Reads all placed orders from browser localStorage */
function getAllOrders() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
/** Looks up an order by unique order ID */
function getOrderById(orderId) {
	return getAllOrders().find((o) => o.id === orderId) ?? null;
}
/** Saves a newly placed order to local orders history */
function saveOrder(order) {
	if (typeof window === "undefined") return;
	try {
		const updated = [order, ...getAllOrders().filter((o) => o.id !== order.id)];
		window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
		window.localStorage.setItem(LAST_ORDER_KEY, order.id);
	} catch (err) {
		console.error("Failed to save order to localStorage:", err);
	}
}
/** Gets the most recently placed order ID */
function getLastOrderId() {
	if (typeof window === "undefined") return null;
	return window.localStorage.getItem(LAST_ORDER_KEY);
}
/**
* Creates and records a new order from cart items and customer details.
* Calculates prices authoritatively from products data based on edition.
*/
function createOrderFromCart(customer, cartItems) {
	const orderItems = cartItems.map((item) => {
		const product = products.find((p) => p.id === item.id);
		if (!product) throw new Error(`Product not found: ${item.id}`);
		const edition = item.edition || "digital";
		const unitPrice = getPrice(product, edition);
		return {
			id: product.id,
			cartKey: item.cartKey || `${product.id}:${edition}`,
			name: product.name,
			price: unitPrice,
			quantity: item.quantity,
			edition,
			format: product.format,
			category: product.category
		};
	});
	const hasDigitalItems = orderItems.some((i) => i.edition === "digital");
	const hasPhysicalItems = orderItems.some((i) => i.edition === "physical");
	const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const total = subtotal;
	const newOrder = {
		id: generateOrderId(),
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		customer: {
			name: customer.name.trim(),
			email: customer.email.trim(),
			whatsapp: customer.whatsapp.trim(),
			address: customer.address?.trim() || void 0,
			city: customer.city?.trim() || void 0,
			pincode: customer.pincode?.trim() || void 0,
			notes: customer.notes?.trim() || void 0
		},
		items: orderItems,
		hasDigitalItems,
		hasPhysicalItems,
		subtotal,
		total,
		paymentStatus: "pending",
		paymentGateway: "pending_verification",
		deliveryEmailSent: false,
		shippingStatus: hasPhysicalItems ? "pending_verification" : void 0
	};
	saveOrder(newOrder);
	return newOrder;
}
/**
* Updates order payment status when payment is verified.
*/
function setOrderPaymentVerified(orderId) {
	const order = getOrderById(orderId);
	if (!order) return null;
	const updated = {
		...order,
		paymentStatus: "verified",
		deliveryEmailSent: true,
		shippingStatus: order.hasPhysicalItems ? "processing" : void 0
	};
	saveOrder(updated);
	return updated;
}
/**
* Builds formatted text message for customer to share on WhatsApp with AUVYRA
*/
function buildOrderConfirmationMessage(order) {
	const itemsText = order.items.map((item, idx) => {
		const editionTag = item.edition === "physical" ? "PHYSICAL PRINTED BOOK" : "DIGITAL EBOOK (PDF)";
		return `${idx + 1}. ${item.name} [${editionTag}] — Qty: ${item.quantity} × ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`;
	}).join("\n");
	const deliveryNotice = [order.hasDigitalItems ? "• Digital files: Instant access unlocked upon verification" : "", order.hasPhysicalItems ? `• Physical books: Courier shipping to ${order.customer.city || "your address"} (Pincode: ${order.customer.pincode || ""})` : ""].filter(Boolean).join("\n");
	return [
		`*AUVYRA BOOKSTORE ORDER*`,
		`*Order ID:* ${order.id}`,
		`*Date:* ${new Date(order.createdAt).toLocaleDateString()}`,
		``,
		`*Customer Details:*`,
		`Name: ${order.customer.name}`,
		`Email: ${order.customer.email}`,
		`WhatsApp: ${order.customer.whatsapp}`,
		...order.customer.address ? [`Shipping Address: ${order.customer.address}, ${order.customer.city || ""} - ${order.customer.pincode || ""}`] : [],
		...order.customer.notes ? [`Notes: ${order.customer.notes}`] : [],
		``,
		`*Purchased Books:*`,
		itemsText,
		``,
		`*Final Payable Amount:* ${formatPrice(order.total)}`,
		`*Payment Status:* PENDING VERIFICATION`,
		``,
		`*Fulfillment:*`,
		deliveryNotice
	].join("\n");
}
export { buildOrderConfirmationMessage, createOrderFromCart, getLastOrderId, getOrderById, setOrderPaymentVerified, validateCustomer };
