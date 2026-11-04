import { LogoMark, useLanguage } from "./router-D0crWlZ4.mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_dev_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/cancel-CdUBs5hX.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/checkout/cancel.tsx?tsr-split=component";
function CheckoutCancel() {
	const { t } = useLanguage();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "flex min-h-[75vh] items-center justify-center bg-[#0B0A10] px-5 py-16",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-lg rounded-xl border border-[#49365D] bg-[#21182F] p-8 text-center shadow-2xl md:p-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogoMark, { className: "mx-auto mb-6 h-16 w-16 opacity-75" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 10,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mb-3 font-serif text-[34px] font-normal leading-tight text-[#F7F4FC] md:text-[38px]",
					children: t("cancel.title")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 11,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mb-8 text-[14px] leading-relaxed text-[#B5ADC5]",
					children: t("cancel.body")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 14,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/cart",
						className: "btn btn-fill",
						children: t("cancel.back")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 18,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "btn",
						children: t("common.home")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 21,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 17,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 9,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 8,
		columnNumber: 10
	}, this);
}
export { CheckoutCancel as component };
