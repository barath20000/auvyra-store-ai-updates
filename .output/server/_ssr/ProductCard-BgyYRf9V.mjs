import { __toESM } from "../_runtime.mjs";
import { BookCover } from "./BookCover-B1Dot2B7.mjs";
import { categories, formatPrice, getPrice, hasDigitalEdition, hasPhysicalEdition } from "./products-vOGwWypY.mjs";
import { useCatalogText, useLanguage, useStore } from "./router-D0crWlZ4.mjs";
import { require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { BookOpen, FileText, Package, ShoppingBag } from "../_libs/lucide-react.mjs";
import { Check } from "../_libs/lucide-react4.mjs";
import { Heart } from "../_libs/lucide-react7.mjs";
import { Sparkles } from "../_libs/lucide-react12.mjs";
import { require_jsx_dev_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/ProductCard-BgyYRf9V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/ProductCard.tsx";
function ProductCard({ product }) {
	const { t } = useLanguage();
	const text = useCatalogText();
	const { inCart, addToCart, isSaved, toggleSaved } = useStore();
	const category = categories.find((c) => c.id === product.category) || categories[0];
	const [selectedEdition, setSelectedEdition] = (0, import_react.useState)(hasDigitalEdition(product) ? "digital" : "physical");
	const activePrice = getPrice(product, selectedEdition);
	const isAdded = inCart(product.id, selectedEdition);
	const saved = isSaved(product.id);
	const hasBoth = hasDigitalEdition(product) && hasPhysicalEdition(product);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
		className: "group relative flex flex-col rounded-lg border border-[#49365D] bg-[#21182F] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#7851D8] hover:shadow-[0_12px_28px_rgba(120,81,216,0.18)] sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full border border-[#49365D] bg-[#140E20]/90 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-[#B99AF5] backdrop-blur-md",
				children: product.productType === "both" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, {
					size: 10,
					className: "text-[#B99AF5]"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Digital + Print" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 48,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 46,
					columnNumber: 11
				}, this) : product.productType === "physical" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, {
					size: 10,
					className: "text-amber-400"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Printed Book" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 51,
					columnNumber: 11
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, {
					size: 10,
					className: "text-[#B99AF5]"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 57,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Digital eBook" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 58,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 44,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/products/$productId",
				params: { productId: String(product.id) },
				className: "relative mb-3.5 flex items-center justify-center overflow-hidden rounded-md border border-[#49365D]/70 bg-[#130E20] px-6 py-6 transition-colors group-hover:border-[#7851D8]/60 group-hover:bg-[#181128] sm:py-7",
				"aria-label": `View ${text.name(product)}`,
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,81,216,0.15),_transparent_70%)]" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 70,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookCover, {
					product,
					className: "mx-auto max-w-[155px] -rotate-1 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-[1.03]"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 64,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[#B99AF5]",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, {
						size: 11,
						className: "text-[#B99AF5]"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 80,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: text.category(category) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 81,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[#49365D]",
						children: "•"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 82,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[#B5ADC5]",
						children: text.format(product.format)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 83,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 79,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
				className: "mt-1 font-serif text-[21px] font-medium leading-snug text-[#F7F4FC]",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/products/$productId",
					params: { productId: String(product.id) },
					className: "transition-colors hover:text-[#B99AF5]",
					children: text.name(product)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 88,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 87,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mb-3.5 mt-1 line-clamp-2 text-[13px] leading-relaxed text-[#B5ADC5]",
				children: text.short(product)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 98,
				columnNumber: 7
			}, this),
			hasBoth && /* @__PURE__ */ (void 0)("div", {
				className: "mb-3 flex items-center rounded-md border border-[#49365D] bg-[#140E20] p-0.5 text-[11px]",
				children: [/* @__PURE__ */ (void 0)("button", {
					type: "button",
					onClick: () => setSelectedEdition("digital"),
					className: `flex-1 rounded py-1 text-center font-medium transition-all ${selectedEdition === "digital" ? "bg-[#7851D8] text-[#F7F4FC] shadow-sm" : "text-[#B5ADC5] hover:text-[#F7F4FC]"}`,
					children: "Digital (PDF)"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 105,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("button", {
					type: "button",
					onClick: () => setSelectedEdition("physical"),
					className: `flex-1 rounded py-1 text-center font-medium transition-all ${selectedEdition === "physical" ? "bg-[#7851D8] text-[#F7F4FC] shadow-sm" : "text-[#B5ADC5] hover:text-[#F7F4FC]"}`,
					children: "Printed Book"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 116,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 104,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-auto flex items-center justify-between gap-3 border-t border-[#49365D]/80 pt-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "font-serif text-2xl font-medium tracking-tight text-[#F7F4FC] tabular-nums",
					children: formatPrice(activePrice)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 133,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-[11px] text-[#B5ADC5]",
					children: [
						selectedEdition === "physical" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-amber-300/90 font-medium",
							children: "Physical Print"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 138,
							columnNumber: 15
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Instant Digital PDF" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 140,
							columnNumber: 15
						}, this),
						" · ",
						product.pages,
						"p"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 136,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 132,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => toggleSaved(product.id),
						"aria-pressed": saved,
						"aria-label": saved ? t("card.saved") : t("card.save"),
						className: `flex h-10 w-10 items-center justify-center rounded-md border transition-all ${saved ? "border-[#7851D8] bg-[#7851D8]/20 text-[#B99AF5] shadow-[0_0_10px_rgba(120,81,216,0.3)]" : "border-[#49365D] bg-[#140E20] text-[#B5ADC5] hover:border-[#7851D8] hover:text-[#B99AF5]"}`,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, {
							size: 16,
							strokeWidth: 1.8,
							fill: saved ? "currentColor" : "none"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 160,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 149,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => addToCart(product.id, selectedEdition),
						disabled: isAdded,
						className: `inline-flex items-center justify-center gap-1.5 rounded-md px-3.5 py-2 text-xs font-medium tracking-wide transition-all ${isAdded ? "cursor-default border border-[#7851D8]/50 bg-[#7851D8]/20 text-[#B99AF5]" : "btn-fill"}`,
						children: isAdded ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, {
							size: 14,
							strokeWidth: 2.2
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 180,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("card.added") }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 181,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 179,
							columnNumber: 15
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, {
							size: 14,
							strokeWidth: 1.8
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 185,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("card.add") }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 186,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 184,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 168,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 147,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 131,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 42,
		columnNumber: 5
	}, this);
}
export { ProductCard };
