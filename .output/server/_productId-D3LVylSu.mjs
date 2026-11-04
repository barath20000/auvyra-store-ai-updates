import { __toESM } from "./_runtime.mjs";
import { categories, formatPrice, getPrice, hasDigitalEdition, hasPhysicalEdition, products } from "./_ssr/products-vOGwWypY.mjs";
import { BookCover } from "./_ssr/BookCover-B1Dot2B7.mjs";
import { ProductCard } from "./_ssr/ProductCard-BgyYRf9V.mjs";
import { Route, useCatalogText, useLanguage, useStore } from "./_ssr/router-D0crWlZ4.mjs";
import { require_react } from "./_libs/@tanstack/react-router+[...].mjs";
import { Link, useNavigate } from "./_libs/@tanstack/react-router+[2...].mjs";
import { ArrowLeft } from "./_libs/lucide-react2.mjs";
import { BookOpen, FileText, Package, ShoppingBag } from "./_libs/lucide-react.mjs";
import { Check } from "./_libs/lucide-react4.mjs";
import { Heart } from "./_libs/lucide-react7.mjs";
import { ShieldCheck, Truck } from "./_libs/lucide-react11.mjs";
import { Sparkles } from "./_libs/lucide-react12.mjs";
import { require_jsx_dev_runtime } from "./_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/_productId-D3LVylSu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/products/$productId.tsx?tsr-split=component";
function ProductPage() {
	const product = Route.useLoaderData();
	const { t } = useLanguage();
	const text = useCatalogText();
	const navigate = useNavigate();
	const { inCart, addToCart, isSaved, toggleSaved } = useStore();
	const category = categories.find((c) => c.id === product.category) || categories[0];
	const [selectedEdition, setSelectedEdition] = (0, import_react.useState)(hasDigitalEdition(product) ? "digital" : "physical");
	const activePrice = getPrice(product, selectedEdition);
	const isAdded = inCart(product.id, selectedEdition);
	const saved = isSaved(product.id);
	const hasBoth = hasDigitalEdition(product) && hasPhysicalEdition(product);
	const related = products.filter((p) => p.category === product.category && p.id !== product.id).concat(products.filter((p) => p.category !== product.category && p.featured)).slice(0, 3);
	const handleBuyNow = () => {
		addToCart(product.id, selectedEdition);
		navigate({ to: "/checkout" });
	};
	const specs = [
		[t("product.format"), selectedEdition === "physical" ? `Printed Book (${product.dimensions || "Paperback Book"})` : `Digital eBook (${text.format(product.format)})`],
		[t("product.language"), text.language(product.language)],
		[t("product.length"), `${product.pages} ${t("card.pages")}`],
		[t("product.delivery"), selectedEdition === "physical" ? "Doorstep Courier Delivery" : "Instant Digital PDF Download"]
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "bg-[#0B0A10]",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative overflow-hidden border-b border-[#49365D] bg-[#0B0A10] py-10 md:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_30%,_rgba(120,81,216,0.14),_transparent_75%)]" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 42,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "wrap relative",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					hash: "store",
					className: "mb-8 inline-flex items-center gap-2 text-[13px] font-medium text-[#B5ADC5] transition-colors hover:text-[#B99AF5]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { size: 15 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 46,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("product.back") }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 47,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 45,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid items-start gap-10 md:grid-cols-[.9fr_1.1fr] md:gap-16",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col items-center rounded-xl border border-[#49365D] bg-[#140E20] px-8 py-10 shadow-2xl md:py-16",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookCover, {
							product,
							size: "lg",
							className: "w-full max-w-[290px] -rotate-1 transition-transform duration-300 hover:rotate-0 hover:scale-105"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 53,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-5 flex items-center gap-2 text-xs text-[#B5ADC5]",
							children: selectedEdition === "physical" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 font-medium text-amber-300",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { size: 13 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 56,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Physical Printed Edition Selected" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 57,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 55,
								columnNumber: 51
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-center gap-1.5 rounded-full border border-[#7851D8]/40 bg-[#7851D8]/15 px-3 py-1 font-medium text-[#B99AF5]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { size: 13 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 59,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Digital Download Edition Selected" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 60,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 58,
								columnNumber: 29
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 54,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 52,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#B99AF5]",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, {
										size: 13,
										className: "text-[#B99AF5]"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 69,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: text.category(category) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 70,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 68,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[#49365D]",
									children: "•"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 72,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[#B5ADC5]",
									children: text.format(product.format)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 73,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[#49365D]",
									children: "•"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 74,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[#B5ADC5]",
									children: text.productType(product.productType)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 75,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 67,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "mb-4 mt-3 font-serif text-[38px] font-normal leading-[1.08] text-[#F7F4FC] md:text-[52px]",
							children: text.name(product)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 78,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mb-6 text-[15px] leading-relaxed text-[#B5ADC5]",
							children: text.description(product)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 82,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mb-6 rounded-xl border border-[#49365D] bg-[#140E20] p-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mb-2.5 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-mono uppercase tracking-widest text-[#B5ADC5]",
									children: t("edition.selectPrompt")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 89,
									columnNumber: 19
								}, this), hasBoth && /* @__PURE__ */ (void 0)("span", {
									className: "flex items-center gap-1 text-[11px] text-[#B99AF5]",
									children: [/* @__PURE__ */ (void 0)(Sparkles, { size: 11 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 93,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("span", { children: t("edition.bothAvailable") }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 94,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 92,
									columnNumber: 31
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 88,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
								children: [hasDigitalEdition(product) && /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => setSelectedEdition("digital"),
									className: `flex flex-col rounded-lg border p-3.5 text-left transition-all ${selectedEdition === "digital" ? "border-[#7851D8] bg-[#291D3C] shadow-[0_0_16px_rgba(120,81,216,0.3)] ring-1 ring-[#7851D8]" : "border-[#49365D] bg-[#21182F] hover:border-[#7851D8]/60"}`,
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "flex items-center gap-1.5 font-medium text-[#F7F4FC] text-sm",
											children: [/* @__PURE__ */ (void 0)(FileText, {
												size: 15,
												className: "text-[#B99AF5]"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 103,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("span", { children: "Digital Edition" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 104,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 102,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-serif text-lg font-medium text-[#F7F4FC]",
											children: formatPrice(product.digitalPrice ?? product.price)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 106,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 101,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "mt-1 text-[11px] text-[#B5ADC5]",
										children: "Instant PDF download • Mobile, tablet & laptop"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 110,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 100,
									columnNumber: 50
								}, this), hasPhysicalEdition(product) && /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => setSelectedEdition("physical"),
									className: `flex flex-col rounded-lg border p-3.5 text-left transition-all ${selectedEdition === "physical" ? "border-[#7851D8] bg-[#291D3C] shadow-[0_0_16px_rgba(120,81,216,0.3)] ring-1 ring-[#7851D8]" : "border-[#49365D] bg-[#21182F] hover:border-[#7851D8]/60"}`,
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "flex items-center gap-1.5 font-medium text-[#F7F4FC] text-sm",
											children: [/* @__PURE__ */ (void 0)(Package, {
												size: 15,
												className: "text-amber-400"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 119,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("span", { children: "Physical Book" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 120,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 118,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-serif text-lg font-medium text-[#F7F4FC]",
											children: formatPrice(product.physicalPrice)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 122,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 117,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "mt-1 text-[11px] text-[#B5ADC5]",
										children: "Printed book • Courier delivery to your door"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 126,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 116,
									columnNumber: 51
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 98,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 87,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mb-6 flex flex-wrap items-baseline gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "font-serif text-4xl font-medium text-[#F7F4FC] tabular-nums",
								children: formatPrice(activePrice)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 135,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 text-xs text-[#B5ADC5]",
								children: selectedEdition === "physical" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex items-center gap-1 text-amber-300",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Truck, { size: 14 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 140,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Physical Delivery Included (Free shipping)" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 141,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 139,
									columnNumber: 53
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex items-center gap-1 text-[#B99AF5]",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { size: 14 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 143,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Instant Digital Download Included" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 144,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 142,
									columnNumber: 31
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 138,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 134,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mb-3.5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: handleBuyNow,
									className: "btn btn-fill w-full gap-2 !py-3 font-medium shadow-md",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { size: 16 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 152,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
										t("product.buy"),
										" · ",
										formatPrice(activePrice)
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 153,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 151,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => addToCart(product.id, selectedEdition),
									disabled: isAdded,
									className: `btn h-fit !py-3 ${isAdded ? "!border-[#7851D8]/50 !bg-[#7851D8]/20 !text-[#B99AF5] !cursor-default !opacity-100" : ""}`,
									children: isAdded ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { size: 15 }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 160,
											columnNumber: 23
										}, this),
										" ",
										t("card.added"),
										" (",
										selectedEdition,
										")"
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 159,
										columnNumber: 30
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { size: 15 }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 162,
											columnNumber: 23
										}, this),
										" ",
										t("card.add"),
										" (",
										selectedEdition,
										")"
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 161,
										columnNumber: 27
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 158,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => toggleSaved(product.id),
									"aria-pressed": saved,
									"aria-label": saved ? t("card.saved") : t("card.save"),
									className: `btn h-fit !p-3 ${saved ? "!border-[#7851D8] !bg-[#7851D8]/20 !text-[#B99AF5]" : "border-[#49365D] bg-[#21182F] text-[#B5ADC5] hover:border-[#7851D8]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, {
										size: 16,
										fill: saved ? "currentColor" : "none"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 167,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "sm:sr-only",
										children: saved ? t("card.saved") : t("card.save")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 168,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 166,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 150,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mb-8 flex items-center gap-2 text-[12px] text-[#B5ADC5]",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, {
								size: 14,
								className: "text-[#B99AF5]"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 173,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "AUVYRA Quality & Satisfaction Guarantee" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 174,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 172,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dl", {
							className: "mb-8 grid grid-cols-2 border-y border-[#49365D]",
							children: specs.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "border-b border-[#49365D] py-3.5 pr-4 last:border-b-0 [&:nth-last-child(2)]:border-b-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
									className: "text-[10px] font-mono uppercase tracking-[0.16em] text-[#B99AF5]",
									children: label
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 180,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
									className: "mt-1 text-[13px] font-medium text-[#F7F4FC]",
									children: value
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 183,
									columnNumber: 21
								}, this)]
							}, label, true, {
								fileName: _jsxFileName,
								lineNumber: 179,
								columnNumber: 48
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 178,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mb-3.5 font-serif text-2xl font-medium text-[#F7F4FC]",
							children: t("product.includes")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 188,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "space-y-2.5 text-[14px] text-[#B5ADC5]",
							children: text.includes(product).map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "mt-0.5 text-xs text-[#B99AF5]",
									children: "✦"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 193,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "leading-relaxed",
									children: item
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 194,
									columnNumber: 21
								}, this)]
							}, item, true, {
								fileName: _jsxFileName,
								lineNumber: 192,
								columnNumber: 53
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 191,
							columnNumber: 15
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 66,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 44,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 41,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "border-t border-[#49365D]/40 bg-[#0B0A10] py-16",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "wrap",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-8 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "eyebrow",
						children: "AUVYRA BOOKSTORE"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 207,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "mt-1 font-serif text-[30px] font-normal text-[#F7F4FC] md:text-[36px]",
						children: t("product.related")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 208,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 206,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						hash: "store",
						className: "text-xs font-medium text-[#B99AF5] hover:underline",
						children: "View all books"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 212,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 205,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: related.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, { product: p }, p.id, false, {
						fileName: _jsxFileName,
						lineNumber: 217,
						columnNumber: 31
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 216,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 204,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 203,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 39,
		columnNumber: 10
	}, this);
}
export { ProductPage as component };
