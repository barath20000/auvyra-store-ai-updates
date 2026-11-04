import { categories, formatPrice } from "./products-vOGwWypY.mjs";
import { BookCover } from "./BookCover-B1Dot2B7.mjs";
import { useCatalogText, useLanguage, useStore } from "./router-D0crWlZ4.mjs";
import { orderTotals } from "./pricing-F5RODW0g.mjs";
import { Link, useNavigate } from "../_libs/@tanstack/react-router+[2...].mjs";
import { ArrowRight } from "../_libs/lucide-react3.mjs";
import { BookOpen, FileText, Minus, Package, Plus, ShoppingBag, X } from "../_libs/lucide-react.mjs";
import { require_jsx_dev_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/cart-CnCOmptC.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$2 = "/app/applet/src/components/CheckoutButton.tsx";
function CheckoutButton({ items, label, className = "" }) {
	const navigate = useNavigate();
	const { addToCart, inCart } = useStore();
	const handleCheckout = () => {
		for (const item of items) if (!inCart(item.id, item.edition)) addToCart(item.id, item.edition);
		navigate({ to: "/checkout" });
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
			type: "button",
			disabled: items.length === 0,
			onClick: handleCheckout,
			className: "btn btn-fill w-full gap-2 !py-3 font-medium shadow-md transition-all hover:shadow-[0_4px_16px_rgba(120,81,216,0.35)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { size: 16 }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 35,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: label }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 36,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, {
					size: 14,
					className: "opacity-80"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 37,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 29,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 28,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/OrderTotals.tsx";
/** Product subtotal and final total, recalculated from catalog prices and quantities. */
function OrderTotals({ items, totalClassName = "font-serif text-3xl font-medium text-[#F7F4FC]" }) {
	const { t } = useLanguage();
	const { subtotal, total } = orderTotals(items);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dl", {
		className: "space-y-2 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
				className: "text-[#B5ADC5]",
				children: t("cart.productSubtotal")
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 20,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
				className: "tabular-nums font-medium text-[#F7F4FC]",
				children: formatPrice(subtotal)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 21,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 19,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
				className: "text-[#B5ADC5]",
				children: t("cart.digitalDelivery")
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 24,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
				className: "font-medium text-[#B99AF5]",
				children: t("cart.included")
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 25,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 23,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 18,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mt-3.5 flex items-baseline justify-between gap-3 border-t border-[#49365D] pt-3.5",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "eyebrow text-xs",
			children: t("cart.finalTotal")
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 29,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: `${totalClassName} tabular-nums`,
			children: formatPrice(total)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 30,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 28,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 17,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/cart.tsx?tsr-split=component";
function CartPage() {
	const { t } = useLanguage();
	const text = useCatalogText();
	const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useStore();
	const { total } = orderTotals(cartItems);
	const hasPhysical = cartItems.some((i) => i.edition === "physical");
	const hasDigital = cartItems.some((i) => i.edition === "digital");
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "min-h-[65vh] bg-[#0B0A10] py-12 md:py-16",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "wrap",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-8 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex h-10 w-10 items-center justify-center rounded-lg border border-[#49365D] bg-[#21182F] text-[#B99AF5]",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, {
							size: 20,
							strokeWidth: 1.8
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 31,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 30,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "font-serif text-[38px] font-normal leading-tight text-[#F7F4FC] md:text-[46px]",
						children: t("cart.title")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 33,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 29,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					hash: "store",
					className: "text-xs font-medium text-[#B99AF5] hover:underline",
					children: "← Continue shopping"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 38,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 28,
				columnNumber: 9
			}, this), cartItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-xl border border-dashed border-[#49365D] bg-[#21182F] py-16 text-center shadow-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, { className: "mx-auto mb-4 h-12 w-12 text-[#B99AF5]/50" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 44,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mb-6 text-sm text-[#B5ADC5]",
						children: t("cart.empty")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 45,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						hash: "store",
						className: "btn btn-fill",
						children: t("cart.browse")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 46,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 43,
				columnNumber: 35
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid items-start gap-8 lg:grid-cols-[1fr_360px]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "divide-y divide-[#49365D] rounded-xl border border-[#49365D] bg-[#21182F] shadow-lg",
					children: cartItems.map((p) => {
						const category = categories.find((c) => c.id === p.category) || categories[0];
						const isPhysical = p.edition === "physical";
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
							className: "flex items-center gap-4 p-4 transition-colors hover:bg-[#251b36] sm:gap-5 sm:p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/products/$productId",
									params: { productId: String(p.id) },
									className: "w-16 flex-none sm:w-20",
									"aria-label": text.name(p),
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookCover, {
										product: p,
										size: "sm"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 59,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 56,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [isPhysical ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "inline-flex items-center gap-1 rounded bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-amber-300",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { size: 10 }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 66,
													columnNumber: 29
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Physical Book" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 67,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 65,
												columnNumber: 39
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "inline-flex items-center gap-1 rounded bg-[#7851D8]/20 border border-[#7851D8]/40 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-[#B99AF5]",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { size: 10 }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 69,
													columnNumber: 29
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Digital PDF" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 70,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 68,
												columnNumber: 37
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-[10px] uppercase tracking-wider text-[#B5ADC5]",
												children: text.category(category)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 72,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 64,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
											to: "/products/$productId",
											params: { productId: String(p.id) },
											className: "mt-1 block font-serif text-lg font-medium leading-tight text-[#F7F4FC] transition-colors hover:text-[#B99AF5] sm:text-xl",
											children: text.name(p)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 78,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-1 text-[11px] text-[#B5ADC5]",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "tabular-nums",
													children: formatPrice(p.unitPrice)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 85,
													columnNumber: 25
												}, this),
												" each ·",
												" ",
												text.language(p.language),
												" · ",
												p.pages,
												"p"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 84,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 62,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-col items-end gap-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "font-serif text-xl font-medium text-[#F7F4FC] tabular-nums",
											children: formatPrice(p.unitPrice * p.quantity)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 92,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "inline-flex items-center rounded-md border border-[#49365D] bg-[#140E20]",
											"aria-label": `Quantity for ${text.name(p)}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													type: "button",
													onClick: () => decreaseQuantity(p.cartKey),
													disabled: p.quantity <= 1,
													"aria-label": `Decrease quantity`,
													className: "p-1.5 text-[#B5ADC5] transition hover:text-[#F7F4FC] disabled:cursor-not-allowed disabled:opacity-30",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Minus, { size: 14 }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 99,
														columnNumber: 27
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 98,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													"aria-live": "polite",
													className: "min-w-8 text-center text-xs font-medium text-[#F7F4FC] tabular-nums",
													children: p.quantity
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 101,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													type: "button",
													onClick: () => increaseQuantity(p.cartKey),
													disabled: p.quantity >= 99,
													"aria-label": `Increase quantity`,
													className: "p-1.5 text-[#B5ADC5] transition hover:text-[#F7F4FC] disabled:cursor-not-allowed disabled:opacity-30",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { size: 14 }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 105,
														columnNumber: 27
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 104,
													columnNumber: 25
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 97,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											type: "button",
											onClick: () => removeFromCart(p.cartKey),
											className: "inline-flex items-center gap-1 text-[11px] text-[#B5ADC5] transition-colors hover:text-[#ff7b72]",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { size: 12 }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 110,
													columnNumber: 25
												}, this),
												" ",
												t("cart.remove")
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 109,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 91,
									columnNumber: 21
								}, this)
							]
						}, p.cartKey, true, {
							fileName: _jsxFileName,
							lineNumber: 55,
							columnNumber: 20
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 51,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
					className: "rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-xl lg:sticky lg:top-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(OrderTotals, { items: cartItems }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 119,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "my-4 space-y-1.5 rounded-lg border border-[#49365D]/60 bg-[#140E20] p-3 text-[11px] text-[#B5ADC5]",
							children: [hasDigital && /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-1.5 text-[#B99AF5]",
								children: [/* @__PURE__ */ (void 0)(FileText, { size: 12 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 123,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Digital downloads: Delivered to Email & WhatsApp" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 124,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 122,
								columnNumber: 32
							}, this), hasPhysical && /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-1.5 text-amber-300",
								children: [/* @__PURE__ */ (void 0)(Package, { size: 12 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 127,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Physical books: Free doorstep courier shipping" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 128,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 126,
								columnNumber: 33
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 121,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CheckoutButton, {
							items: cartItems.map((p) => ({
								id: p.id,
								quantity: p.quantity,
								edition: p.edition
							})),
							label: `${t("cart.checkout")} · ${formatPrice(total)}`
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 132,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-4 text-center text-[11px] text-[#837996]",
							children: "Safe & Secure Order Processing · AUVYRA"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 138,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 118,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 49,
				columnNumber: 20
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 27,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 26,
		columnNumber: 10
	}, this);
}
export { CartPage as component };
