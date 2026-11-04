import { __toESM } from "../_runtime.mjs";
import { BookCover } from "./BookCover-B1Dot2B7.mjs";
import { formatPrice } from "./products-vOGwWypY.mjs";
import { submitCustomerOrderServerFn, useCatalogText, useLanguage, useStore } from "./router-D0crWlZ4.mjs";
import { orderTotals } from "./pricing-F5RODW0g.mjs";
import { createOrderFromCart, validateCustomer } from "./orders-Bh86Gbpk.mjs";
import { require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { Link, useNavigate } from "../_libs/@tanstack/react-router+[2...].mjs";
import { CircleAlert, CircleCheck, FileText, Package, ShoppingBag } from "../_libs/lucide-react.mjs";
import { ArrowLeft } from "../_libs/lucide-react2.mjs";
import { Lock } from "../_libs/lucide-react8.mjs";
import { Mail, Phone, User } from "../_libs/lucide-react9.mjs";
import { ShieldCheck, Truck } from "../_libs/lucide-react11.mjs";
import { Sparkles } from "../_libs/lucide-react12.mjs";
import { require_jsx_dev_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/checkout-CTJBwHBj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/checkout/index.tsx?tsr-split=component";
function CheckoutPage() {
	const { t } = useLanguage();
	const text = useCatalogText();
	const navigate = useNavigate();
	const { cartItems, clearCart } = useStore();
	const hasPhysical = cartItems.some((item) => item.edition === "physical");
	const hasDigital = cartItems.some((item) => item.edition === "digital");
	const [customer, setCustomer] = (0, import_react.useState)({
		name: "",
		email: "",
		whatsapp: "",
		address: "",
		city: "",
		pincode: "",
		notes: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [duplicateGuard, setDuplicateGuard] = (0, import_react.useState)(false);
	const { subtotal, total } = orderTotals(cartItems);
	const handleInputChange = (field, value) => {
		setCustomer((prev) => ({
			...prev,
			[field]: value
		}));
		if (errors[field]) setErrors((prev) => {
			const next = { ...prev };
			delete next[field];
			return next;
		});
	};
	const handlePlaceOrder = async (e) => {
		e.preventDefault();
		if (submitting || duplicateGuard) return;
		const { valid, errors: validationErrors } = validateCustomer(customer, { requireAddress: hasPhysical });
		if (!valid) {
			setErrors(validationErrors);
			const firstErrorField = Object.keys(validationErrors)[0];
			document.getElementById(`checkout-${firstErrorField}`)?.focus();
			return;
		}
		if (cartItems.length === 0) return;
		setSubmitting(true);
		setDuplicateGuard(true);
		try {
			const newOrder = createOrderFromCart(customer, cartItems.map((item) => ({
				id: item.id,
				quantity: item.quantity,
				edition: item.edition,
				cartKey: item.cartKey
			})));
			try {
				await submitCustomerOrderServerFn({ data: { order: {
					id: newOrder.id,
					createdAt: newOrder.createdAt,
					customer: newOrder.customer,
					items: newOrder.items.map((i) => ({
						id: i.id,
						cartKey: i.cartKey,
						name: i.name,
						price: i.price,
						quantity: i.quantity,
						edition: i.edition,
						format: i.format,
						category: i.category
					})),
					hasDigitalItems: newOrder.hasDigitalItems,
					hasPhysicalItems: newOrder.hasPhysicalItems,
					subtotal: newOrder.subtotal,
					total: newOrder.total,
					paymentStatus: newOrder.paymentStatus,
					paymentGateway: newOrder.paymentGateway,
					shippingStatus: newOrder.shippingStatus
				} } });
			} catch (srvErr) {
				console.warn("Server sync deferred:", srvErr);
			}
			clearCart();
			navigate({
				to: "/checkout/success",
				search: { orderId: newOrder.id }
			});
		} catch (err) {
			console.error("Failed to place order:", err);
			setSubmitting(false);
			setDuplicateGuard(false);
		}
	};
	if (cartItems.length === 0) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "min-h-[75vh] bg-[#0B0A10] py-16",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "wrap max-w-lg text-center",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-xl border border-[#49365D] bg-[#21182F] p-10 shadow-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { className: "mx-auto mb-4 h-12 w-12 text-[#B99AF5]/50" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 131,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mb-2 font-serif text-3xl font-medium text-[#F7F4FC]",
						children: t("checkout.emptyCartTitle")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 132,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mb-6 text-sm leading-relaxed text-[#B5ADC5]",
						children: t("checkout.emptyCartMsg")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						hash: "store",
						className: "btn btn-fill w-full",
						children: t("checkout.returnToStore")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 138,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 130,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 129,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 128,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "min-h-[80vh] bg-[#0B0A10] py-10 md:py-16",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "wrap",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-6 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/cart",
						className: "inline-flex items-center gap-2 text-xs font-medium text-[#B5ADC5] transition-colors hover:text-[#B99AF5]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { size: 14 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 150,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("checkout.viewCart") }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 151,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 149,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1.5 text-xs text-[#B99AF5]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { size: 13 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 154,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-mono text-[10px] uppercase tracking-widest",
							children: "256-bit Secure Checkout"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 155,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 153,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 148,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "eyebrow",
							children: "AUVYRA BOOKSTORE"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 163,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "mt-1 font-serif text-[36px] font-normal leading-tight text-[#F7F4FC] md:text-[44px]",
							children: t("checkout.heading")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 164,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 max-w-xl text-sm leading-relaxed text-[#B5ADC5]",
							children: t("checkout.subheading")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 167,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 162,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid items-start gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-12",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-xl sm:p-8",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mb-6 flex items-center gap-2.5 border-b border-[#49365D]/80 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex h-8 w-8 items-center justify-center rounded-md border border-[#49365D] bg-[#140E20] text-[#B99AF5]",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { size: 16 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 178,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 177,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-serif text-2xl font-medium text-[#F7F4FC]",
								children: t("checkout.customerHeading")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 181,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[11px] text-[#B5ADC5]",
								children: hasPhysical && hasDigital ? "For digital download access and physical book shipping" : hasPhysical ? "For physical doorstep book shipping" : "For digital electronic delivery"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 184,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 180,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 176,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
							onSubmit: handlePlaceOrder,
							noValidate: true,
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										htmlFor: "checkout-name",
										className: "mb-1.5 flex items-center justify-between text-xs font-medium text-[#F7F4FC]",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, {
												size: 13,
												className: "text-[#B99AF5]"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 195,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("checkout.fullName") }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 196,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 194,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[10px] uppercase text-[#ff7b72]",
											children: "* Required"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 198,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 193,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										id: "checkout-name",
										type: "text",
										required: true,
										autoComplete: "name",
										value: customer.name,
										onChange: (e) => handleInputChange("name", e.target.value),
										placeholder: t("checkout.fullNamePlaceholder"),
										className: `field w-full ${errors.name ? "!border-[#ff7b72] ring-1 ring-[#ff7b72]/30" : ""}`
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 200,
										columnNumber: 17
									}, this),
									errors.name && /* @__PURE__ */ (void 0)("p", {
										className: "mt-1 flex items-center gap-1 text-[11px] text-[#ff7b72]",
										children: [/* @__PURE__ */ (void 0)(CircleAlert, { size: 12 }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 202,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("span", { children: errors.name }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 203,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 201,
										columnNumber: 33
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 192,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										htmlFor: "checkout-email",
										className: "mb-1.5 flex items-center justify-between text-xs font-medium text-[#F7F4FC]",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, {
												size: 13,
												className: "text-[#B99AF5]"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 211,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("checkout.emailAddress") }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 212,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 210,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[10px] uppercase text-[#ff7b72]",
											children: "* Required"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 214,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 209,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										id: "checkout-email",
										type: "email",
										required: true,
										autoComplete: "email",
										value: customer.email,
										onChange: (e) => handleInputChange("email", e.target.value),
										placeholder: t("checkout.emailPlaceholder"),
										className: `field w-full ${errors.email ? "!border-[#ff7b72] ring-1 ring-[#ff7b72]/30" : ""}`
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 216,
										columnNumber: 17
									}, this),
									errors.email ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 flex items-center gap-1 text-[11px] text-[#ff7b72]",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { size: 12 }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 218,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: errors.email }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 219,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 217,
										columnNumber: 33
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 text-[11px] text-[#837996]",
										children: "Order receipt & digital files will be delivered here."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 220,
										columnNumber: 26
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 208,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										htmlFor: "checkout-whatsapp",
										className: "mb-1.5 flex items-center justify-between text-xs font-medium text-[#F7F4FC]",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, {
												size: 13,
												className: "text-[#B99AF5]"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 229,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("checkout.whatsappNumber") }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 230,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 228,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[10px] uppercase text-[#ff7b72]",
											children: "* Required"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 232,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 227,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										id: "checkout-whatsapp",
										type: "tel",
										required: true,
										autoComplete: "tel",
										value: customer.whatsapp,
										onChange: (e) => handleInputChange("whatsapp", e.target.value),
										placeholder: t("checkout.whatsappPlaceholder"),
										className: `field w-full ${errors.whatsapp ? "!border-[#ff7b72] ring-1 ring-[#ff7b72]/30" : ""}`
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 234,
										columnNumber: 17
									}, this),
									errors.whatsapp ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 flex items-center gap-1 text-[11px] text-[#ff7b72]",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { size: 12 }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 236,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: errors.whatsapp }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 237,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 235,
										columnNumber: 36
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 text-[11px] text-[#837996]",
										children: t("checkout.whatsappHelp")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 238,
										columnNumber: 26
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 226,
									columnNumber: 15
								}, this),
								hasPhysical && /* @__PURE__ */ (void 0)("div", {
									className: "rounded-lg border border-amber-500/30 bg-[#140E20] p-4 space-y-3.5",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-2 text-xs font-medium text-amber-300",
											children: [/* @__PURE__ */ (void 0)(Truck, { size: 15 }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 246,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", { children: [t("checkout.shippingAddress"), " (Physical Books Shipping)"] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 247,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 245,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [
											/* @__PURE__ */ (void 0)("label", {
												htmlFor: "checkout-address",
												className: "mb-1 block text-xs font-medium text-[#F7F4FC]",
												children: ["Door No., Street Address, Area ", /* @__PURE__ */ (void 0)("span", {
													className: "text-[#ff7b72]",
													children: "*"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 252,
													columnNumber: 54
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 251,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("textarea", {
												id: "checkout-address",
												rows: 2,
												required: true,
												value: customer.address || "",
												onChange: (e) => handleInputChange("address", e.target.value),
												placeholder: t("checkout.shippingStreetPlaceholder"),
												className: `field w-full resize-none ${errors.address ? "!border-[#ff7b72]" : ""}`
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 254,
												columnNumber: 21
											}, this),
											errors.address && /* @__PURE__ */ (void 0)("p", {
												className: "mt-1 text-[11px] text-[#ff7b72]",
												children: errors.address
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 255,
												columnNumber: 40
											}, this)
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 250,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
											children: [/* @__PURE__ */ (void 0)("div", { children: [
												/* @__PURE__ */ (void 0)("label", {
													htmlFor: "checkout-city",
													className: "mb-1 block text-xs font-medium text-[#F7F4FC]",
													children: ["City / Town ", /* @__PURE__ */ (void 0)("span", {
														className: "text-[#ff7b72]",
														children: "*"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 261,
														columnNumber: 37
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 260,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (void 0)("input", {
													id: "checkout-city",
													type: "text",
													required: true,
													value: customer.city || "",
													onChange: (e) => handleInputChange("city", e.target.value),
													placeholder: t("checkout.shippingCityPlaceholder"),
													className: `field w-full ${errors.city ? "!border-[#ff7b72]" : ""}`
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 263,
													columnNumber: 23
												}, this),
												errors.city && /* @__PURE__ */ (void 0)("p", {
													className: "mt-1 text-[11px] text-[#ff7b72]",
													children: errors.city
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 264,
													columnNumber: 39
												}, this)
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 259,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", { children: [
												/* @__PURE__ */ (void 0)("label", {
													htmlFor: "checkout-pincode",
													className: "mb-1 block text-xs font-medium text-[#F7F4FC]",
													children: ["Postal Pincode ", /* @__PURE__ */ (void 0)("span", {
														className: "text-[#ff7b72]",
														children: "*"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 269,
														columnNumber: 40
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 268,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (void 0)("input", {
													id: "checkout-pincode",
													type: "text",
													required: true,
													maxLength: 6,
													value: customer.pincode || "",
													onChange: (e) => handleInputChange("pincode", e.target.value.replace(/\D/g, "")),
													placeholder: t("checkout.shippingPincodePlaceholder"),
													className: `field w-full ${errors.pincode ? "!border-[#ff7b72]" : ""}`
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 271,
													columnNumber: 23
												}, this),
												errors.pincode && /* @__PURE__ */ (void 0)("p", {
													className: "mt-1 text-[11px] text-[#ff7b72]",
													children: errors.pincode
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 272,
													columnNumber: 42
												}, this)
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 267,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 258,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 244,
									columnNumber: 31
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									htmlFor: "checkout-notes",
									className: "mb-1.5 block text-xs font-medium text-[#B5ADC5]",
									children: t("checkout.notesLabel")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 279,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
									id: "checkout-notes",
									rows: 2,
									value: customer.notes || "",
									onChange: (e) => handleInputChange("notes", e.target.value),
									placeholder: t("checkout.notesPlaceholder"),
									className: "field w-full resize-none"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 282,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 278,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-lg border border-[#49365D] bg-[#140E20] p-4 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mb-2 flex items-center gap-2 font-medium text-[#B99AF5]",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { size: 14 }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 288,
												columnNumber: 19
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("checkout.paymentHeading") }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 289,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 287,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "leading-relaxed text-[#B5ADC5]",
											children: t("checkout.paymentPendingNotice")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 291,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-2.5 flex items-center gap-2 font-mono text-[11px] text-[#F7F4FC]",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-block h-2 w-2 rounded-full bg-amber-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 295,
												columnNumber: 19
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Status on order placement: ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Pending Verification" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 297,
												columnNumber: 48
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 296,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 294,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 286,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "pt-2",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "submit",
										disabled: submitting || duplicateGuard,
										className: "btn btn-fill w-full !py-3.5 !text-base font-medium shadow-lg",
										children: submitting ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("checkout.placingOrderBtn") }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 305,
											columnNumber: 33
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
											t("checkout.placeOrderBtn"),
											" · ",
											formatPrice(total)
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 305,
											columnNumber: 80
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 304,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 303,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-center gap-2 text-center text-[11px] text-[#837996]",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, {
										size: 14,
										className: "text-[#B99AF5]"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 312,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("checkout.securityGuarantee") }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 313,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 311,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 190,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 175,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
						className: "rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-xl sm:p-7 lg:sticky lg:top-24",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mb-4 flex items-center justify-between border-b border-[#49365D]/80 pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "font-serif text-2xl font-medium text-[#F7F4FC]",
									children: t("checkout.orderSummary")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 321,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono text-xs text-[#B99AF5]",
									children: [
										cartItems.reduce((acc, i) => acc + i.quantity, 0),
										" ",
										t("store.items")
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 324,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 320,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
								className: "mb-6 max-h-[380px] divide-y divide-[#49365D]/60 overflow-y-auto pr-1",
								children: cartItems.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
									className: "flex items-center gap-3.5 py-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "w-12 flex-none sm:w-14",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookCover, {
												product: item,
												size: "sm"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 333,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 332,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "block truncate font-serif text-base font-medium text-[#F7F4FC]",
												children: text.name(item)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 336,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-1.5 mt-0.5",
												children: [
													item.edition === "physical" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "inline-flex items-center gap-1 text-[10px] font-mono text-amber-300",
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { size: 11 }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 341,
															columnNumber: 27
														}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Physical Book" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 342,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 340,
														columnNumber: 54
													}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "inline-flex items-center gap-1 text-[10px] font-mono text-[#B99AF5]",
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { size: 11 }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 344,
															columnNumber: 27
														}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Digital PDF" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 345,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 343,
														columnNumber: 35
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "text-[#49365D]",
														children: "•"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 347,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "text-[11px] text-[#B5ADC5]",
														children: ["Qty ", item.quantity]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 348,
														columnNumber: 23
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 339,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 335,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-right font-serif text-base font-medium text-[#F7F4FC] tabular-nums",
											children: formatPrice(item.unitPrice * item.quantity)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 351,
											columnNumber: 19
										}, this)
									]
								}, item.cartKey, true, {
									fileName: _jsxFileName,
									lineNumber: 331,
									columnNumber: 38
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 330,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "border-t border-[#49365D] pt-4 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-baseline justify-between text-[#B5ADC5]",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("cart.productSubtotal") }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 360,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-medium text-[#F7F4FC] tabular-nums",
											children: formatPrice(subtotal)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 361,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 359,
										columnNumber: 15
									}, this),
									hasDigital && /* @__PURE__ */ (void 0)("div", {
										className: "mt-2 flex items-baseline justify-between text-[#B5ADC5]",
										children: [/* @__PURE__ */ (void 0)("span", { children: "Digital Delivery (Email / WhatsApp)" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 367,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-medium text-[#B99AF5]",
											children: t("cart.included")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 368,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 366,
										columnNumber: 30
									}, this),
									hasPhysical && /* @__PURE__ */ (void 0)("div", {
										className: "mt-2 flex items-baseline justify-between text-[#B5ADC5]",
										children: [/* @__PURE__ */ (void 0)("span", { children: "Physical Shipping (Doorstep Courier)" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 372,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-medium text-amber-300",
											children: "Free / Included"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 373,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 371,
										columnNumber: 31
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-4 flex items-baseline justify-between border-t border-[#49365D] pt-4",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "eyebrow text-xs",
											children: t("cart.finalTotal")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 377,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-serif text-3xl font-medium text-[#F7F4FC] tabular-nums",
											children: formatPrice(total)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 378,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 376,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 358,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-6 rounded-lg border border-[#49365D]/80 bg-[#140E20] p-3 text-[11px] leading-relaxed text-[#B5ADC5]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mb-1 flex items-center gap-1.5 font-medium text-[#B99AF5]",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { size: 13 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 387,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Order Fulfillment Guarantee" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 388,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 386,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: hasPhysical && hasDigital ? "Digital files will be unlocked upon payment verification, and physical books will be shipped to your address." : hasPhysical ? "Physical books are safely packed and dispatched with tracking after payment verification." : "Digital files and receipts will be delivered immediately upon payment verification." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 390,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 385,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 319,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 173,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 146,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 145,
		columnNumber: 10
	}, this);
}
export { CheckoutPage as component };
