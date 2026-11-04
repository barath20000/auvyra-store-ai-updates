import { BookOpen } from "../_libs/lucide-react.mjs";
import { require_jsx_dev_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/BookCover-B1Dot2B7.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/BookCover.tsx";
var palettes = {
	career: {
		from: "#171124",
		to: "#291D3B",
		border: "#533B6E",
		accent: "#B99AF5"
	},
	money: {
		from: "#130E20",
		to: "#241838",
		border: "#4C3565",
		accent: "#B99AF5"
	},
	skills: {
		from: "#150F24",
		to: "#2B1B42",
		border: "#5B3E78",
		accent: "#B99AF5"
	},
	growth: {
		from: "#181129",
		to: "#301F49",
		border: "#654586",
		accent: "#B99AF5"
	},
	children: {
		from: "#1A122A",
		to: "#341E50",
		border: "#6B458E",
		accent: "#B99AF5"
	},
	arts: {
		from: "#151026",
		to: "#2E1944",
		border: "#5E3B7D",
		accent: "#B99AF5"
	}
};
/**
* Modern, clean bookstore-style cover placeholder in Obsidian & Lavender.
* Features realistic book spine, minimal book foil motif, and support for real cover image uploads.
*/
function BookCover({ product, size = "md", className = "" }) {
	const palette = palettes[product.category] || palettes.career;
	const lg = size === "lg";
	const sm = size === "sm";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `group/cover relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-[4px] border transition-all duration-300 ${lg ? "p-8" : sm ? "p-2.5" : "p-5"} ${className}`,
		style: {
			background: `linear-gradient(145deg, ${palette.from} 0%, ${palette.to} 100%)`,
			borderColor: palette.border,
			boxShadow: lg ? "0 20px 40px -15px rgba(0,0,0,0.8), 0 0 25px rgba(120,81,216,0.2)" : sm ? "0 4px 12px rgba(0,0,0,0.5)" : "0 12px 28px -8px rgba(0,0,0,0.7), 0 0 16px rgba(120,81,216,0.15)"
		},
		children: [
			product.coverImage && /* @__PURE__ */ (void 0)("img", {
				src: product.coverImage,
				alt: product.name,
				className: "absolute inset-0 h-full w-full object-cover"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 82,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "pointer-events-none absolute inset-y-0 left-0 border-r border-white/5 shadow-[inset_3px_0_6px_rgba(0,0,0,0.6)]",
				style: { width: lg ? 16 : sm ? 6 : 10 }
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 90,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B99AF5]/30 to-transparent" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 96,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative z-10 flex items-center justify-between gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, {
						size: lg ? 13 : sm ? 7 : 10,
						className: "text-[#B99AF5]/80",
						strokeWidth: 2
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 101,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: `font-mono tracking-[0.24em] text-[#B99AF5] ${lg ? "text-[10px]" : sm ? "text-[6px]" : "text-[8px]"}`,
						children: "AUVYRA"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 106,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 100,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: `rounded-full border border-[#7851D8]/40 bg-[#7851D8]/20 uppercase tracking-widest text-[#B99AF5] ${lg ? "px-2 py-0.5 text-[10px]" : sm ? "px-1 text-[5px]" : "px-1.5 py-0.5 text-[7px]"}`,
					children: product.format
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 114,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 99,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative z-10 my-auto py-2",
				children: [
					!sm && /* @__PURE__ */ (void 0)("div", {
						className: "mb-2 flex items-center gap-1.5 opacity-60",
						children: [
							/* @__PURE__ */ (void 0)("span", { className: "h-px w-4 bg-[#B99AF5]" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 132,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("span", { className: "h-1.5 w-1.5 rotate-45 border border-[#B99AF5]" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 133,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("span", { className: "h-px flex-1 bg-gradient-to-r from-[#B99AF5] to-transparent" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 134,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 131,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
						className: `font-serif font-medium leading-[1.08] text-[#F7F4FC] drop-shadow-sm ${lg ? "text-3xl md:text-4xl" : sm ? "text-[11px]" : "text-xl"}`,
						children: product.name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 138,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `mt-2 bg-gradient-to-r from-[#B99AF5] via-[#7851D8] to-transparent ${lg ? "h-0.5 w-16" : sm ? "h-px w-5" : "h-px w-10"}` }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 146,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 128,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative z-10 flex items-end justify-between border-t border-white/5 pt-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: `font-serif tracking-[0.16em] text-[#B99AF5] ${lg ? "text-xs" : sm ? "text-[6px]" : "text-[9px]"}`,
					children: product.coverWord
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 155,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: `text-right tracking-wider text-[#B5ADC5]/75 ${lg ? "text-[10px]" : sm ? "text-[5px]" : "text-[7px]"}`,
					children: [product.pages, "p · PDF"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 162,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 154,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 66,
		columnNumber: 5
	}, this);
}
export { BookCover };
