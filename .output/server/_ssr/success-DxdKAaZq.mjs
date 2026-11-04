import { __toESM } from "../_runtime.mjs";
import { LogoMark, Route$1, WHATSAPP_DISPLAY, useLanguage, useStore, whatsappLink } from "./router-D0crWlZ4.mjs";
import { formatPrice } from "./products-vOGwWypY.mjs";
import { buildOrderConfirmationMessage, getLastOrderId, getOrderById, setOrderPaymentVerified } from "./orders-Bh86Gbpk.mjs";
import { require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { BookOpen, CircleAlert, CircleCheck, Download, FileText, Package } from "../_libs/lucide-react.mjs";
import { Check } from "../_libs/lucide-react4.mjs";
import { Clock, Copy, LockOpen } from "../_libs/lucide-react5.mjs";
import { Lock } from "../_libs/lucide-react8.mjs";
import { MessageCircle } from "../_libs/lucide-react10.mjs";
import { ShieldCheck, Truck } from "../_libs/lucide-react11.mjs";
import { require_jsx_dev_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/success-DxdKAaZq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/checkout/success.tsx?tsr-split=component";
function CheckoutSuccess() {
	const { t } = useLanguage();
	const { clearCart } = useStore();
	const { orderId: searchOrderId } = Route$1.useSearch();
	const [order, setOrder] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [downloadSuccess, setDownloadSuccess] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		clearCart();
		const targetId = searchOrderId || getLastOrderId();
		if (targetId) {
			const found = getOrderById(targetId);
			if (found) setOrder(found);
		}
	}, [searchOrderId]);
	const copyOrderId = () => {
		if (!order) return;
		navigator.clipboard?.writeText(order.id);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	};
	const handleSimulateVerification = () => {
		if (!order) return;
		const updated = setOrderPaymentVerified(order.id);
		if (updated) setOrder({ ...updated });
	};
	const handleDownload = (key, title, format) => {
		if (order?.paymentStatus !== "verified") return;
		setDownloadSuccess(key);
		const blob = new Blob([`AUVYRA DIGITAL BOOKSTORE\n\nTitle: ${title}\nFormat: ${format.toUpperCase()}\nOrder ID: ${order.id}\nCustomer: ${order.customer.name} (${order.customer.email})\nEdition: Authorized Digital License\nStatus: Verified\n\nThank you for choosing AUVYRA.`], { type: "text/plain;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `AUVYRA-${title.replace(/[^a-zA-Z0-9]/g, "_")}-${format.toUpperCase()}.pdf`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
		setTimeout(() => setDownloadSuccess(null), 3e3);
	};
	if (!order) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "flex min-h-[75vh] items-center justify-center bg-[#0B0A10] px-5 py-16",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-lg rounded-xl border border-[#49365D] bg-[#21182F] p-8 text-center shadow-2xl md:p-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogoMark, { className: "mx-auto mb-6 h-16 w-16 text-[#B99AF5]" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 64,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mb-3 font-serif text-[34px] font-normal leading-tight text-[#F7F4FC]",
					children: t("success.title")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 65,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mb-8 text-[14px] leading-relaxed text-[#B5ADC5]",
					children: t("success.body")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 68,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "btn btn-fill",
						children: t("common.home")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 72,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: whatsappLink(),
						target: "_blank",
						rel: "noopener",
						className: "btn",
						children: ["WhatsApp Support · ", WHATSAPP_DISPLAY]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 75,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 63,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 62,
		columnNumber: 12
	}, this);
	const isVerified = order.paymentStatus === "verified";
	const digitalItems = order.items.filter((i) => i.edition === "digital");
	const physicalItems = order.items.filter((i) => i.edition === "physical");
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "min-h-[85vh] bg-[#0B0A10] py-12 md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "wrap max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-8 rounded-xl border border-[#49365D] bg-[#21182F] p-6 text-center shadow-2xl sm:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative mx-auto mb-5 flex h-16 w-16 items-center justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogoMark, { className: "h-16 w-16 drop-shadow-[0_0_18px_rgba(120,81,216,0.35)]" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 90,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "absolute -bottom-1 -right-1 rounded-full border-2 border-[#21182F] bg-[#7851D8] p-1 text-[#F7F4FC]",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, {
									size: 16,
									strokeWidth: 2.5
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 92,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 91,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 89,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "eyebrow mb-2",
							children: "ORDER RECORDED"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 96,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "mb-2 font-serif text-[32px] font-normal leading-tight text-[#F7F4FC] sm:text-[40px]",
							children: t("confirmation.title")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 97,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mx-auto max-w-md text-sm leading-relaxed text-[#B5ADC5]",
							children: t("confirmation.subtitle")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 100,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-lg border border-[#49365D] bg-[#140E20] px-4 py-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs uppercase tracking-wider text-[#B5ADC5]",
									children: [t("confirmation.orderIdLabel"), ":"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 106,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono text-base font-bold text-[#F7F4FC]",
									children: order.id
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 109,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: copyOrderId,
									className: "inline-flex items-center gap-1 rounded bg-[#21182F] px-2 py-1 text-[11px] font-medium text-[#B99AF5] transition-colors hover:bg-[#7851D8] hover:text-[#F7F4FC]",
									children: [copied ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { size: 12 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 113,
										columnNumber: 25
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { size: 12 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 113,
										columnNumber: 47
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: copied ? "Copied" : "Copy" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 114,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 112,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 105,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 88,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-8 rounded-xl border border-[#49365D] bg-[#21182F] p-6 sm:p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-mono uppercase tracking-widest text-[#B5ADC5]",
								children: t("confirmation.statusLabel")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 123,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-1 flex items-center gap-2",
								children: isVerified ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { size: 13 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 128,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("confirmation.statusVerified") }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 129,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 127,
									columnNumber: 31
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-300",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { size: 13 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 131,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("confirmation.statusPending") }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 132,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 130,
									columnNumber: 29
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 126,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 122,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-left sm:text-right",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs uppercase tracking-wider text-[#B5ADC5]",
									children: "Total Payable"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 138,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-serif text-2xl font-medium text-[#F7F4FC] tabular-nums",
									children: formatPrice(order.total)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 139,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 137,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 121,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 border-t border-[#49365D]/80 pt-4 text-xs leading-relaxed text-[#B5ADC5]",
							children: isVerified ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "flex items-center gap-2 text-emerald-300",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, {
									size: 14,
									className: "flex-none"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 147,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Payment confirmed! Digital access is unlocked and physical copies are being prepared." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 148,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 146,
								columnNumber: 27
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "flex items-start gap-2 text-amber-200/90",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, {
									size: 15,
									className: "mt-0.5 flex-none text-amber-400"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 153,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Your order is placed! Once payment is verified by our team (5–15 min), digital files unlock instantly and physical books dispatch via courier." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 154,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 152,
								columnNumber: 22
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 145,
							columnNumber: 11
						}, this),
						!isVerified && /* @__PURE__ */ (void 0)("div", {
							className: "mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#49365D]/60 bg-[#140E20] p-3 text-xs",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-[#B5ADC5]",
								children: "Testing or demonstrating order verification?"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 162,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: handleSimulateVerification,
								className: "inline-flex items-center gap-1.5 rounded border border-[#7851D8] bg-[#7851D8]/20 px-3 py-1.5 font-medium text-[#B99AF5] transition hover:bg-[#7851D8] hover:text-[#F7F4FC]",
								children: [/* @__PURE__ */ (void 0)(LockOpen, { size: 13 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 166,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", { children: t("confirmation.simulateVerification") }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 167,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 165,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 161,
							columnNumber: 27
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 120,
					columnNumber: 9
				}, this),
				digitalItems.length > 0 && /* @__PURE__ */ (void 0)("div", {
					className: "mb-8 rounded-xl border border-[#49365D] bg-[#21182F] p-6 sm:p-7",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "mb-4 flex items-center gap-2 border-b border-[#49365D]/80 pb-3",
						children: [/* @__PURE__ */ (void 0)(FileText, {
							size: 18,
							className: "text-[#B99AF5]"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 175,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("h2", {
							className: "font-serif text-2xl font-medium text-[#F7F4FC]",
							children: [
								"Digital Products (",
								digitalItems.length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 176,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 174,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("ul", {
						className: "divide-y divide-[#49365D]/60",
						children: digitalItems.map((item) => /* @__PURE__ */ (void 0)("li", {
							className: "flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (void 0)("h3", {
									className: "font-serif text-lg font-medium text-[#F7F4FC]",
									children: item.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 184,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "mt-0.5 flex items-center gap-2 text-xs text-[#B5ADC5]",
									children: [
										/* @__PURE__ */ (void 0)("span", {
											className: "rounded bg-[#140E20] px-1.5 py-0.5 font-mono text-[10px] uppercase text-[#B99AF5]",
											children: "Digital PDF"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 188,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("span", { children: ["Qty: ", item.quantity] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 191,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("span", { children: "•" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 192,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "tabular-nums font-medium text-[#F7F4FC]",
											children: formatPrice(item.price * item.quantity)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 193,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 187,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 183,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", { children: isVerified ? /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => handleDownload(item.cartKey, item.name, item.format),
								className: "btn btn-fill !px-4 !py-2 text-xs",
								children: downloadSuccess === item.cartKey ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Check, { size: 14 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 202,
									columnNumber: 29
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Downloaded!" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 203,
									columnNumber: 29
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 201,
									columnNumber: 61
								}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Download, { size: 14 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 205,
									columnNumber: 29
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Download PDF" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 206,
									columnNumber: 29
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 204,
									columnNumber: 33
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 200,
								columnNumber: 35
							}, this) : /* @__PURE__ */ (void 0)("button", {
								type: "button",
								disabled: true,
								"aria-disabled": "true",
								title: "Download locked until payment verification completes",
								className: "inline-flex cursor-not-allowed items-center gap-1.5 rounded-md border border-[#49365D] bg-[#140E20] px-3.5 py-2 text-xs font-medium text-[#837996] opacity-70",
								children: [/* @__PURE__ */ (void 0)(Lock, { size: 13 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 209,
									columnNumber: 25
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Download Locked" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 210,
									columnNumber: 25
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 208,
								columnNumber: 35
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 199,
								columnNumber: 19
							}, this)]
						}, item.cartKey, true, {
							fileName: _jsxFileName,
							lineNumber: 182,
							columnNumber: 41
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 181,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 173,
					columnNumber: 37
				}, this),
				physicalItems.length > 0 && /* @__PURE__ */ (void 0)("div", {
					className: "mb-8 rounded-xl border border-[#49365D] bg-[#21182F] p-6 sm:p-7",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mb-4 flex items-center gap-2 border-b border-[#49365D]/80 pb-3",
							children: [/* @__PURE__ */ (void 0)(Package, {
								size: 18,
								className: "text-amber-400"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 220,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("h2", {
								className: "font-serif text-2xl font-medium text-[#F7F4FC]",
								children: [
									"Physical Books for Doorstep Delivery (",
									physicalItems.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 221,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 219,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("ul", {
							className: "divide-y divide-[#49365D]/60",
							children: physicalItems.map((item) => /* @__PURE__ */ (void 0)("li", {
								className: "flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-center",
								children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
									className: "font-serif text-lg font-medium text-[#F7F4FC]",
									children: item.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 229,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "mt-0.5 flex items-center gap-2 text-xs text-[#B5ADC5]",
									children: [
										/* @__PURE__ */ (void 0)("span", {
											className: "rounded bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 font-mono text-[10px] uppercase text-amber-300",
											children: "Printed Edition"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 233,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("span", { children: ["Qty: ", item.quantity] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 236,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("span", { children: "•" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 237,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "tabular-nums font-medium text-[#F7F4FC]",
											children: formatPrice(item.price * item.quantity)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 238,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 232,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 228,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2 text-xs",
									children: isVerified ? /* @__PURE__ */ (void 0)("span", {
										className: "inline-flex items-center gap-1 rounded bg-amber-500/15 px-2.5 py-1 text-amber-300",
										children: [/* @__PURE__ */ (void 0)(Truck, { size: 13 }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 246,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", { children: "Preparing for Courier Dispatch" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 247,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 245,
										columnNumber: 35
									}, this) : /* @__PURE__ */ (void 0)("span", {
										className: "inline-flex items-center gap-1 rounded bg-[#140E20] border border-[#49365D] px-2.5 py-1 text-[#B5ADC5]",
										children: [/* @__PURE__ */ (void 0)(Clock, { size: 13 }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 249,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", { children: "Dispatches after verification" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 250,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 248,
										columnNumber: 33
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 244,
									columnNumber: 19
								}, this)]
							}, item.cartKey, true, {
								fileName: _jsxFileName,
								lineNumber: 227,
								columnNumber: 42
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 226,
							columnNumber: 13
						}, this),
						order.customer.address && /* @__PURE__ */ (void 0)("div", {
							className: "mt-4 rounded-lg border border-amber-500/25 bg-[#140E20] p-3 text-xs text-[#B5ADC5]",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "font-medium text-amber-300 mb-1 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (void 0)(Truck, { size: 13 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 258,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Shipping Destination" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 259,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 257,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-[#F7F4FC]",
								children: [
									order.customer.address,
									", ",
									order.customer.city,
									" — ",
									order.customer.pincode
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 261,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 256,
							columnNumber: 40
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 218,
					columnNumber: 38
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-8 rounded-xl border border-[#49365D] bg-[#21182F] p-6 sm:p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mb-4 font-serif text-xl font-medium text-[#F7F4FC]",
							children: t("confirmation.customerDetails")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 269,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dl", {
							className: "grid grid-cols-1 gap-4 text-xs sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-lg border border-[#49365D]/60 bg-[#140E20] p-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
										className: "text-[#B5ADC5]",
										children: "Customer Name"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 274,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
										className: "mt-1 font-medium text-[#F7F4FC]",
										children: order.customer.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 275,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 273,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-lg border border-[#49365D]/60 bg-[#140E20] p-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
										className: "text-[#B5ADC5]",
										children: "Delivery Email"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 278,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
										className: "mt-1 truncate font-medium text-[#F7F4FC]",
										children: order.customer.email
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 279,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 277,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-lg border border-[#49365D]/60 bg-[#140E20] p-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
										className: "text-[#B5ADC5]",
										children: "WhatsApp Contact"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 284,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
										className: "mt-1 font-medium text-[#F7F4FC]",
										children: order.customer.whatsapp
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 285,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 283,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 272,
							columnNumber: 11
						}, this),
						order.customer.notes && /* @__PURE__ */ (void 0)("div", {
							className: "mt-3 rounded-lg border border-[#49365D]/60 bg-[#140E20] p-3 text-xs",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-[#B5ADC5]",
								children: "Notes: "
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 291,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "text-[#F7F4FC]",
								children: order.customer.notes
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 292,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 290,
							columnNumber: 36
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 268,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-xl border border-[#49365D] bg-[#21182F] p-6 text-center shadow-xl sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mb-2 font-serif text-2xl font-medium text-[#F7F4FC]",
							children: "Confirm & Message on WhatsApp"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 298,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mx-auto mb-6 max-w-lg text-xs leading-relaxed text-[#B5ADC5]",
							children: "Message us on WhatsApp with your Order ID to share your payment confirmation or ask any questions about your digital downloads or physical book courier delivery."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 301,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: whatsappLink(buildOrderConfirmationMessage(order)),
								target: "_blank",
								rel: "noopener",
								className: "btn btn-fill !px-6 !py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { size: 16 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 307,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("confirmation.sendOnWhatsapp") }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 308,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 306,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/",
								hash: "store",
								className: "btn !px-5 !py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, { size: 16 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 311,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Explore More Books" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 312,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 310,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 305,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-6 flex items-center justify-center gap-2 text-center text-[11px] text-[#837996]",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, {
								size: 13,
								className: "text-[#B99AF5]"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 317,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Digital & Physical Bookstore Guarantee · AUVYRA by Barath & Kavi" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 318,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 316,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 297,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 86,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 85,
		columnNumber: 10
	}, this);
}
export { CheckoutSuccess as component };
