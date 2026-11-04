import { __toESM } from "../_runtime.mjs";
import { categories, hasDigitalEdition, hasPhysicalEdition, products } from "./products-vOGwWypY.mjs";
import { BookCover } from "./BookCover-B1Dot2B7.mjs";
import { LogoMark, Route$6, WHATSAPP_DISPLAY, useCatalogText, useLanguage, useStore, whatsappLink } from "./router-D0crWlZ4.mjs";
import { ProductCard } from "./ProductCard-BgyYRf9V.mjs";
import { require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { BookOpen, Download, FileText, Package, Search } from "../_libs/lucide-react.mjs";
import { Compass, Zap } from "../_libs/lucide-react6.mjs";
import { Heart } from "../_libs/lucide-react7.mjs";
import { MessageCircle } from "../_libs/lucide-react10.mjs";
import { require_jsx_dev_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/routes-CZWES7ON.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
function Home() {
	const loaderData = Route$6.useLoaderData();
	const liveProducts = loaderData?.products && loaderData.products.length > 0 ? loaderData.products : products;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Hero, { productsList: liveProducts }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 16,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Promises, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 17,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Store, { productsList: liveProducts }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 18,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(About, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 19,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Contact, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 20,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 15,
		columnNumber: 10
	}, this);
}
function Hero({ productsList }) {
	const { t } = useLanguage();
	const featured = productsList.filter((p) => p.featured);
	const [back, front] = [featured[0], featured[2] ?? featured[1]];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "relative overflow-hidden border-b border-[#49365D] bg-[#0B0A10] py-16 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,_rgba(120,81,216,0.22),_transparent_75%)]" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 35,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "pointer-events-none absolute inset-0 opacity-[0.03]",
				style: {
					backgroundImage: "radial-gradient(circle at 1px 1px, #B99AF5 1px, transparent 0)",
					backgroundSize: "32px 32px"
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 38,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "wrap relative grid items-center gap-12 md:grid-cols-[1.15fr_.85fr] md:gap-14",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-2 rounded-full border border-[#49365D] bg-[#21182F]/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#B99AF5]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, {
							size: 13,
							className: "text-[#B99AF5]"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 47,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "DIGITAL & PHYSICAL BOOKSTORE" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 48,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 46,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "my-5 font-serif text-[clamp(40px,5.8vw,70px)] font-normal leading-[1.05] tracking-tight text-[#F7F4FC]",
						children: t("hero.title")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 52,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mb-8 max-w-[540px] text-[15px] leading-relaxed text-[#B5ADC5]",
						children: "Discover curated eBooks, digital storybooks, drawing workbooks, and printed physical editions in Tamil and English — with instant downloads and doorstep courier delivery."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 57,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center gap-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: "#books",
							className: "btn btn-fill !px-6 !py-3 text-[14px] font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, { size: 16 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 64,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("hero.cta") }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 65,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 63,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/",
							hash: "about",
							className: "btn !px-5 !py-3 text-[14px]",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Compass, { size: 16 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 68,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("hero.story") }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 69,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 67,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 62,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] tracking-widest text-[#B5ADC5]/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, {
									size: 13,
									className: "text-[#B99AF5]"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 76,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "DIGITAL EBOOKS & GUIDES" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 77,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 75,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, {
									size: 13,
									className: "text-amber-300"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 80,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "PRINTED PHYSICAL BOOKS" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 81,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 79,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, {
									size: 13,
									className: "text-[#B99AF5]"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 84,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "BILINGUAL (EN & தமிழ்)" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 85,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 83,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 74,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 44,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative mx-auto flex h-[310px] w-full max-w-[380px] items-center justify-center md:h-[380px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute h-[260px] w-[260px] rounded-full border border-[#7851D8]/30 bg-[#21182F]/40 shadow-[0_0_80px_rgba(120,81,216,0.18)] backdrop-blur-[2px] md:h-[310px] md:w-[310px]" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 92,
							columnNumber: 11
						}, this),
						back && /* @__PURE__ */ (void 0)(Link, {
							to: "/products/$productId",
							params: { productId: String(back.id) },
							className: "absolute left-[8%] top-[6%] w-[140px] rotate-[-8deg] opacity-90 transition-transform duration-300 hover:rotate-[-4deg] hover:scale-105 md:w-[170px]",
							"aria-label": `Featured: ${back.name}`,
							children: /* @__PURE__ */ (void 0)(BookCover, { product: back }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 97,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 94,
							columnNumber: 20
						}, this),
						front && /* @__PURE__ */ (void 0)(Link, {
							to: "/products/$productId",
							params: { productId: String(front.id) },
							className: "relative ml-14 mt-6 w-[160px] rotate-[5deg] transition-transform duration-300 hover:rotate-0 hover:scale-105 md:w-[195px]",
							"aria-label": `Featured: ${front.name}`,
							children: /* @__PURE__ */ (void 0)(BookCover, { product: front }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 103,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 100,
							columnNumber: 21
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "absolute -bottom-2 right-2 flex items-center gap-2 rounded-full border border-[#49365D] bg-[#21182F]/90 px-3 py-1.5 text-[11px] font-medium text-[#F7F4FC] shadow-lg backdrop-blur-md",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-2 w-2 rounded-full bg-[#7851D8] animate-pulse" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 108,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Digital Downloads & Physical Shipping" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 109,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 107,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 91,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 43,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 33,
		columnNumber: 10
	}, this);
}
function Promises() {
	const { t } = useLanguage();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "border-b border-[#49365D] bg-[#140E20] py-8",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "wrap grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4",
			children: [
				{
					titleKey: "promise.1t",
					bodyKey: "promise.1b",
					icon: Download
				},
				{
					titleKey: "promise.2t",
					bodyKey: "promise.2b",
					icon: BookOpen
				},
				{
					titleKey: "promise.3t",
					bodyKey: "promise.3b",
					icon: Zap
				},
				{
					titleKey: "promise.4t",
					bodyKey: "promise.4b",
					icon: MessageCircle
				}
			].map(({ titleKey, bodyKey, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-start gap-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex h-9 w-9 flex-none items-center justify-center rounded-md border border-[#49365D] bg-[#21182F] text-[#B99AF5]",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, {
						size: 16,
						strokeWidth: 1.8
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 148,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 147,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "font-serif text-lg leading-tight text-[#F7F4FC]",
					children: t(titleKey)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 151,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-1 text-[12px] leading-relaxed text-[#B5ADC5]",
					children: t(bodyKey)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 154,
					columnNumber: 15
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 150,
					columnNumber: 13
				}, this)]
			}, titleKey, true, {
				fileName: _jsxFileName,
				lineNumber: 146,
				columnNumber: 13
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 141,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 140,
		columnNumber: 10
	}, this);
}
function Store({ productsList }) {
	const { t } = useLanguage();
	const text = useCatalogText();
	const { wishlist } = useStore();
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("all");
	const [format, setFormat] = (0, import_react.useState)("all");
	const [productTypeFilter, setProductTypeFilter] = (0, import_react.useState)("all");
	const [onlySaved, setOnlySaved] = (0, import_react.useState)(false);
	const visible = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return productsList.filter((p) => {
			const haystack = [
				p.name,
				p.nameTa,
				p.shortDescription,
				p.shortDescriptionTa,
				p.coverWord
			].join(" ").toLowerCase();
			const matchesType = productTypeFilter === "all" || productTypeFilter === "digital" && hasDigitalEdition(p) || productTypeFilter === "physical" && hasPhysicalEdition(p);
			return (!q || haystack.includes(q)) && matchesType && (category === "all" || p.category === category) && (format === "all" || p.format === format) && (!onlySaved || wishlist.includes(p.id));
		});
	}, [
		productsList,
		query,
		category,
		format,
		productTypeFilter,
		onlySaved,
		wishlist
	]);
	const reset = () => {
		setQuery("");
		setCategory("all");
		setFormat("all");
		setProductTypeFilter("all");
		setOnlySaved(false);
	};
	const digitalCount = productsList.filter(hasDigitalEdition).length;
	const physicalCount = productsList.filter(hasPhysicalEdition).length;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "books",
		className: "scroll-mt-24 border-b border-[#49365D]/40 bg-[#0B0A10] py-16 md:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			id: "store",
			className: "-mt-24 block h-0"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 197,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "wrap",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "eyebrow",
						children: t("store.eyebrow")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 203,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "mt-2 font-serif text-[34px] font-normal leading-tight text-[#F7F4FC] md:text-[42px]",
						children: t("store.title")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 204,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 202,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "max-w-[460px] text-[13px] leading-relaxed text-[#B5ADC5]",
						children: "Browse our complete collection of digital eBooks, drawing workbooks, children’s storybooks, and printed physical editions."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 208,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 201,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-6 flex flex-wrap items-center gap-2 border-b border-[#49365D]/60 pb-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setProductTypeFilter("all"),
							className: `flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${productTypeFilter === "all" ? "border-[#7851D8] bg-[#7851D8] text-[#F7F4FC] shadow-[0_0_12px_rgba(120,81,216,0.3)]" : "border-[#49365D] bg-[#21182F] text-[#B5ADC5] hover:border-[#7851D8]/60 hover:text-[#F7F4FC]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, { size: 14 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 216,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
								"All Books (",
								products.length,
								")"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 217,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 215,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setProductTypeFilter("digital"),
							className: `flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${productTypeFilter === "digital" ? "border-[#7851D8] bg-[#7851D8] text-[#F7F4FC] shadow-[0_0_12px_rgba(120,81,216,0.3)]" : "border-[#49365D] bg-[#21182F] text-[#B5ADC5] hover:border-[#7851D8]/60 hover:text-[#F7F4FC]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, {
								size: 14,
								className: "text-[#B99AF5]"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 221,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
								"Digital Products (",
								digitalCount,
								")"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 222,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 220,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setProductTypeFilter("physical"),
							className: `flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${productTypeFilter === "physical" ? "border-[#7851D8] bg-[#7851D8] text-[#F7F4FC] shadow-[0_0_12px_rgba(120,81,216,0.3)]" : "border-[#49365D] bg-[#21182F] text-[#B5ADC5] hover:border-[#7851D8]/60 hover:text-[#F7F4FC]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, {
								size: 14,
								className: "text-amber-400"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 226,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
								"Physical Books (",
								physicalCount,
								")"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 227,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 225,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 214,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6",
					children: categories.map((c) => {
						const active = category === c.id;
						const count = products.filter((p) => p.category === c.id).length;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setCategory(active ? "all" : c.id),
							"aria-pressed": active,
							className: `rounded-lg border p-3.5 text-left transition-all ${active ? "border-[#7851D8] bg-[#291D3C] shadow-[0_0_18px_rgba(120,81,216,0.25)]" : "border-[#49365D] bg-[#21182F] hover:border-[#7851D8]/70 hover:bg-[#251b36]"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "block font-serif text-[16px] font-medium leading-tight text-[#F7F4FC]",
									children: text.category(c)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 237,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "mt-1 block text-[10px] text-[#B5ADC5] line-clamp-1",
									children: text.categoryBlurb(c)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 240,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "mt-2 inline-block text-[10px] font-mono font-medium tracking-[0.14em] text-[#B99AF5]",
									children: [
										count,
										" ",
										t("store.items")
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 243,
									columnNumber: 17
								}, this)
							]
						}, c.id, true, {
							fileName: _jsxFileName,
							lineNumber: 236,
							columnNumber: 18
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 232,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-7 flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "relative min-w-[220px] flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, {
								size: 16,
								className: "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#837996]"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 253,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "search",
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "Search by title, topic, author or keyword…",
								"aria-label": t("store.search"),
								className: "field w-full !pl-10"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 254,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 252,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							value: format,
							onChange: (e) => setFormat(e.target.value),
							"aria-label": t("product.format"),
							className: "field cursor-pointer",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "all",
									children: t("store.allFormats")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 258,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "ebook",
									children: text.format("ebook")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 259,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "template",
									children: text.format("template")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 260,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "guide",
									children: text.format("guide")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 261,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "artbook",
									children: text.format("artbook")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 262,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "storybook",
									children: text.format("storybook")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 263,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "workbook",
									children: text.format("workbook")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 264,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 257,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setOnlySaved((v) => !v),
							"aria-pressed": onlySaved,
							className: `field flex cursor-pointer items-center gap-2 transition-colors ${onlySaved ? "!border-[#7851D8] !bg-[#7851D8]/20 !text-[#B99AF5]" : "hover:border-[#7851D8]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, {
								size: 15,
								strokeWidth: 1.8,
								fill: onlySaved ? "currentColor" : "none",
								className: "text-[#B99AF5]"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 268,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
								t("store.wishlist"),
								" (",
								wishlist.length,
								")"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 269,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 267,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 251,
					columnNumber: 9
				}, this),
				visible.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: visible.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, { product: p }, p.id, false, {
						fileName: _jsxFileName,
						lineNumber: 277,
						columnNumber: 31
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 276,
					columnNumber: 31
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-lg border border-dashed border-[#49365D] bg-[#21182F] py-16 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mb-4 text-sm text-[#B5ADC5]",
						children: t("store.empty")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 279,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: reset,
						className: "btn",
						children: t("store.reset")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 280,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 278,
					columnNumber: 20
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 199,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 196,
		columnNumber: 10
	}, this);
}
function About() {
	const { t } = useLanguage();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "about",
		className: "scroll-mt-24 border-y border-[#49365D] bg-[#140E20] py-16 md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "wrap grid items-center gap-10 md:grid-cols-[.85fr_1.15fr] md:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-lg border border-[#49365D] bg-[#21182F] p-8 text-center shadow-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogoMark, { className: "mx-auto mb-4 h-16 w-16 drop-shadow-[0_0_15px_rgba(120,81,216,0.35)]" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 294,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
						className: "block font-serif text-3xl font-medium tracking-[0.2em] text-[#F7F4FC]",
						children: "AUVYRA"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 295,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "mt-1.5 block text-[9px] tracking-[0.26em] text-[#B5ADC5]",
						children: "KNOWLEDGE BEYOND LIMITS"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 298,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "my-4 mx-auto h-px w-16 bg-[#49365D]" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 301,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "block font-serif text-lg italic text-[#B99AF5]",
						children: "Barath & Kavi"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 302,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "mt-1 block text-[11px] text-[#B5ADC5]",
						children: "Founders & Authors"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 305,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 293,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "eyebrow",
					children: t("about.eyebrow")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 311,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mb-4 mt-2 font-serif text-[34px] font-normal leading-tight text-[#F7F4FC] md:text-[42px]",
					children: t("about.title")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 312,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[14px] leading-relaxed text-[#B5ADC5]",
					children: t("about.body")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 315,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex flex-wrap gap-x-6 gap-y-2.5 text-[12px] text-[#F7F4FC]",
					children: [
						"about.v1",
						"about.v2",
						"about.v3"
					].map((k) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[#B99AF5]",
							children: "✦"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 320,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t(k) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 321,
							columnNumber: 17
						}, this)]
					}, k, true, {
						fileName: _jsxFileName,
						lineNumber: 319,
						columnNumber: 71
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 318,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 310,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 292,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 291,
		columnNumber: 10
	}, this);
}
function Contact() {
	const { t } = useLanguage();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "contact",
		className: "scroll-mt-24 bg-[#0B0A10] py-16 text-center md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "wrap",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-xl rounded-xl border border-[#49365D] bg-[#21182F] p-8 md:p-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "eyebrow",
						children: t("contact.eyebrow")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 335,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "my-3 font-serif text-[32px] font-normal leading-tight text-[#F7F4FC] md:text-[38px]",
						children: t("contact.title")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 336,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mx-auto mb-7 max-w-md text-[13px] leading-relaxed text-[#B5ADC5]",
						children: t("contact.body")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 339,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: whatsappLink(),
						target: "_blank",
						rel: "noopener",
						className: "btn btn-fill !px-6 !py-3 text-[14px]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { size: 16 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 343,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["WhatsApp AUVYRA · ", WHATSAPP_DISPLAY] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 344,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 342,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 334,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 333,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 332,
		columnNumber: 10
	}, this);
}
export { Home as component };
