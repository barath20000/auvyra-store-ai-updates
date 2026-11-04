import { useLanguage } from "./_ssr/router-D0crWlZ4.mjs";
import { Link } from "./_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_dev_runtime } from "./_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/_productId-DFfMfcgp.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/products/$productId.tsx?tsr-split=notFoundComponent";
function ProductNotFound() {
	const { t } = useLanguage();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "wrap py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
			className: "mb-4 font-serif text-4xl text-[#F7F4FC]",
			children: t("notFound.title")
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 8,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/",
			hash: "store",
			className: "btn btn-fill",
			children: t("product.back")
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 9,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 7,
		columnNumber: 10
	}, this);
}
export { ProductNotFound as notFoundComponent };
