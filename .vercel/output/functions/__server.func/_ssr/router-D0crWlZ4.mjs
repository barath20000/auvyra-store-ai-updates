import { __toESM } from "../_runtime.mjs";
import { formatPrice, getPrice, getProduct, products } from "./products-vOGwWypY.mjs";
import { TSS_SERVER_FUNCTION, createServerFn, getServerFnById } from "./ssr.mjs";
import { notFound, require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { HeadContent, Link, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent } from "../_libs/@tanstack/react-router+[2...].mjs";
import { BookOpen, CircleAlert, CircleCheck, Download, ExternalLink, Eye, FileText, Image, KeyRound, LogOut, Minus, Package, PenLine, Plus, RefreshCw, RotateCcwClock, Search, Shield, ShoppingBag, Trash, Upload, UserCheck, Users, X } from "../_libs/lucide-react.mjs";
import { require_jsx_dev_runtime } from "../_libs/react.mjs";
import { _enum, array, boolean, number, object, string } from "../_libs/zod.mjs";
// node_modules/.nitro/vite/services/ssr/assets/adminActions-CMDXC7Qy.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var adminLoginServerFn = createServerFn({ method: "POST" }).validator(object({
	email: string().email(),
	password: string().min(1)
})).handler(createSsrRpc("66c35d8a9a4962a44631ac079d54f7e2b238ab0a8aff1086d90c9c6926cd8dfe"));
var adminVerifySessionServerFn = createServerFn({ method: "POST" }).validator(object({ token: string().optional() })).handler(createSsrRpc("b569614c4114cb50bbdb4c9b85e6425f67c9f69885ad344a25b32313ed013085"));
var adminLogoutServerFn = createServerFn({ method: "POST" }).validator(object({ token: string() })).handler(createSsrRpc("9b768b4884588cec31dcfc004942fcc650b2e700fafd7f4b55413b2a30b9dae4"));
var adminGetDashboardDataServerFn = createServerFn({ method: "POST" }).validator(object({ token: string() })).handler(createSsrRpc("24bb4eaa8ecd874f2adceb7adcb5ba3e5ff1b8038c30274c201bf8ab7dd2a6e1"));
var adminPollSyncServerFn = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	clientVersion: number()
})).handler(createSsrRpc("8258ddb6dc1d40926547ff944d4a60eab09ab60eb5e403ab05e1b53260cea2af"));
var adminSaveProductServerFn = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	product: object({
		id: number().optional(),
		slug: string().min(1),
		category: string(),
		format: string(),
		language: _enum([
			"en",
			"ta",
			"both"
		]),
		coverWord: string(),
		name: string().min(1),
		nameTa: string().min(1),
		shortDescription: string(),
		shortDescriptionTa: string(),
		description: string(),
		descriptionTa: string(),
		includes: array(string()),
		includesTa: array(string()),
		pages: number().min(1),
		price: number().min(0),
		digitalPrice: number().min(0),
		physicalPrice: number().optional(),
		productType: _enum([
			"digital",
			"physical",
			"both"
		]),
		physicalStock: number().min(0),
		featured: boolean().optional(),
		coverImage: string().optional(),
		dimensions: string().optional(),
		isbn: string().optional(),
		expectedVersion: number().optional()
	})
})).handler(createSsrRpc("1e5622c2ecff17968bb8d3fd1f814ec6b198fd5102cced8f439b13cc26df7218"));
var adminDeleteProductServerFn = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	productId: number()
})).handler(createSsrRpc("15a6d38833eaecaefec003a853dff3e1dc4879b74ba1d7e8183fc5fde45089e3"));
var adminUpdateStockServerFn = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	productId: number(),
	newStock: number().min(0)
})).handler(createSsrRpc("a75068fb223dd105723d0c6377f93755591ca1fb35fa1c117323ae9ed774c184"));
var adminUpdateOrderStatusServerFn = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	orderId: string(),
	paymentStatus: _enum(["pending", "verified"]),
	shippingStatus: _enum([
		"pending_verification",
		"processing",
		"dispatched",
		"delivered"
	]).optional()
})).handler(createSsrRpc("e8157de9022d12a8aa423a39dfbc65d600e77129e888ddfc2169d5bebff89295"));
var adminUploadFileServerFn = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	productId: number(),
	fileType: _enum(["pdf", "cover"]),
	fileName: string(),
	base64Data: string()
})).handler(createSsrRpc("a6cc033e526b7133f6c210165914f1c93fe7393a2daa938f169365e3bccf1506"));
var adminDownloadPdfServerFn = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	fileName: string()
})).handler(createSsrRpc("162299fab99157ab06a2d09a7ba54db249b498c2ed8f571dfbb0787caee950ff"));
var getPublicStoreProductsServerFn = createServerFn({ method: "GET" }).handler(createSsrRpc("42068fafb1a85499050726466df6e5d785fc878d6990c762f0cf89227e8121c1"));
var submitCustomerOrderServerFn = createServerFn({ method: "POST" }).validator(object({ order: object({
	id: string(),
	createdAt: string(),
	customer: object({
		name: string().min(1, "Name is required"),
		email: string().email("Valid email is required"),
		whatsapp: string().min(5, "Valid contact number is required"),
		address: string().optional(),
		city: string().optional(),
		pincode: string().optional(),
		notes: string().optional()
	}),
	items: array(object({
		id: number().int().positive(),
		cartKey: string(),
		name: string(),
		price: number().optional(),
		quantity: number().int().min(1).max(50),
		edition: _enum(["digital", "physical"]),
		format: string(),
		category: string()
	})).min(1, "Order must contain at least one item"),
	paymentGateway: string().default("razorpay"),
	hasDigitalItems: boolean().optional(),
	hasPhysicalItems: boolean().optional(),
	subtotal: number().optional(),
	total: number().optional(),
	paymentStatus: string().optional(),
	shippingStatus: string().optional()
}) })).handler(createSsrRpc("2ca72aad11a5471bfa1e2d2c56be8c40142b6b0f25f41913d6bf88f2db25fb9a"));
// node_modules/.nitro/vite/services/ssr/assets/router-D0crWlZ4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var _jsxFileName$7 = "/app/applet/src/components/Logo.tsx";
/** The BK open-book mark: Barath (left page) and Kavi (right page). */
function LogoMark({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 64 64",
		fill: "none",
		"aria-hidden": "true",
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("defs", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("linearGradient", {
				id: "auvyra-logo-glow",
				x1: "0",
				y1: "0",
				x2: "64",
				y2: "64",
				gradientUnits: "userSpaceOnUse",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
					offset: "0%",
					stopColor: "#B99AF5"
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 12,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
					offset: "100%",
					stopColor: "#7851D8"
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 13,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 11,
				columnNumber: 9
			}, this) }, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 10,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
				d: "M7 15c10-4 18-2 25 5v33C24 46 16 44 7 48V15Z",
				stroke: "url(#auvyra-logo-glow)",
				strokeWidth: "2.4"
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 16,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
				d: "M57 15c-10-4-18-2-25 5v33c8-7 16-9 25-5V15Z",
				stroke: "url(#auvyra-logo-glow)",
				strokeWidth: "2.4"
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 21,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
				d: "M32 20v31",
				stroke: "#7851D8",
				strokeWidth: "1.6"
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 26,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
				x: "13",
				y: "37",
				fontSize: "12",
				fontFamily: "Georgia, serif",
				fill: "#B99AF5",
				fontWeight: "bold",
				children: "B"
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 27,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
				x: "39",
				y: "37",
				fontSize: "12",
				fontFamily: "Georgia, serif",
				fill: "#B99AF5",
				fontWeight: "bold",
				children: "K"
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 30,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$7,
		lineNumber: 4,
		columnNumber: 5
	}, this);
}
function Logo() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogoMark, { className: "h-9 w-9 flex-none sm:h-10 sm:w-10 drop-shadow-[0_0_12px_rgba(120,81,216,0.35)]" }, void 0, false, {
			fileName: _jsxFileName$7,
			lineNumber: 40,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "block font-serif text-[22px] font-medium tracking-[0.18em] text-[#F7F4FC] sm:text-[25px]",
				children: "AUVYRA"
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 42,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "mt-1 hidden text-[8px] tracking-[0.24em] text-[#B5ADC5] sm:block",
				children: "KNOWLEDGE BEYOND LIMITS"
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 45,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$7,
			lineNumber: 41,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$7,
		lineNumber: 39,
		columnNumber: 5
	}, this);
}
var _jsxFileName$6 = "/app/applet/src/lib/i18n.tsx";
var dictionary = {
	"nav.home": ["Home", "முகப்பு"],
	"nav.store": ["Store", "கடை"],
	"nav.about": ["About", "எங்களைப் பற்றி"],
	"nav.contact": ["Contact", "தொடர்பு"],
	"nav.cart": ["Cart", "கூடை"],
	"hero.eyebrow": ["Modern Digital Bookstore", "நவீன டிஜிட்டல் புத்தகக் கடை"],
	"hero.title": ["Knowledge is your greatest investment.", "அறிவே உங்கள் சிறந்த முதலீடு."],
	"hero.body": ["Carefully crafted eBooks, practical templates and actionable guides in Tamil and English — all in one place.", "தமிழ் மற்றும் ஆங்கிலத்தில் பயனுள்ள மின்னூல்கள், நடைமுறை டெம்ப்ளேட்கள் மற்றும் வழிகாட்டிகள் — ஒரே இடத்தில்."],
	"hero.cta": ["Explore Books", "நூல்களைப் பாருங்கள்"],
	"hero.story": ["Our story", "எங்கள் கதை"],
	"hero.note": ["EBOOKS · TEMPLATES · GUIDES · INSTANT ACCESS", "மின்னூல்கள் · டெம்ப்ளேட்கள் · வழிகாட்டிகள் · உடனடி அணுகல்"],
	"store.eyebrow": ["The collection", "எங்கள் தொகுப்பு"],
	"store.title": ["Explore our store", "எங்கள் கடையைப் பாருங்கள்"],
	"store.intro": ["Clear, useful digital resources for learning, work and everyday life. Instant digital delivery.", "கல்வி, வேலை மற்றும் அன்றாட வாழ்க்கைக்கான தெளிவான டிஜிட்டல் வளங்கள்."],
	"store.search": ["Search eBooks, templates and guides…", "மின்னூல்கள், டெம்ப்ளேட்கள் தேடுங்கள்…"],
	"store.all": ["All", "அனைத்தும்"],
	"store.allFormats": ["All formats", "அனைத்து வகைகள்"],
	"store.wishlist": ["Wishlist", "விருப்பப் பட்டியல்"],
	"store.empty": ["No products match your search.", "உங்கள் தேடலுக்குப் பொருந்தும் தயாரிப்புகள் இல்லை."],
	"store.reset": ["Clear filters", "வடிகட்டிகளை அழி"],
	"store.items": ["items", "தயாரிப்புகள்"],
	"card.add": ["Add to cart", "கூடையில் சேர்"],
	"card.added": ["In cart", "கூடையில் உள்ளது"],
	"card.save": ["Save", "சேமி"],
	"card.saved": ["Saved", "சேமிக்கப்பட்டது"],
	"card.pages": ["pages", "பக்கங்கள்"],
	"format.ebook": ["eBook", "மின்னூல்"],
	"format.template": ["Template", "டெம்ப்ளேட்"],
	"format.guide": ["Guide", "வழிகாட்டி"],
	"format.storybook": ["Illustrated Storybook", "வண்ணப் படக் கதைப் புத்தகம்"],
	"format.artbook": ["Art & Drawing Book", "வரைதல் & ஓவியப் புத்தகம்"],
	"format.workbook": ["Activity Workbook", "செயல்முறைப் பயிற்சி நூல்"],
	"productType.digital": ["Digital Product", "டிஜிட்டல் தயாரிப்பு"],
	"productType.physical": ["Physical Printed Book", "அச்சிடப்பட்ட புத்தகம்"],
	"productType.both": ["Digital & Physical", "டிஜிட்டல் & அச்சு இரண்டிலும்"],
	"edition.digital": ["Digital Edition (eBook)", "டிஜிட்டல் பதிப்பு (மின்னூல்)"],
	"edition.digitalShort": ["Digital (PDF)", "டிஜிட்டல் (PDF)"],
	"edition.digitalNote": ["Instant electronic download. Read on any phone, tablet or laptop.", "உடனடி மின்னணு பதிவிறக்கம். மொபைல், டேப்லெட், மடிக்கணினியில் படிக்கலாம்."],
	"edition.physical": ["Physical Book (Printed)", "அச்சிடப்பட்ட புத்தகம்"],
	"edition.physicalShort": ["Printed Book", "அச்சுப் புத்தகம்"],
	"edition.physicalNote": ["Delivered to your doorstep in durable high-quality print.", "உயர்தர தாளில் அச்சிடப்பட்டு உங்கள் முகவரிக்கு அனுப்பப்படும்."],
	"edition.selectPrompt": ["Choose Edition", "பதிப்பைத் தேர்ந்தெடுக்கவும்"],
	"edition.bothAvailable": ["Available in Digital & Physical", "டிஜிட்டல் & அச்சு இரண்டிலும்"],
	"filter.allTypes": ["All Types", "அனைத்து வகைகள்"],
	"filter.digital": ["Digital Products", "டிஜிட்டல் தயாரிப்புகள்"],
	"filter.physical": ["Physical Books", "அச்சிடப்பட்ட புத்தகங்கள்"],
	"checkout.shippingAddress": ["Doorstep Shipping Address", "டெலிவரி தெரு முகவரி"],
	"checkout.shippingCity": ["City / Town", "நகரம்"],
	"checkout.shippingPincode": ["Postal Pincode", "அஞ்சல் குறியீடு"],
	"checkout.shippingStreetPlaceholder": ["Door / Flat No., Street, Area, Landmark", "கதவு எண், தெரு, பகுதி"],
	"checkout.shippingCityPlaceholder": ["e.g. Chennai, Madurai, Coimbatore", "உதா. சென்னை, மதுரை, கோவை"],
	"checkout.shippingPincodePlaceholder": ["600001", "600001"],
	"checkout.shippingNotice": ["Physical copies are dispatched securely to this address.", "அச்சிடப்பட்ட புத்தகங்கள் இந்த முகவரிக்கு பாதுகாப்பாக அனுப்பப்படும்."],
	"confirmation.physicalStatus": ["Physical Book Dispatch", "அச்சுப் புத்தக விநியோகம்"],
	"confirmation.physicalNotice": ["Physical copies are carefully packaged and dispatched within 24–48 hours of payment verification.", "சரிபார்க்கப்பட்ட 24–48 மணி நேரத்திற்குள் அச்சுப் புத்தகங்கள் கவனமாக பேக் செய்யப்பட்டு அனுப்பப்படும்."],
	"confirmation.deliveryMethod": ["Fulfillment Details", "விநியோக விவரங்கள்"],
	"lang.en": ["English", "ஆங்கிலம்"],
	"lang.ta": ["Tamil", "தமிழ்"],
	"lang.both": ["Tamil + English", "தமிழ் + ஆங்கிலம்"],
	"product.back": ["Back to the store", "கடைக்குத் திரும்பு"],
	"product.includes": ["What's inside", "உள்ளே என்ன இருக்கிறது"],
	"product.language": ["Language", "மொழி"],
	"product.format": ["Format", "வகை"],
	"product.length": ["Length", "நீளம்"],
	"product.delivery": ["Delivery", "விநியோகம்"],
	"product.deliveryValue": ["Digital download (PDF)", "டிஜிட்டல் பதிவிறக்கம் (PDF)"],
	"product.buy": ["Buy now", "இப்போது வாங்கு"],
	"product.related": ["You may also like", "உங்களுக்குப் பிடிக்கலாம்"],
	"product.secure": ["Secure checkout powered by Stripe", "Stripe மூலம் பாதுகாப்பான கட்டணம்"],
	"cart.title": ["Your cart", "உங்கள் கூடை"],
	"cart.empty": ["Your cart is empty.", "உங்கள் கூடை காலியாக உள்ளது."],
	"cart.browse": ["Browse the store", "கடையைப் பாருங்கள்"],
	"cart.remove": ["Remove", "நீக்கு"],
	"cart.subtotal": ["Subtotal", "மொத்தம்"],
	"cart.note": ["Digital products are delivered electronically. No shipping fee.", "டிஜிட்டல் பொருட்கள் ஆன்லைனில் வழங்கப்படும். டெலிவரி கட்டணம் இல்லை."],
	"cart.productSubtotal": ["Product subtotal", "பொருட்களின் கூட்டுத்தொகை"],
	"cart.deliveryFee": ["Delivery fee", "விநியோகக் கட்டணம்"],
	"cart.digitalDelivery": ["Digital delivery", "டிஜிட்டல் விநியோகம்"],
	"cart.included": ["Included", "சேர்க்கப்பட்டுள்ளது"],
	"cart.free": ["FREE", "இலவசம்"],
	"cart.finalTotal": ["Final total", "இறுதி மொத்தம்"],
	"cart.freeUnlocked": ["You have unlocked FREE delivery!", "இலவச விநியோகம் கிடைத்துவிட்டது!"],
	"cart.addMore": ["Add {amount} more for FREE delivery.", "இலவச விநியோகத்திற்கு இன்னும் {amount} சேர்க்கவும்."],
	"cart.checkout": ["Checkout", "பணம் செலுத்து"],
	"checkout.processing": ["Processing…", "செயலாக்கப்படுகிறது…"],
	"checkout.whatsapp": ["Order on WhatsApp", "WhatsApp-இல் ஆர்டர் செய்"],
	"checkout.unavailableNote": ["Online payments are being set up. Message us on WhatsApp to order today.", "ஆன்லைன் கட்டணம் அமைக்கப்படுகிறது. இன்றே ஆர்டர் செய்ய WhatsApp-இல் தொடர்பு கொள்ளுங்கள்."],
	"checkout.error": ["Something went wrong. Please try again.", "ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும்."],
	"checkout.pageTitle": ["Checkout — AUVYRA", "பணம் செலுத்துதல் — AUVYRA"],
	"checkout.heading": ["Secure Checkout", "பாதுகாப்பான செக்அவுட்"],
	"checkout.subheading": ["Complete your customer details to place your digital order.", "உங்கள் டிஜிட்டல் ஆர்டரை வைக்க உங்கள் விவரங்களை உள்ளிடவும்."],
	"checkout.customerHeading": ["Customer Information", "வாடிக்கையாளர் தகவல்கள்"],
	"checkout.fullName": ["Full Name", "முழுப் பெயர்"],
	"checkout.fullNamePlaceholder": ["e.g. Barath Sudhakar", "உதா. பரத் சுதாகர்"],
	"checkout.emailAddress": ["Email Address for Digital Delivery", "டிஜிட்டல் விநியோகத்திற்கான மின்னஞ்சல்"],
	"checkout.emailPlaceholder": ["you@example.com", "you@example.com"],
	"checkout.whatsappNumber": ["WhatsApp Mobile Number", "வாட்ஸ்அப் எண்"],
	"checkout.whatsappPlaceholder": ["98765 43210", "98765 43210"],
	"checkout.whatsappHelp": ["Order confirmation & verification updates will be sent here.", "ஆர்டர் உறுதிப்படுத்தல் மற்றும் சரிபார்ப்பு விவரங்கள் இங்கு அனுப்பப்படும்."],
	"checkout.notesLabel": ["Order Notes (Optional)", "கூடுதல் குறிப்புகள் (விருப்பத்தேர்வு)"],
	"checkout.notesPlaceholder": ["Special instructions or alternate email...", "குறிப்புகள் அல்லது மாற்று மின்னஞ்சல் முகவரி..."],
	"checkout.orderSummary": ["Order Summary", "ஆர்டர் சுருக்கம்"],
	"checkout.digitalNotice": ["Digital downloads delivered upon payment verification. No physical shipping charges.", "கட்டணம் சரிபார்க்கப்பட்டதும் டிஜிட்டல் கோப்புகள் வழங்கப்படும். டெலிவரி கட்டணம் இல்லை."],
	"checkout.paymentHeading": ["Payment Verification", "கட்டண சரிபார்ப்பு"],
	"checkout.paymentPendingNotice": ["Payment status will remain Pending until confirmed. Direct UPI / Bank verification is active.", "கட்டணம் உறுதிப்படுத்தப்படும் வரை நிலை நிலுவையில் இருக்கும். நேரடி UPI / வங்கி சரிபார்ப்பு செயல்படுகிறது."],
	"checkout.placeOrderBtn": ["Place Order", "ஆர்டரை வைக்கவும்"],
	"checkout.placingOrderBtn": ["Placing Order…", "ஆர்டர் செய்யப்படுகிறது…"],
	"checkout.emptyCartTitle": ["Your cart is empty", "உங்கள் கூடை காலியாக உள்ளது"],
	"checkout.emptyCartMsg": ["Add some eBooks or templates to your cart before proceeding to checkout.", "செக்அவுட் செய்வதற்கு முன் சில மின்னூல்கள் அல்லது டெம்ப்ளேட்களை கூடையில் சேர்க்கவும்."],
	"checkout.returnToStore": ["Return to Bookstore", "புத்தகக் கடைக்குத் திரும்பு"],
	"checkout.viewCart": ["Edit Cart", "கூடையைத் திருத்து"],
	"checkout.securityGuarantee": ["Instant order recording · Anti-duplicate protection · Direct creator verification", "உடனடி ஆர்டர் பதிவு · நகல் பாதுகாப்பு · நேரடி படைப்பாளர் சரிபார்ப்பு"],
	"confirmation.title": ["Order Placed Successfully", "ஆர்டர் வெற்றிகரமாக வைக்கப்பட்டது"],
	"confirmation.subtitle": ["Thank you! Your order details have been recorded.", "நன்றி! உங்கள் ஆர்டர் விவரங்கள் பதிவு செய்யப்பட்டுள்ளன."],
	"confirmation.orderIdLabel": ["Order ID", "ஆர்டர் எண்"],
	"confirmation.statusLabel": ["Payment Status", "கட்டண நிலை"],
	"confirmation.statusPending": ["Pending Verification", "சரிபார்ப்பு நிலுவையில் உள்ளது"],
	"confirmation.statusVerified": ["Payment Verified & Active", "கட்டணம் சரிபார்க்கப்பட்டது"],
	"confirmation.customerDetails": ["Customer & Delivery Details", "வாடிக்கையாளர் & விநியோக விவரங்கள்"],
	"confirmation.orderedItems": ["Ordered Products", "ஆர்டர் செய்யப்பட்ட தயாரிப்புகள்"],
	"confirmation.digitalAccessHeading": ["Digital Product Download", "டிஜிட்டல் தயாரிப்பு பதிவிறக்கம்"],
	"confirmation.lockedNotice": ["Download access will automatically unlock once payment is verified by our team. Verification typically completes within 5–15 minutes.", "எங்கள் குழுவால் கட்டணம் சரிபார்க்கப்பட்டதும் பதிவிறக்க அனுமதி தானாகவே திறக்கப்படும். வழக்கமாக 5-15 நிமிடங்களில் முடிவடையும்."],
	"confirmation.verifiedNotice": ["Your payment has been verified! You now have permanent access to your purchased digital files.", "உங்கள் கட்டணம் சரிபார்க்கப்பட்டது! நீங்கள் வாங்கிய டிஜிட்டல் கோப்புகளை இப்போது பதிவிறக்கலாம்."],
	"confirmation.downloadBtn": ["Download PDF / Files", "PDF / கோப்புகளைப் பதிவிறக்கு"],
	"confirmation.lockedBtn": ["Download Locked (Pending Payment)", "பதிவிறக்கம் பூட்டப்பட்டுள்ளது"],
	"confirmation.sendOnWhatsapp": ["Confirm & Send Payment on WhatsApp", "வாட்ஸ்அப்பில் கட்டணத்தை உறுதிப்படுத்து"],
	"confirmation.simulateVerification": ["Simulate Payment Verification (Demo Mode)", "கட்டண சரிபார்ப்பை உருவகப்படுத்து (டெமோ)"],
	"order.eyebrow": ["WhatsApp order", "WhatsApp ஆர்டர்"],
	"order.title": ["Your details", "உங்கள் விவரங்கள்"],
	"order.close": ["Close", "மூடு"],
	"order.total": ["Total", "மொத்தம்"],
	"order.name": ["Full name", "முழுப் பெயர்"],
	"order.mobile": ["Mobile number", "கைபேசி எண்"],
	"order.address": ["Full delivery address", "முழு முகவரி"],
	"order.addressHint": ["House no., street, area, city, district, state", "வீட்டு எண், தெரு, பகுதி, நகரம், மாவட்டம், மாநிலம்"],
	"order.pincode": ["Pincode", "அஞ்சல் குறியீடு"],
	"order.submit": ["Send order on WhatsApp", "WhatsApp-இல் ஆர்டரை அனுப்பு"],
	"order.note": ["WhatsApp opens with your order ready. Tap send and our team will confirm payment and delivery.", "உங்கள் ஆர்டருடன் WhatsApp திறக்கும். அனுப்பு என்பதைத் தட்டுங்கள்; எங்கள் குழு கட்டணம் மற்றும் விநியோகத்தை உறுதிப்படுத்தும்."],
	"order.err.required": ["This field is required.", "இந்தப் புலம் அவசியம்."],
	"order.err.name": ["Please enter your full name.", "உங்கள் முழுப் பெயரை உள்ளிடவும்."],
	"order.err.mobile": ["Enter a valid 10-digit mobile number.", "சரியான 10 இலக்க கைபேசி எண்ணை உள்ளிடவும்."],
	"order.err.address": ["Please enter your complete address.", "உங்கள் முழு முகவரியை உள்ளிடவும்."],
	"order.err.pincode": ["Enter a valid 6-digit pincode.", "சரியான 6 இலக்க அஞ்சல் குறியீட்டை உள்ளிடவும்."],
	"order.sentTitle": ["Almost done!", "கிட்டத்தட்ட முடிந்தது!"],
	"order.sentBody": ["Your order is ready in WhatsApp. Tap send there to place it, and we will reply shortly to confirm.", "உங்கள் ஆர்டர் WhatsApp-இல் தயாராக உள்ளது. அங்கே அனுப்பு என்பதைத் தட்டுங்கள்; விரைவில் உறுதிப்படுத்துவோம்."],
	"order.reopen": ["Open WhatsApp again", "மீண்டும் WhatsApp திற"],
	"order.done": ["Done", "சரி"],
	"about.eyebrow": ["About AUVYRA", "AUVYRA பற்றி"],
	"about.title": ["Knowledge should move with you.", "அறிவு உங்களுடன் பயணிக்க வேண்டும்."],
	"about.body": ["AUVYRA is an independent digital publishing store founded by Barath and Kavi. Our aim is to make useful knowledge clear, approachable and easy to carry wherever you go — in the language you think in.", "AUVYRA என்பது பரத் மற்றும் கவி ஆகியோரால் தொடங்கப்பட்ட ஒரு சுயாதீன டிஜிட்டல் பதிப்பகம். பயனுள்ள அறிவை தெளிவாகவும், எளிதாகவும், நீங்கள் சிந்திக்கும் மொழியிலும் வழங்குவதே எங்கள் நோக்கம்."],
	"about.v1": ["Simple to understand", "எளிதில் புரியும்"],
	"about.v2": ["Useful in real life", "நிஜ வாழ்க்கையில் பயனுள்ளது"],
	"about.v3": ["Learn at your pace", "உங்கள் வேகத்தில் கற்றுக்கொள்ளுங்கள்"],
	"promise.1t": ["Tamil & English", "தமிழ் & ஆங்கிலம்"],
	"promise.1b": ["Written for how you read", "நீங்கள் படிக்கும் விதத்திற்கேற்ப"],
	"promise.2t": ["Instant digital files", "உடனடி டிஜிட்டல் கோப்புகள்"],
	"promise.2b": ["PDF, Docs and Sheets", "PDF, Docs மற்றும் Sheets"],
	"promise.3t": ["Fair, simple pricing", "நியாயமான விலை"],
	"promise.3b": ["Most titles under ₹300", "பெரும்பாலானவை ₹300-க்குள்"],
	"promise.4t": ["Real human support", "உண்மையான உதவி"],
	"promise.4b": ["Message us on WhatsApp", "WhatsApp-இல் தொடர்பு கொள்ளுங்கள்"],
	"featured.eyebrow": ["Editor’s picks", "தேர்ந்தெடுத்தவை"],
	"featured.title": ["Start with these", "இவற்றிலிருந்து தொடங்குங்கள்"],
	"contact.eyebrow": ["Contact AUVYRA", "AUVYRA-வைத் தொடர்பு கொள்ள"],
	"contact.title": ["Your next idea starts here.", "உங்கள் அடுத்த யோசனை இங்கே தொடங்குகிறது."],
	"contact.body": ["For questions, bulk orders and support, message our team on WhatsApp.", "கேள்விகள், மொத்த ஆர்டர்கள் மற்றும் உதவிக்கு WhatsApp-இல் எங்களைத் தொடர்பு கொள்ளுங்கள்."],
	"footer.rights": ["All rights reserved.", "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."],
	"success.title": ["Thank you for your order", "உங்கள் ஆர்டருக்கு நன்றி"],
	"success.body": ["Your payment is complete. Your files will be sent to the email address you used at checkout. If anything is missing, message us on WhatsApp and we will help right away.", "உங்கள் கட்டணம் முடிந்தது. கட்டணத்தின் போது கொடுத்த மின்னஞ்சலுக்கு உங்கள் கோப்புகள் அனுப்பப்படும். ஏதேனும் சிக்கல் இருந்தால் WhatsApp-இல் தொடர்பு கொள்ளுங்கள்."],
	"cancel.title": ["Checkout cancelled", "கட்டணம் ரத்து செய்யப்பட்டது"],
	"cancel.body": ["No payment was taken. Your cart is saved whenever you are ready.", "எந்தக் கட்டணமும் எடுக்கப்படவில்லை. உங்கள் கூடை சேமிக்கப்பட்டுள்ளது."],
	"cancel.back": ["Return to cart", "கூடைக்குத் திரும்பு"],
	"common.home": ["Back to home", "முகப்புக்குத் திரும்பு"],
	"notFound.title": ["Page not found", "பக்கம் கிடைக்கவில்லை"],
	"notFound.body": ["The page you are looking for has moved or does not exist.", "நீங்கள் தேடும் பக்கம் நகர்த்தப்பட்டது அல்லது இல்லை."]
};
var LanguageContext = (0, import_react.createContext)(null);
var STORAGE_KEY = "auvyra:lang";
function LanguageProvider({ children }) {
	const [lang, setLangState] = (0, import_react.useState)("en");
	(0, import_react.useEffect)(() => {
		const saved = window.localStorage.getItem(STORAGE_KEY);
		if (saved === "ta" || saved === "en") setLangState(saved);
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = lang;
	}, [lang]);
	const setLang = (next) => {
		setLangState(next);
		window.localStorage.setItem(STORAGE_KEY, next);
	};
	const t = (key) => dictionary[key][lang === "ta" ? 1 : 0];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LanguageContext.Provider, {
		value: {
			lang,
			setLang,
			t
		},
		children
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 306,
		columnNumber: 5
	}, this);
}
function useLanguage() {
	const ctx = (0, import_react.useContext)(LanguageContext);
	if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
	return ctx;
}
/** Localized accessors for catalog content. */
function useCatalogText() {
	const { lang, t } = useLanguage();
	const ta = lang === "ta";
	return {
		name: (p) => ta ? p.nameTa : p.name,
		short: (p) => ta ? p.shortDescriptionTa : p.shortDescription,
		description: (p) => ta ? p.descriptionTa : p.description,
		includes: (p) => ta ? p.includesTa : p.includes,
		category: (c) => ta ? c.nameTa : c.name,
		categoryBlurb: (c) => ta ? c.blurbTa : c.blurb,
		format: (f) => t(`format.${f}`),
		edition: (ed) => t(`edition.${ed}`),
		editionShort: (ed) => t(`edition.${ed}Short`),
		productType: (pt) => t(`productType.${pt}`),
		language: (l) => t(`lang.${l}`)
	};
}
var _jsxFileName$5 = "/app/applet/src/lib/store.tsx";
var StoreContext = (0, import_react.createContext)(null);
var CART_KEY = "auvyra:cart";
var WISH_KEY = "auvyra:wishlist";
var MAX_QUANTITY = 99;
function makeCartKey(id, edition = "digital") {
	return `${id}:${edition}`;
}
function parseCartKey(cartKey) {
	const [idStr, editionStr] = cartKey.split(":");
	return {
		id: Number(idStr),
		edition: editionStr === "physical" ? "physical" : "digital"
	};
}
function readCart() {
	try {
		const raw = JSON.parse(window.localStorage.getItem(CART_KEY) ?? "[]");
		const entries = [];
		if (Array.isArray(raw)) {
			for (const item of raw) if (typeof item === "number") entries.push({
				id: item,
				edition: "digital",
				quantity: 1
			});
			else if (item && typeof item === "object" && "id" in item) entries.push({
				id: Number(item.id),
				edition: item.edition === "physical" ? "physical" : "digital",
				quantity: Number(item.quantity) || 1
			});
		} else if (raw && typeof raw === "object" && "items" in raw && Array.isArray(raw.items)) {
			for (const item of raw.items) if (item && typeof item === "object" && "id" in item) entries.push({
				id: Number(item.id),
				edition: item.edition === "physical" ? "physical" : "digital",
				quantity: Number(item.quantity) || 1
			});
		}
		const keys = [];
		const quantities = {};
		for (const entry of entries) {
			const product = products.find((p) => p.id === entry.id);
			if (!product) continue;
			const edition = entry.edition ?? (product.productType === "physical" ? "physical" : "digital");
			const key = makeCartKey(entry.id, edition);
			const qty = Math.min(MAX_QUANTITY, Math.max(1, Math.floor(entry.quantity || 1)));
			if (!keys.includes(key)) {
				keys.push(key);
				quantities[key] = qty;
			} else quantities[key] = Math.min(MAX_QUANTITY, (quantities[key] || 0) + qty);
		}
		return {
			keys,
			quantities
		};
	} catch {
		return {
			keys: [],
			quantities: {}
		};
	}
}
function readWishlist() {
	try {
		const raw = JSON.parse(window.localStorage.getItem(WISH_KEY) ?? "[]");
		return Array.isArray(raw) ? raw.filter((id) => products.some((p) => p.id === id)) : [];
	} catch {
		return [];
	}
}
function StoreProvider({ children }) {
	const [cartKeys, setCartKeys] = (0, import_react.useState)([]);
	const [quantities, setQuantities] = (0, import_react.useState)({});
	const [wishlist, setWishlist] = (0, import_react.useState)([]);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const saved = readCart();
		setCartKeys(saved.keys);
		setQuantities(saved.quantities);
		setWishlist(readWishlist());
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (hydrated) {
			const serialized = cartKeys.map((key) => {
				const { id, edition } = parseCartKey(key);
				return {
					id,
					edition,
					quantity: quantities[key] ?? 1
				};
			});
			window.localStorage.setItem(CART_KEY, JSON.stringify({ items: serialized }));
		}
	}, [
		cartKeys,
		quantities,
		hydrated
	]);
	(0, import_react.useEffect)(() => {
		if (hydrated) window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
	}, [wishlist, hydrated]);
	const cartItems = cartKeys.map((key) => {
		const { id, edition } = parseCartKey(key);
		const product = products.find((p) => p.id === id);
		if (!product) return null;
		const unitPrice = getPrice(product, edition);
		const quantity = quantities[key] ?? 1;
		return {
			...product,
			cartKey: key,
			edition,
			quantity,
			unitPrice,
			price: unitPrice
		};
	}).filter((item) => item !== null);
	const value = {
		cart: cartKeys,
		wishlist,
		cartItems,
		cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
		subtotal: cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
		inCart: (id, edition) => {
			if (edition) return cartKeys.includes(makeCartKey(id, edition));
			return cartKeys.some((k) => parseCartKey(k).id === id);
		},
		addToCart: (id, edition) => {
			const product = products.find((p) => p.id === id);
			if (!product) return;
			const key = makeCartKey(id, edition ?? (product.productType === "physical" ? "physical" : "digital"));
			setCartKeys((current) => current.includes(key) ? current : [...current, key]);
			setQuantities((current) => ({
				...current,
				[key]: Math.min(MAX_QUANTITY, (current[key] ?? 0) + 1)
			}));
		},
		increaseQuantity: (cartKey) => {
			setQuantities((current) => cartKeys.includes(cartKey) ? {
				...current,
				[cartKey]: Math.min(MAX_QUANTITY, (current[cartKey] ?? 1) + 1)
			} : current);
		},
		decreaseQuantity: (cartKey) => {
			setQuantities((current) => cartKeys.includes(cartKey) && (current[cartKey] ?? 1) > 1 ? {
				...current,
				[cartKey]: current[cartKey] - 1
			} : current);
		},
		removeFromCart: (cartKey) => {
			setCartKeys((current) => current.filter((k) => k !== cartKey));
			setQuantities((current) => {
				const next = { ...current };
				delete next[cartKey];
				return next;
			});
		},
		clearCart: () => {
			window.localStorage.setItem(CART_KEY, JSON.stringify({ items: [] }));
			setCartKeys([]);
			setQuantities({});
		},
		isSaved: (id) => wishlist.includes(id),
		toggleSaved: (id) => {
			setWishlist((w) => w.includes(id) ? w.filter((x) => x !== id) : [...w, id]);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StoreContext.Provider, {
		value,
		children
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 224,
		columnNumber: 10
	}, this);
}
function useStore() {
	const ctx = (0, import_react.useContext)(StoreContext);
	if (!ctx) throw new Error("useStore must be used inside StoreProvider");
	return ctx;
}
var _jsxFileName$4 = "/app/applet/src/components/Header.tsx";
function Header() {
	const { t, lang, setLang } = useLanguage();
	const { cartCount } = useStore();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: "sticky top-0 z-30 border-b border-[#49365D] bg-[#0B0A10]/90 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "wrap flex min-h-[64px] items-center justify-between gap-3 md:min-h-[74px] md:gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					"aria-label": "AUVYRA home",
					className: "transition-opacity hover:opacity-90",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, {}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 16,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 15,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
					className: "hidden items-center gap-8 text-[13px] tracking-wide text-[#B5ADC5] md:flex",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavLinks, {}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 20,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 19,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						role: "group",
						"aria-label": "Language selection",
						className: "flex overflow-hidden rounded-md border border-[#49365D] bg-[#21182F] text-xs",
						children: [["en", "EN"], ["ta", "தமிழ்"]].map(([code, label]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setLang(code),
							"aria-pressed": lang === code,
							className: `px-3 py-1.5 font-medium transition-all ${lang === code ? "bg-[#7851D8] text-[#F7F4FC] shadow-sm" : "text-[#B5ADC5] hover:bg-[#2c203f] hover:text-[#F7F4FC]"}`,
							children: label
						}, code, false, {
							fileName: _jsxFileName$4,
							lineNumber: 36,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 25,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/cart",
						"aria-label": `${t("nav.cart")} (${cartCount})`,
						className: "relative flex h-[38px] w-[42px] items-center justify-center rounded-md border border-[#49365D] bg-[#21182F]/70 text-[#B99AF5] transition-all hover:border-[#7851D8] hover:bg-[#21182F] hover:text-[#F7F4FC] hover:shadow-[0_0_12px_rgba(120,81,216,0.3)]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, {
							size: 18,
							strokeWidth: 1.7
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 58,
							columnNumber: 13
						}, this), cartCount > 0 && /* @__PURE__ */ (void 0)("span", {
							className: "absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#7851D8] px-1 text-[10px] font-bold text-[#F7F4FC] shadow-sm",
							children: cartCount
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 60,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 53,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 23,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 14,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
			className: "wrap flex justify-center gap-8 border-t border-[#49365D]/60 py-2.5 text-[13px] text-[#B5ADC5] md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavLinks, {}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 70,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 69,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 13,
		columnNumber: 5
	}, this);
}
function NavLinks() {
	const { t } = useLanguage();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/",
			hash: "store",
			className: "transition-colors hover:text-[#B99AF5]",
			children: t("nav.store")
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 80,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/",
			hash: "about",
			className: "transition-colors hover:text-[#B99AF5]",
			children: t("nav.about")
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 87,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/",
			hash: "contact",
			className: "transition-colors hover:text-[#B99AF5]",
			children: t("nav.contact")
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 94,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 79,
		columnNumber: 5
	}, this);
}
var WHATSAPP_NUMBER = "919080079754";
var WHATSAPP_DISPLAY = "+91 90800 79754";
function whatsappLink(message) {
	const base = `https://wa.me/${WHATSAPP_NUMBER}`;
	return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
var _jsxFileName$3 = "/app/applet/src/components/Footer.tsx";
function Footer() {
	const { t } = useLanguage();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
		className: "border-t border-[#49365D] bg-[#0B0A10] py-9 text-[12px] text-[#B5ADC5]",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "wrap flex flex-wrap items-center justify-between gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "flex items-center gap-2.5 font-medium tracking-[0.2em] text-[#F7F4FC]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogoMark, { className: "h-6 w-6" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 11,
						columnNumber: 11
					}, this), "AUVYRA"]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 10,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: whatsappLink(),
						target: "_blank",
						rel: "noopener",
						className: "transition-colors hover:text-[#B99AF5]",
						children: ["WhatsApp Support · ", WHATSAPP_DISPLAY]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 16,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 15,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-[#837996]",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" AUVYRA. ",
						t("footer.rights")
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 26,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 9,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 8,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/NotFound.tsx";
function NotFound() {
	const { t } = useLanguage();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "flex min-h-[75vh] items-center justify-center bg-[#0B0A10] px-5 py-16",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-lg rounded-xl border border-[#49365D] bg-[#21182F] p-8 text-center shadow-2xl md:p-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogoMark, { className: "mx-auto mb-6 h-16 w-16 opacity-75" }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 10,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mb-3 font-serif text-[34px] font-normal leading-tight text-[#F7F4FC] md:text-[38px]",
					children: t("notFound.title")
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 11,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mb-8 text-[14px] leading-relaxed text-[#B5ADC5]",
					children: t("notFound.body")
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 14,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						hash: "store",
						className: "btn btn-fill",
						children: t("cart.browse")
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 18,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "btn",
						children: t("common.home")
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 21,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 17,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 9,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 8,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/routes/__root.tsx";
var siteName = "AUVYRA — Knowledge Beyond Limits";
var siteDescription = "AUVYRA is a premium digital publishing store by Barath and Kavi — eBooks, templates and practical guides in Tamil and English.";
var Route$7 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: siteName },
			{
				name: "description",
				content: siteDescription
			},
			{
				property: "og:title",
				content: siteName
			},
			{
				property: "og:description",
				content: siteDescription
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "theme-color",
				content: "#0B0A10"
			}
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Tamil:wght@400;500;600&family=Noto+Serif+Tamil:wght@400;500;600&display=swap"
			}
		]
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFound
});
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 74,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 73,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", {
			className: "min-h-screen bg-[#0B0A10] text-[#F7F4FC] antialiased",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LanguageProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StoreProvider, { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Header, {}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 79,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { children }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 80,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Footer, {}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 81,
					columnNumber: 13
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 78,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 77,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 84,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 76,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 72,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$5 = () => import("./routes-CZWES7ON.mjs");
var Route$6 = createFileRoute("/")({
	loader: async () => {
		try {
			const liveProducts = await getPublicStoreProductsServerFn();
			if (Array.isArray(liveProducts) && liveProducts.length > 0) return { products: liveProducts };
		} catch {}
		return { products };
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var _jsxFileName = "/app/applet/src/routes/admin.tsx";
var Route$5 = createFileRoute("/admin")({
	component: AdminPage,
	head: () => ({ meta: [{ title: "Admin Console — AUVYRA Bookstore" }] })
});
var SESSION_TOKEN_KEY = "auvyra:admin_token";
function AdminPage() {
	const [token, setToken] = (0, import_react.useState)(null);
	const [admin, setAdmin] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [emailInput, setEmailInput] = (0, import_react.useState)("");
	const [passwordInput, setPasswordInput] = (0, import_react.useState)("");
	const [loginError, setLoginError] = (0, import_react.useState)(null);
	const [loggingIn, setLoggingIn] = (0, import_react.useState)(false);
	const [version, setVersion] = (0, import_react.useState)(0);
	const [productsList, setProductsList] = (0, import_react.useState)([]);
	const [ordersList, setOrdersList] = (0, import_react.useState)([]);
	const [auditLogs, setAuditLogs] = (0, import_react.useState)([]);
	const [activeSessions, setActiveSessions] = (0, import_react.useState)([]);
	const [adminUsers, setAdminUsers] = (0, import_react.useState)([]);
	const [activeTab, setActiveTab] = (0, import_react.useState)("books");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("all");
	const [typeFilter, setTypeFilter] = (0, import_react.useState)("all");
	const [orderStatusFilter, setOrderStatusFilter] = (0, import_react.useState)("all");
	const [lastSynced, setLastSynced] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	const [isSyncing, setIsSyncing] = (0, import_react.useState)(false);
	const [syncToast, setSyncToast] = (0, import_react.useState)(null);
	const [editingProduct, setEditingProduct] = (0, import_react.useState)(null);
	const [isNewBookModalOpen, setIsNewBookModalOpen] = (0, import_react.useState)(false);
	const [uploadModalProduct, setUploadModalProduct] = (0, import_react.useState)(null);
	const [selectedOrderDetails, setSelectedOrderDetails] = (0, import_react.useState)(null);
	const [uploadingPdf, setUploadingPdf] = (0, import_react.useState)(false);
	const [uploadingCover, setUploadingCover] = (0, import_react.useState)(false);
	const [uploadSuccessMsg, setUploadSuccessMsg] = (0, import_react.useState)(null);
	const versionRef = (0, import_react.useRef)(version);
	versionRef.current = version;
	(0, import_react.useEffect)(() => {
		const savedToken = window.localStorage.getItem(SESSION_TOKEN_KEY);
		if (!savedToken) {
			setLoading(false);
			return;
		}
		adminVerifySessionServerFn({ data: { token: savedToken } }).then((res) => {
			if (res.valid && res.admin) {
				setToken(savedToken);
				setAdmin(res.admin);
				loadDashboardData(savedToken);
			} else {
				window.localStorage.removeItem(SESSION_TOKEN_KEY);
				setLoading(false);
			}
		}).catch(() => {
			setLoading(false);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (!token) return;
		const pollInterval = setInterval(async () => {
			try {
				const poll = await adminPollSyncServerFn({ data: {
					token,
					clientVersion: versionRef.current
				} });
				if (!poll.authorized) {
					handleLogout();
					return;
				}
				if (poll.hasUpdate) {
					setIsSyncing(true);
					const data = await adminGetDashboardDataServerFn({ data: { token } });
					setVersion(data.version);
					setProductsList(data.products);
					setOrdersList(data.orders);
					setAuditLogs(data.auditLog);
					setActiveSessions(data.activeSessionsList);
					setAdminUsers(data.adminList);
					setLastSynced(/* @__PURE__ */ new Date());
					setIsSyncing(false);
					setSyncToast("Live Synced: Updated with changes from other administrator.");
					setTimeout(() => setSyncToast(null), 3500);
				}
			} catch (err) {}
		}, 3500);
		return () => clearInterval(pollInterval);
	}, [token]);
	const loadDashboardData = async (activeToken) => {
		setIsSyncing(true);
		try {
			const data = await adminGetDashboardDataServerFn({ data: { token: activeToken } });
			setVersion(data.version);
			setProductsList(data.products);
			setOrdersList(data.orders);
			setAuditLogs(data.auditLog);
			setActiveSessions(data.activeSessionsList);
			setAdminUsers(data.adminList);
			setLastSynced(/* @__PURE__ */ new Date());
		} catch (err) {
			console.error("Failed to load dashboard data:", err);
		} finally {
			setIsSyncing(false);
			setLoading(false);
		}
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		setLoginError(null);
		setLoggingIn(true);
		try {
			const res = await adminLoginServerFn({ data: {
				email: emailInput.trim(),
				password: passwordInput
			} });
			if (res.success && res.token && res.admin) {
				window.localStorage.setItem(SESSION_TOKEN_KEY, res.token);
				setToken(res.token);
				setAdmin(res.admin);
				await loadDashboardData(res.token);
			} else setLoginError(res.error || "Invalid credentials. Please verify your email and password.");
		} catch (err) {
			setLoginError("Authentication service unreachable. Please try again.");
		} finally {
			setLoggingIn(false);
		}
	};
	const handleLogout = async () => {
		if (token) try {
			await adminLogoutServerFn({ data: { token } });
		} catch {}
		window.localStorage.removeItem(SESSION_TOKEN_KEY);
		setToken(null);
		setAdmin(null);
	};
	const handleStockChange = async (productId, delta) => {
		if (!token) return;
		const prod = productsList.find((p) => p.id === productId);
		if (!prod) return;
		const newStock = Math.max(0, prod.physicalStock + delta);
		setProductsList((prev) => prev.map((p) => p.id === productId ? {
			...p,
			physicalStock: newStock
		} : p));
		try {
			await adminUpdateStockServerFn({ data: {
				token,
				productId,
				newStock
			} });
		} catch (err) {
			if (token) loadDashboardData(token);
		}
	};
	const handleSaveBook = async (bookData) => {
		if (!token) return;
		try {
			const res = await adminSaveProductServerFn({ data: {
				token,
				product: {
					id: bookData.id,
					slug: bookData.slug || `book-${Date.now()}`,
					category: bookData.category || "career",
					format: bookData.format || "ebook",
					language: bookData.language || "both",
					coverWord: bookData.coverWord || "BOOK",
					name: bookData.name || "Untitled Book",
					nameTa: bookData.nameTa || bookData.name || "தலைப்பற்ற புத்தகம்",
					shortDescription: bookData.shortDescription || "",
					shortDescriptionTa: bookData.shortDescriptionTa || "",
					description: bookData.description || "",
					descriptionTa: bookData.descriptionTa || "",
					includes: bookData.includes || ["Book edition included"],
					includesTa: bookData.includesTa || ["புத்தகப் பதிப்பு சேர்க்கப்பட்டுள்ளது"],
					pages: Number(bookData.pages) || 50,
					price: Number(bookData.price) || Number(bookData.digitalPrice) || 199,
					digitalPrice: Number(bookData.digitalPrice) || Number(bookData.price) || 199,
					physicalPrice: bookData.physicalPrice ? Number(bookData.physicalPrice) : void 0,
					productType: bookData.productType || "both",
					physicalStock: Number(bookData.physicalStock) || 0,
					featured: Boolean(bookData.featured),
					coverImage: bookData.coverImage,
					dimensions: bookData.dimensions,
					isbn: bookData.isbn,
					expectedVersion: bookData.version
				}
			} });
			if (res.success) {
				setIsNewBookModalOpen(false);
				setEditingProduct(null);
				loadDashboardData(token);
			} else if (res.conflict) {
				alert(res.error);
				loadDashboardData(token);
			} else alert(res.error || "Failed to save book.");
		} catch (err) {
			alert("Error saving book: " + (err.message || "Server error"));
		}
	};
	const handleDeleteBook = async (productId, bookName) => {
		if (!token) return;
		if (!window.confirm(`Are you sure you want to delete "${bookName}"? This action cannot be undone.`)) return;
		try {
			const res = await adminDeleteProductServerFn({ data: {
				token,
				productId
			} });
			if (res.success) loadDashboardData(token);
			else alert(res.error || "Failed to delete book.");
		} catch (err) {
			alert("Error deleting book: " + err.message);
		}
	};
	const handleUpdateOrderStatus = async (orderId, paymentStatus, shippingStatus) => {
		if (!token) return;
		try {
			if ((await adminUpdateOrderStatusServerFn({ data: {
				token,
				orderId,
				paymentStatus,
				shippingStatus
			} })).success) setOrdersList((prev) => prev.map((o) => o.id === orderId ? {
				...o,
				paymentStatus,
				shippingStatus: shippingStatus || o.shippingStatus
			} : o));
		} catch (err) {
			alert("Failed to update order: " + err.message);
		}
	};
	const handlePdfUpload = async (e, product) => {
		if (!token || !e.target.files?.[0]) return;
		const file = e.target.files[0];
		if (file.type !== "application/pdf") {
			alert("Only valid PDF files are accepted.");
			return;
		}
		setUploadingPdf(true);
		setUploadSuccessMsg(null);
		const reader = new FileReader();
		reader.onload = async () => {
			const base64Data = reader.result.split(",")[1];
			try {
				const res = await adminUploadFileServerFn({ data: {
					token,
					productId: product.id,
					fileType: "pdf",
					fileName: file.name,
					base64Data
				} });
				if (res.success) {
					setUploadSuccessMsg(`PDF "${file.name}" uploaded securely to server!`);
					loadDashboardData(token);
				} else alert("Upload failed: " + res.error);
			} catch (err) {
				alert("Upload error: " + err.message);
			} finally {
				setUploadingPdf(false);
			}
		};
		reader.readAsDataURL(file);
	};
	const handleCoverUpload = async (e, product) => {
		if (!token || !e.target.files?.[0]) return;
		const file = e.target.files[0];
		setUploadingCover(true);
		setUploadSuccessMsg(null);
		const reader = new FileReader();
		reader.onload = async () => {
			const base64Data = reader.result.split(",")[1];
			try {
				const res = await adminUploadFileServerFn({ data: {
					token,
					productId: product.id,
					fileType: "cover",
					fileName: file.name,
					base64Data
				} });
				if (res.success) {
					setUploadSuccessMsg(`Book cover updated successfully!`);
					loadDashboardData(token);
				} else alert("Cover upload failed: " + res.error);
			} catch (err) {
				alert("Cover upload error: " + err.message);
			} finally {
				setUploadingCover(false);
			}
		};
		reader.readAsDataURL(file);
	};
	const handleAdminDownloadPdf = async (fileName) => {
		if (!token) return;
		try {
			const res = await adminDownloadPdfServerFn({ data: {
				token,
				fileName
			} });
			if (res.success && res.base64) {
				const byteCharacters = atob(res.base64);
				const byteNumbers = new Array(byteCharacters.length);
				for (let i = 0; i < byteCharacters.length; i++) byteNumbers[i] = byteCharacters.charCodeAt(i);
				const byteArray = new Uint8Array(byteNumbers);
				const blob = new Blob([byteArray], { type: "application/pdf" });
				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = fileName;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(url);
			} else alert(res.error || "Failed to download PDF");
		} catch (err) {
			alert("Download error: " + err.message);
		}
	};
	const filteredProducts = productsList.filter((p) => {
		const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.nameTa.toLowerCase().includes(searchQuery.toLowerCase()) || p.coverWord.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
		const matchesType = typeFilter === "all" || p.productType === typeFilter;
		return matchesSearch && matchesCategory && matchesType;
	});
	const filteredOrders = ordersList.filter((o) => {
		if (orderStatusFilter === "all") return true;
		if (orderStatusFilter === "verified") return o.paymentStatus === "verified";
		if (orderStatusFilter === "pending") return o.paymentStatus === "pending";
		if (orderStatusFilter === "physical") return o.hasPhysicalItems;
		return true;
	});
	const totalBooksCount = productsList.length;
	const totalPhysicalStock = productsList.reduce((acc, p) => acc + (p.physicalStock || 0), 0);
	const lowStockCount = productsList.filter((p) => (p.productType === "physical" || p.productType === "both") && p.physicalStock < 10).length;
	const pendingOrdersCount = ordersList.filter((o) => o.paymentStatus === "pending").length;
	const verifiedOrdersCount = ordersList.filter((o) => o.paymentStatus === "verified").length;
	const verifiedRevenue = ordersList.filter((o) => o.paymentStatus === "verified").reduce((acc, o) => acc + o.total, 0);
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "flex min-h-[85vh] items-center justify-center bg-[#0B0A10]",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "h-8 w-8 animate-spin text-[#B99AF5]" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 473,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-sm font-medium text-[#B5ADC5]",
				children: "Verifying Administrator Access…"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 474,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 472,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 471,
		columnNumber: 7
	}, this);
	if (!admin || !token) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "flex min-h-[85vh] items-center justify-center bg-[#0B0A10] px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-md rounded-xl border border-[#49365D] bg-[#21182F] p-8 shadow-2xl sm:p-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-[#49365D] bg-[#140E20] shadow-inner",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "h-7 w-7 text-[#B99AF5]" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 487,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 486,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "eyebrow mb-1",
							children: "AUTHORIZED PERSONNEL ONLY"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 489,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "font-serif text-3xl font-medium text-[#F7F4FC]",
							children: "AUVYRA Admin Console"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 490,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1.5 text-xs leading-relaxed text-[#B5ADC5]",
							children: ["Shared portal for authorized administrators: ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Barath & Kavi" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 494,
								columnNumber: 60
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 493,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 485,
					columnNumber: 11
				}, this),
				loginError && /* @__PURE__ */ (void 0)("div", {
					className: "mb-5 flex items-start gap-2.5 rounded-lg border border-[#ff7b72]/40 bg-[#ff7b72]/15 p-3 text-xs text-[#ff7b72]",
					children: [/* @__PURE__ */ (void 0)(CircleAlert, {
						size: 15,
						className: "mt-0.5 flex-none"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 500,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("span", { children: loginError }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 501,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 499,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: handleLogin,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "mb-1 block text-xs font-medium text-[#F7F4FC]",
							children: "Administrator Email"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 507,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "email",
							required: true,
							value: emailInput,
							onChange: (e) => setEmailInput(e.target.value),
							placeholder: "barath@auvyra.com or kaviravi1905@gmail.com",
							className: "field w-full"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 510,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 506,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "mb-1 block text-xs font-medium text-[#F7F4FC]",
							children: "Password"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 521,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "password",
							required: true,
							value: passwordInput,
							onChange: (e) => setPasswordInput(e.target.value),
							placeholder: "••••••••••••",
							className: "field w-full"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 524,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 520,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "submit",
							disabled: loggingIn,
							className: "btn btn-fill w-full !py-3 text-sm font-medium shadow-md",
							children: loggingIn ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "h-4 w-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 541,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Authenticating…" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 542,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 540,
								columnNumber: 17
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(KeyRound, { size: 16 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 546,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Sign In to Admin Console" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 547,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 545,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 534,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 505,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 border-t border-[#49365D]/80 pt-5 text-center text-xs text-[#837996]",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "leading-relaxed",
						children: "Restricted to authorized AUVYRA personnel. Concurrent sessions enabled for Barath & Kavi across multiple devices."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 554,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 553,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 484,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 483,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-[#0B0A10] text-[#F7F4FC]",
		children: [
			syncToast && /* @__PURE__ */ (void 0)("div", {
				className: "fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-lg border border-[#7851D8] bg-[#21182F] px-4 py-2.5 text-xs text-[#F7F4FC] shadow-2xl animate-bounce",
				children: [/* @__PURE__ */ (void 0)(RefreshCw, {
					size: 14,
					className: "animate-spin text-[#B99AF5]"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 569,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("span", { children: syncToast }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 570,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 568,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "border-b border-[#49365D] bg-[#140E20]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "wrap flex min-h-[64px] flex-wrap items-center justify-between gap-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogoMark, { className: "h-8 w-8" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 578,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-serif text-xl font-medium tracking-wide text-[#F7F4FC]",
								children: "AUVYRA Admin"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 581,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "rounded bg-[#7851D8]/20 border border-[#7851D8]/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#B99AF5]",
								children: "Shared Console"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 584,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 580,
							columnNumber: 15
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 579,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 577,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "hidden sm:flex items-center gap-2 rounded-full border border-[#49365D] bg-[#21182F] px-3 py-1 text-xs text-[#B5ADC5]",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `h-2 w-2 rounded-full ${isSyncing ? "bg-amber-400 animate-ping" : "bg-emerald-400 animate-pulse"}` }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 595,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: isSyncing ? "Syncing…" : `Live Synced (v${version}) · ${lastSynced.toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit"
									})}` }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 596,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => loadDashboardData(token),
										disabled: isSyncing,
										title: "Force refresh data",
										className: "text-[#B99AF5] hover:text-[#F7F4FC]",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, {
											size: 12,
											className: isSyncing ? "animate-spin" : ""
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 606,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 599,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 594,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 rounded-lg border border-[#49365D] bg-[#21182F] px-3 py-1 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserCheck, {
									size: 14,
									className: "text-[#B99AF5]"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 612,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-medium text-[#F7F4FC]",
									children: ["Admin: ", admin.name]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 613,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 611,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/",
								target: "_blank",
								className: "hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-[#49365D] px-2.5 py-1 text-xs text-[#B5ADC5] hover:border-[#7851D8] hover:text-[#F7F4FC]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "View Store" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 622,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { size: 12 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 623,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 617,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: handleLogout,
								className: "inline-flex items-center gap-1.5 rounded-lg border border-[#49365D] px-3 py-1 text-xs text-[#B5ADC5] transition hover:border-[#ff7b72] hover:bg-[#ff7b72]/15 hover:text-[#ff7b72]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { size: 13 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 632,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Sign Out" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 633,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 627,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 592,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 576,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "wrap flex gap-1 overflow-x-auto border-t border-[#49365D]/60 pt-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setActiveTab("books"),
							className: `flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition ${activeTab === "books" ? "border-[#7851D8] text-[#F7F4FC]" : "border-transparent text-[#B5ADC5] hover:text-[#F7F4FC]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, { size: 14 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 649,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
								"Books & Catalog (",
								productsList.length,
								")"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 650,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 640,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setActiveTab("orders"),
							className: `flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition ${activeTab === "orders" ? "border-[#7851D8] text-[#F7F4FC]" : "border-transparent text-[#B5ADC5] hover:text-[#F7F4FC]"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { size: 14 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 662,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
									"Orders (",
									ordersList.length,
									")"
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 663,
									columnNumber: 13
								}, this),
								pendingOrdersCount > 0 && /* @__PURE__ */ (void 0)("span", {
									className: "rounded-full bg-amber-500/20 px-1.5 py-0.2 font-mono text-[10px] text-amber-300",
									children: [pendingOrdersCount, " pending"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 665,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 653,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setActiveTab("inventory"),
							className: `flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition ${activeTab === "inventory" ? "border-[#7851D8] text-[#F7F4FC]" : "border-transparent text-[#B5ADC5] hover:text-[#F7F4FC]"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { size: 14 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 680,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
									"Physical Inventory (",
									totalPhysicalStock,
									" units)"
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 681,
									columnNumber: 13
								}, this),
								lowStockCount > 0 && /* @__PURE__ */ (void 0)("span", {
									className: "rounded-full bg-rose-500/20 px-1.5 py-0.2 font-mono text-[10px] text-rose-300",
									children: [lowStockCount, " low"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 683,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 671,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setActiveTab("audit"),
							className: `flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition ${activeTab === "audit" ? "border-[#7851D8] text-[#F7F4FC]" : "border-transparent text-[#B5ADC5] hover:text-[#F7F4FC]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCcwClock, { size: 14 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 698,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
								"Audit Log (",
								auditLogs.length,
								")"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 699,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 689,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setActiveTab("admins"),
							className: `flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition ${activeTab === "admins" ? "border-[#7851D8] text-[#F7F4FC]" : "border-transparent text-[#B5ADC5] hover:text-[#F7F4FC]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { size: 14 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 711,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
								"Admins & Sessions (",
								activeSessions.length,
								" active)"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 712,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 702,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 639,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 575,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "wrap py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-xl border border-[#49365D] bg-[#21182F] p-4 shadow-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[11px] font-mono uppercase tracking-wider text-[#B5ADC5]",
										children: "Total Titles in Catalog"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 722,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-1 font-serif text-3xl font-medium text-[#F7F4FC]",
										children: totalBooksCount
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 725,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[11px] text-[#B99AF5]",
										children: "Digital & Physical Editions"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 728,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 721,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-xl border border-[#49365D] bg-[#21182F] p-4 shadow-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[11px] font-mono uppercase tracking-wider text-[#B5ADC5]",
										children: "Physical Books Stock"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 734,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-1 font-serif text-3xl font-medium text-[#F7F4FC]",
										children: totalPhysicalStock
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 737,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[11px] text-amber-300",
										children: lowStockCount > 0 ? `${lowStockCount} titles need restock` : "Stock healthy"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 740,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 733,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-xl border border-[#49365D] bg-[#21182F] p-4 shadow-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[11px] font-mono uppercase tracking-wider text-[#B5ADC5]",
										children: "Total Orders"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 746,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-1 font-serif text-3xl font-medium text-[#F7F4FC]",
										children: ordersList.length
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 749,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[11px] text-[#B5ADC5]",
										children: [pendingOrdersCount, " pending verification"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 752,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 745,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-xl border border-[#49365D] bg-[#21182F] p-4 shadow-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[11px] font-mono uppercase tracking-wider text-[#B5ADC5]",
										children: "Verified Revenue"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 758,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-1 font-serif text-3xl font-medium text-[#F7F4FC] tabular-nums",
										children: formatPrice(verifiedRevenue)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 761,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[11px] text-emerald-400",
										children: [verifiedOrdersCount, " orders confirmed"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 764,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 757,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 720,
						columnNumber: 9
					}, this),
					activeTab === "books" && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
						className: "mb-6 flex flex-wrap items-center justify-between gap-4",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex flex-1 flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "relative min-w-[240px] flex-1",
									children: [/* @__PURE__ */ (void 0)(Search, {
										size: 15,
										className: "absolute left-3 top-1/2 -translate-y-1/2 text-[#837996]"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 777,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "search",
										value: searchQuery,
										onChange: (e) => setSearchQuery(e.target.value),
										placeholder: "Search books by title, author, keyword…",
										className: "field w-full !pl-9 !py-2 text-xs"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 778,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 776,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("select", {
									value: categoryFilter,
									onChange: (e) => setCategoryFilter(e.target.value),
									className: "field !py-2 text-xs cursor-pointer",
									children: [
										/* @__PURE__ */ (void 0)("option", {
											value: "all",
											children: "All Categories"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 792,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "career",
											children: "Education & Career"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 793,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "money",
											children: "Money & Business"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 794,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "skills",
											children: "Technology & Skills"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 795,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "growth",
											children: "Lifestyle & Growth"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 796,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "children",
											children: "Children & Storybooks"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 797,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "arts",
											children: "Art, Drawing & Painting"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 798,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 787,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("select", {
									value: typeFilter,
									onChange: (e) => setTypeFilter(e.target.value),
									className: "field !py-2 text-xs cursor-pointer",
									children: [
										/* @__PURE__ */ (void 0)("option", {
											value: "all",
											children: "All Formats"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 806,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "digital",
											children: "Digital Only"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 807,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "physical",
											children: "Physical Only"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 808,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "both",
											children: "Both Digital & Physical"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 809,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 801,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 775,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => setIsNewBookModalOpen(true),
							className: "btn btn-fill gap-1.5 !py-2 text-xs font-medium",
							children: [/* @__PURE__ */ (void 0)(Plus, { size: 15 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 818,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", { children: "Add New Book" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 819,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 813,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 774,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "overflow-x-auto rounded-xl border border-[#49365D] bg-[#21182F] shadow-xl",
						children: /* @__PURE__ */ (void 0)("table", {
							className: "w-full text-left text-xs",
							children: [/* @__PURE__ */ (void 0)("thead", {
								className: "border-b border-[#49365D] bg-[#140E20] text-[11px] font-mono uppercase tracking-wider text-[#B5ADC5]",
								children: /* @__PURE__ */ (void 0)("tr", { children: [
									/* @__PURE__ */ (void 0)("th", {
										className: "p-3.5",
										children: "Book Details"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 828,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "p-3.5",
										children: "Category & Type"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 829,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "p-3.5",
										children: "Pricing"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 830,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "p-3.5",
										children: "Physical Stock"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 831,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "p-3.5",
										children: "Digital File (PDF)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 832,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "p-3.5 text-right",
										children: "Actions"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 833,
										columnNumber: 21
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 827,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 826,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("tbody", {
								className: "divide-y divide-[#49365D]/60",
								children: filteredProducts.map((book) => /* @__PURE__ */ (void 0)("tr", {
									className: "transition-colors hover:bg-[#251b36]",
									children: [
										/* @__PURE__ */ (void 0)("td", {
											className: "p-3.5",
											children: /* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-3",
												children: [book.coverImage ? /* @__PURE__ */ (void 0)("img", {
													src: book.coverImage,
													alt: book.name,
													className: "h-12 w-9 rounded object-cover border border-[#49365D]"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 843,
													columnNumber: 29
												}, this) : /* @__PURE__ */ (void 0)("div", {
													className: "flex h-12 w-9 items-center justify-center rounded border border-[#49365D] bg-[#140E20] text-[8px] font-mono text-[#B99AF5]",
													children: book.coverWord.slice(0, 4)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 849,
													columnNumber: 29
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "min-w-0 max-w-[260px]",
													children: [
														/* @__PURE__ */ (void 0)("span", {
															className: "block truncate font-serif text-base font-medium text-[#F7F4FC]",
															children: book.name
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 854,
															columnNumber: 29
														}, this),
														/* @__PURE__ */ (void 0)("span", {
															className: "block truncate text-[11px] text-[#B5ADC5]",
															children: book.nameTa
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 857,
															columnNumber: 29
														}, this),
														/* @__PURE__ */ (void 0)("span", {
															className: "text-[10px] text-[#837996]",
															children: [
																"ID #",
																book.id,
																" · ",
																book.pages,
																" pages · ",
																book.language.toUpperCase()
															]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 860,
															columnNumber: 29
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 853,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 841,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 840,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("td", {
											className: "p-3.5",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "block font-medium capitalize text-[#F7F4FC]",
												children: book.category
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 869,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "mt-1 flex items-center gap-1.5",
												children: book.productType === "both" ? /* @__PURE__ */ (void 0)("span", {
													className: "rounded bg-[#7851D8]/20 border border-[#7851D8]/40 px-1.5 py-0.5 text-[9px] font-mono uppercase text-[#B99AF5]",
													children: "Digital + Print"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 874,
													columnNumber: 29
												}, this) : book.productType === "physical" ? /* @__PURE__ */ (void 0)("span", {
													className: "rounded bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 text-[9px] font-mono uppercase text-amber-300",
													children: "Physical Print"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 878,
													columnNumber: 29
												}, this) : /* @__PURE__ */ (void 0)("span", {
													className: "rounded bg-[#7851D8]/15 border border-[#7851D8]/30 px-1.5 py-0.5 text-[9px] font-mono uppercase text-[#B99AF5]",
													children: "Digital eBook"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 882,
													columnNumber: 29
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 872,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 868,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("td", {
											className: "p-3.5",
											children: /* @__PURE__ */ (void 0)("div", {
												className: "space-y-0.5 tabular-nums",
												children: [/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (void 0)("span", {
														className: "text-[10px] text-[#837996]",
														children: "Digital:"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 893,
														columnNumber: 29
													}, this), /* @__PURE__ */ (void 0)("span", {
														className: "font-medium text-[#F7F4FC]",
														children: formatPrice(book.digitalPrice)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 894,
														columnNumber: 29
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 892,
													columnNumber: 27
												}, this), book.physicalPrice && /* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (void 0)("span", {
														className: "text-[10px] text-[#837996]",
														children: "Physical:"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 900,
														columnNumber: 31
													}, this), /* @__PURE__ */ (void 0)("span", {
														className: "font-medium text-amber-300",
														children: formatPrice(book.physicalPrice)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 901,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 899,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 891,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 890,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("td", {
											className: "p-3.5",
											children: book.productType === "digital" ? /* @__PURE__ */ (void 0)("span", {
												className: "text-[11px] text-[#837996]",
												children: "N/A (Digital)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 912,
												columnNumber: 27
											}, this) : /* @__PURE__ */ (void 0)("div", {
												className: "inline-flex items-center gap-1.5 rounded-lg border border-[#49365D] bg-[#140E20] px-2 py-1",
												children: [
													/* @__PURE__ */ (void 0)("button", {
														type: "button",
														onClick: () => handleStockChange(book.id, -1),
														disabled: book.physicalStock <= 0,
														className: "rounded p-0.5 text-[#B5ADC5] hover:text-[#F7F4FC] disabled:opacity-30",
														title: "Decrease stock",
														children: /* @__PURE__ */ (void 0)(Minus, { size: 12 }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 922,
															columnNumber: 31
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 915,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (void 0)("span", {
														className: `min-w-6 text-center font-mono text-xs font-semibold tabular-nums ${book.physicalStock < 10 ? "text-rose-400" : "text-[#F7F4FC]"}`,
														children: book.physicalStock
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 924,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (void 0)("button", {
														type: "button",
														onClick: () => handleStockChange(book.id, 1),
														className: "rounded p-0.5 text-[#B5ADC5] hover:text-[#F7F4FC]",
														title: "Increase stock",
														children: /* @__PURE__ */ (void 0)(Plus, { size: 12 }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 937,
															columnNumber: 31
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 931,
														columnNumber: 29
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 914,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 910,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("td", {
											className: "p-3.5",
											children: book.pdfFileName ? /* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (void 0)("button", {
													type: "button",
													onClick: () => handleAdminDownloadPdf(book.pdfFileName),
													className: "inline-flex items-center gap-1 rounded bg-[#7851D8]/20 border border-[#7851D8]/40 px-2 py-1 text-[11px] text-[#B99AF5] transition hover:bg-[#7851D8] hover:text-[#F7F4FC]",
													title: "Download protected PDF",
													children: [/* @__PURE__ */ (void 0)(Download, { size: 11 }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 953,
														columnNumber: 31
													}, this), /* @__PURE__ */ (void 0)("span", { children: "Download PDF" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 954,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 947,
													columnNumber: 29
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "text-[10px] text-[#837996]",
													children: book.pdfSize ? `${(book.pdfSize / 1024).toFixed(0)} KB` : "Uploaded"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 956,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 946,
												columnNumber: 27
											}, this) : /* @__PURE__ */ (void 0)("button", {
												type: "button",
												onClick: () => setUploadModalProduct(book),
												className: "inline-flex items-center gap-1 text-[11px] text-amber-300 hover:underline",
												children: [/* @__PURE__ */ (void 0)(Upload, { size: 11 }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 966,
													columnNumber: 29
												}, this), /* @__PURE__ */ (void 0)("span", { children: "Upload PDF" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 967,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 961,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 944,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("td", {
											className: "p-3.5 text-right",
											children: /* @__PURE__ */ (void 0)("div", {
												className: "flex items-center justify-end gap-1.5",
												children: [
													/* @__PURE__ */ (void 0)("button", {
														type: "button",
														onClick: () => setUploadModalProduct(book),
														className: "rounded p-1.5 text-[#B5ADC5] hover:bg-[#140E20] hover:text-[#B99AF5]",
														title: "Upload files",
														children: /* @__PURE__ */ (void 0)(Upload, { size: 14 }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 981,
															columnNumber: 29
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 975,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ (void 0)("button", {
														type: "button",
														onClick: () => setEditingProduct(book),
														className: "rounded p-1.5 text-[#B5ADC5] hover:bg-[#140E20] hover:text-[#B99AF5]",
														title: "Edit book",
														children: /* @__PURE__ */ (void 0)(PenLine, { size: 14 }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 989,
															columnNumber: 29
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 983,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ (void 0)("button", {
														type: "button",
														onClick: () => handleDeleteBook(book.id, book.name),
														className: "rounded p-1.5 text-[#B5ADC5] hover:bg-[#ff7b72]/15 hover:text-[#ff7b72]",
														title: "Delete book",
														children: /* @__PURE__ */ (void 0)(Trash, { size: 14 }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 997,
															columnNumber: 29
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 991,
														columnNumber: 27
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 974,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 973,
											columnNumber: 23
										}, this)
									]
								}, book.id, true, {
									fileName: _jsxFileName,
									lineNumber: 838,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 836,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 825,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 824,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 772,
						columnNumber: 11
					}, this),
					activeTab === "orders" && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
						className: "mb-6 flex flex-wrap items-center justify-between gap-4",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-xs text-[#B5ADC5]",
								children: "Filter Orders:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1014,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("select", {
								value: orderStatusFilter,
								onChange: (e) => setOrderStatusFilter(e.target.value),
								className: "field !py-1.5 text-xs",
								children: [
									/* @__PURE__ */ (void 0)("option", {
										value: "all",
										children: "All Orders"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1020,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("option", {
										value: "pending",
										children: "Pending Payment Verification"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1021,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("option", {
										value: "verified",
										children: "Verified & Paid"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1022,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("option", {
										value: "physical",
										children: "Physical Book Orders"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1023,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1015,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1013,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "text-xs text-[#837996]",
							children: [
								"Showing ",
								filteredOrders.length,
								" of ",
								ordersList.length,
								" orders"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1027,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1012,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "overflow-x-auto rounded-xl border border-[#49365D] bg-[#21182F] shadow-xl",
						children: /* @__PURE__ */ (void 0)("table", {
							className: "w-full text-left text-xs",
							children: [/* @__PURE__ */ (void 0)("thead", {
								className: "border-b border-[#49365D] bg-[#140E20] text-[11px] font-mono uppercase tracking-wider text-[#B5ADC5]",
								children: /* @__PURE__ */ (void 0)("tr", { children: [
									/* @__PURE__ */ (void 0)("th", {
										className: "p-3.5",
										children: "Order ID & Date"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1036,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "p-3.5",
										children: "Customer"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1037,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "p-3.5",
										children: "Items"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1038,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "p-3.5",
										children: "Total Amount"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1039,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "p-3.5",
										children: "Payment Status"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1040,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "p-3.5",
										children: "Physical Shipping"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1041,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "p-3.5 text-right",
										children: "Actions"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1042,
										columnNumber: 21
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1035,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1034,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("tbody", {
								className: "divide-y divide-[#49365D]/60",
								children: filteredOrders.map((order) => /* @__PURE__ */ (void 0)("tr", {
									className: "transition-colors hover:bg-[#251b36]",
									children: [
										/* @__PURE__ */ (void 0)("td", {
											className: "p-3.5",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "block font-mono font-bold text-[#F7F4FC]",
												children: order.id
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1049,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "text-[10px] text-[#837996]",
												children: [
													new Date(order.createdAt).toLocaleDateString(),
													" at",
													" ",
													new Date(order.createdAt).toLocaleTimeString([], {
														hour: "2-digit",
														minute: "2-digit"
													})
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1052,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1048,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("td", {
											className: "p-3.5",
											children: [
												/* @__PURE__ */ (void 0)("span", {
													className: "block font-medium text-[#F7F4FC]",
													children: order.customer.name
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1059,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("span", {
													className: "block text-[11px] text-[#B5ADC5]",
													children: order.customer.email
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1062,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("span", {
													className: "text-[10px] font-mono text-[#837996]",
													children: ["WA: +91 ", order.customer.whatsapp]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1065,
													columnNumber: 25
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1058,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("td", {
											className: "p-3.5",
											children: /* @__PURE__ */ (void 0)("div", {
												className: "max-w-[220px] space-y-1",
												children: order.items.map((i, idx) => /* @__PURE__ */ (void 0)("div", {
													className: "truncate text-[11px]",
													children: [
														/* @__PURE__ */ (void 0)("span", {
															className: "text-[#F7F4FC]",
															children: i.name
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1074,
															columnNumber: 31
														}, this),
														" ",
														/* @__PURE__ */ (void 0)("span", {
															className: "font-mono text-[9px] uppercase text-[#B99AF5]",
															children: [
																"[",
																i.edition,
																"]"
															]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 1075,
															columnNumber: 31
														}, this),
														" ",
														/* @__PURE__ */ (void 0)("span", {
															className: "text-[#837996]",
															children: ["×", i.quantity]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 1078,
															columnNumber: 31
														}, this)
													]
												}, idx, true, {
													fileName: _jsxFileName,
													lineNumber: 1073,
													columnNumber: 29
												}, this))
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1071,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1070,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("td", {
											className: "p-3.5 font-serif text-base font-medium text-[#F7F4FC] tabular-nums",
											children: formatPrice(order.total)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1084,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("td", {
											className: "p-3.5",
											children: /* @__PURE__ */ (void 0)("select", {
												value: order.paymentStatus,
												onChange: (e) => handleUpdateOrderStatus(order.id, e.target.value, order.shippingStatus),
												className: `rounded border px-2.5 py-1 text-xs font-medium cursor-pointer ${order.paymentStatus === "verified" ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300" : "border-amber-500/40 bg-amber-500/15 text-amber-300"}`,
												children: [/* @__PURE__ */ (void 0)("option", {
													value: "pending",
													className: "bg-[#21182F] text-amber-300",
													children: "Pending Verification"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1101,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)("option", {
													value: "verified",
													className: "bg-[#21182F] text-emerald-300",
													children: "Verified & Paid"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1104,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1090,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1089,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("td", {
											className: "p-3.5",
											children: order.hasPhysicalItems ? /* @__PURE__ */ (void 0)("select", {
												value: order.shippingStatus || "pending_verification",
												onChange: (e) => handleUpdateOrderStatus(order.id, order.paymentStatus, e.target.value),
												className: "rounded border border-[#49365D] bg-[#140E20] px-2 py-1 text-[11px] text-amber-300 cursor-pointer",
												children: [
													/* @__PURE__ */ (void 0)("option", {
														value: "pending_verification",
														children: "Pending Verification"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1120,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (void 0)("option", {
														value: "processing",
														children: "Processing / Packing"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1121,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (void 0)("option", {
														value: "dispatched",
														children: "Dispatched via Courier"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1122,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (void 0)("option", {
														value: "delivered",
														children: "Delivered"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1123,
														columnNumber: 29
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1113,
												columnNumber: 27
											}, this) : /* @__PURE__ */ (void 0)("span", {
												className: "text-[10px] text-[#837996]",
												children: "N/A (Digital Order)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1126,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1111,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("td", {
											className: "p-3.5 text-right",
											children: /* @__PURE__ */ (void 0)("button", {
												type: "button",
												onClick: () => setSelectedOrderDetails(order),
												className: "inline-flex items-center gap-1 rounded border border-[#49365D] bg-[#140E20] px-2.5 py-1 text-xs text-[#B99AF5] hover:border-[#7851D8]",
												children: [/* @__PURE__ */ (void 0)(Eye, { size: 12 }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1136,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)("span", { children: "View Details" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1137,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1131,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1130,
											columnNumber: 23
										}, this)
									]
								}, order.id, true, {
									fileName: _jsxFileName,
									lineNumber: 1047,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1045,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1033,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1032,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1011,
						columnNumber: 11
					}, this),
					activeTab === "inventory" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-6",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-xl",
							children: [
								/* @__PURE__ */ (void 0)("h2", {
									className: "font-serif text-2xl font-medium text-[#F7F4FC] mb-2",
									children: "Physical Printed Book Stock Management"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1152,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-[#B5ADC5] leading-relaxed max-w-2xl mb-6",
									children: "Manage physical book stock levels across all printed editions. Both Barath and Kavi can view and adjust stock levels in real time from any device."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1155,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
									children: productsList.filter((p) => p.productType === "physical" || p.productType === "both").map((book) => /* @__PURE__ */ (void 0)("div", {
										className: "flex flex-col justify-between rounded-lg border border-[#49365D] bg-[#140E20] p-4",
										children: [/* @__PURE__ */ (void 0)("div", { children: [
											/* @__PURE__ */ (void 0)("div", {
												className: "flex items-center justify-between gap-2",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-[10px] font-mono uppercase text-[#B99AF5]",
													children: book.category
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1169,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: `rounded px-1.5 py-0.5 text-[10px] font-semibold ${book.physicalStock < 10 ? "bg-rose-500/20 text-rose-300" : "bg-emerald-500/20 text-emerald-300"}`,
													children: [book.physicalStock, " in stock"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1172,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1168,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (void 0)("h3", {
												className: "mt-1 font-serif text-lg font-medium text-[#F7F4FC]",
												children: book.name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1182,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (void 0)("p", {
												className: "mt-0.5 text-xs text-[#B5ADC5]",
												children: ["Price: ", formatPrice(book.physicalPrice || book.price)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1185,
												columnNumber: 25
											}, this)
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1167,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "mt-4 flex items-center justify-between border-t border-[#49365D]/60 pt-3",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-[11px] text-[#837996]",
												children: "Quick Stock Adjust:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1191,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ (void 0)("button", {
														type: "button",
														onClick: () => handleStockChange(book.id, -5),
														className: "rounded bg-[#21182F] px-2 py-1 text-xs hover:bg-[#49365D]",
														title: "Subtract 5",
														children: "-5"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1193,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ (void 0)("button", {
														type: "button",
														onClick: () => handleStockChange(book.id, -1),
														className: "rounded bg-[#21182F] p-1 text-xs hover:bg-[#49365D]",
														title: "Subtract 1",
														children: /* @__PURE__ */ (void 0)(Minus, { size: 13 }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1207,
															columnNumber: 29
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1201,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ (void 0)("span", {
														className: "min-w-6 text-center font-mono font-bold text-sm",
														children: book.physicalStock
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1209,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ (void 0)("button", {
														type: "button",
														onClick: () => handleStockChange(book.id, 1),
														className: "rounded bg-[#21182F] p-1 text-xs hover:bg-[#49365D]",
														title: "Add 1",
														children: /* @__PURE__ */ (void 0)(Plus, { size: 13 }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1218,
															columnNumber: 29
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1212,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ (void 0)("button", {
														type: "button",
														onClick: () => handleStockChange(book.id, 10),
														className: "rounded bg-[#21182F] px-2 py-1 text-xs text-[#B99AF5] hover:bg-[#49365D]",
														title: "Add 10",
														children: "+10"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1220,
														columnNumber: 27
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1192,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1190,
											columnNumber: 23
										}, this)]
									}, book.id, true, {
										fileName: _jsxFileName,
										lineNumber: 1163,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1159,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1151,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1150,
						columnNumber: 11
					}, this),
					activeTab === "audit" && /* @__PURE__ */ (void 0)("div", {
						className: "rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-xl",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "mb-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
								className: "font-serif text-2xl font-medium text-[#F7F4FC]",
								children: "Live Shared Activity & Audit Log"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1242,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-[#B5ADC5]",
								children: "Real-time timeline of changes executed by administrators (Barath & Kavi)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1245,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1241,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "text-xs text-[#B99AF5]",
								children: [auditLogs.length, " events logged"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1249,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1240,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3 max-h-[600px] overflow-y-auto pr-1",
							children: auditLogs.map((log) => /* @__PURE__ */ (void 0)("div", {
								className: "flex items-start gap-3 rounded-lg border border-[#49365D]/60 bg-[#140E20] p-3 text-xs",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex h-7 w-7 flex-none items-center justify-center rounded bg-[#7851D8]/20 text-[#B99AF5]",
									children: /* @__PURE__ */ (void 0)(RotateCcwClock, { size: 14 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1261,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1260,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "font-semibold text-[#F7F4FC]",
											children: log.adminName
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1265,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-mono text-[10px] text-[#837996]",
											children: new Date(log.timestamp).toLocaleString()
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1268,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1264,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "mt-0.5 text-[#B5ADC5] leading-relaxed",
										children: log.details
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1272,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1263,
									columnNumber: 19
								}, this)]
							}, log.id, true, {
								fileName: _jsxFileName,
								lineNumber: 1256,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1254,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1239,
						columnNumber: 11
					}, this),
					activeTab === "admins" && /* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-1 gap-6 md:grid-cols-2",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-xl",
							children: [
								/* @__PURE__ */ (void 0)("h2", {
									className: "font-serif text-2xl font-medium text-[#F7F4FC] mb-2",
									children: "Authorized Administrators"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1287,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-[#B5ADC5] mb-5",
									children: "Two administrators have full co-management privileges over catalog, orders, and files."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1290,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-3",
									children: adminUsers.map((u) => /* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between rounded-lg border border-[#49365D] bg-[#140E20] p-3.5",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "flex h-10 w-10 items-center justify-center rounded-full bg-[#7851D8]/20 text-[#B99AF5] font-serif text-base font-bold",
												children: u.name[0]
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1301,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
												className: "block font-medium text-[#F7F4FC]",
												children: u.name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1305,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "text-xs text-[#B5ADC5]",
												children: u.email
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1306,
												columnNumber: 25
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1304,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1300,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "rounded bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] text-emerald-300",
											children: "Co-Admin"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1309,
											columnNumber: 21
										}, this)]
									}, u.id, true, {
										fileName: _jsxFileName,
										lineNumber: 1296,
										columnNumber: 19
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1294,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1286,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-xl",
							children: [
								/* @__PURE__ */ (void 0)("h2", {
									className: "font-serif text-2xl font-medium text-[#F7F4FC] mb-2",
									children: "Concurrent Active Sessions"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1319,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-[#B5ADC5] mb-5",
									children: "Both administrators can connect simultaneously from multiple devices without conflict."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1322,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-3",
									children: activeSessions.map((s, idx) => /* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between rounded-lg border border-[#49365D] bg-[#140E20] p-3.5",
										children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (void 0)("span", { className: "h-2 w-2 rounded-full bg-emerald-400 animate-pulse" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1334,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "font-medium text-[#F7F4FC] text-xs",
												children: [
													s.name,
													" (",
													s.email,
													")"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1335,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1333,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "mt-0.5 block text-[10px] text-[#837996]",
											children: ["Session active since ", new Date(s.createdAt).toLocaleTimeString()]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1339,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1332,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] font-mono text-[#B99AF5]",
											children: "Active Token"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1343,
											columnNumber: 21
										}, this)]
									}, idx, true, {
										fileName: _jsxFileName,
										lineNumber: 1328,
										columnNumber: 19
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1326,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1318,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1284,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 718,
				columnNumber: 7
			}, this),
			(isNewBookModalOpen || editingProduct) && /* @__PURE__ */ (void 0)(BookEditModal, {
				initialProduct: editingProduct,
				onClose: () => {
					setIsNewBookModalOpen(false);
					setEditingProduct(null);
				},
				onSave: handleSaveBook
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1356,
				columnNumber: 9
			}, this),
			uploadModalProduct && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "w-full max-w-lg rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-2xl",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mb-4 flex items-start justify-between border-b border-[#49365D] pb-3",
							children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-[10px] font-mono uppercase text-[#B99AF5]",
								children: "Secure File Storage"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1372,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("h3", {
								className: "font-serif text-2xl font-medium text-[#F7F4FC]",
								children: uploadModalProduct.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1375,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1371,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setUploadModalProduct(null),
								className: "text-[#B5ADC5] hover:text-[#F7F4FC]",
								children: /* @__PURE__ */ (void 0)(X, { size: 18 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1384,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1379,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1370,
							columnNumber: 13
						}, this),
						uploadSuccessMsg && /* @__PURE__ */ (void 0)("div", {
							className: "mb-4 flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/15 p-3 text-xs text-emerald-300",
							children: [/* @__PURE__ */ (void 0)(CircleCheck, { size: 15 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1390,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", { children: uploadSuccessMsg }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1391,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1389,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-5",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "rounded-lg border border-[#49365D] bg-[#140E20] p-4",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "mb-2 flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-2 text-xs font-semibold text-[#F7F4FC]",
											children: [/* @__PURE__ */ (void 0)(FileText, {
												size: 15,
												className: "text-[#B99AF5]"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1400,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", { children: "Digital Product PDF File" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1401,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1399,
											columnNumber: 19
										}, this), uploadModalProduct.pdfFileName && /* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] text-emerald-400",
											children: "File currently attached"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1404,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1398,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mb-3 text-[11px] text-[#B5ADC5] leading-relaxed",
										children: "Files are stored in private server storage and only unlocked for verified customer orders."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1410,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("label", {
										className: "flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#49365D] bg-[#21182F] p-5 text-center transition hover:border-[#7851D8]",
										children: [
											/* @__PURE__ */ (void 0)(Upload, {
												size: 20,
												className: "mb-2 text-[#B99AF5]"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1415,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: "text-xs font-medium text-[#F7F4FC]",
												children: uploadingPdf ? "Uploading PDF…" : "Choose or Drag PDF File"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1416,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: "mt-1 text-[10px] text-[#837996]",
												children: "Accepts .pdf format up to 50MB"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1419,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("input", {
												type: "file",
												accept: "application/pdf",
												disabled: uploadingPdf,
												onChange: (e) => handlePdfUpload(e, uploadModalProduct),
												className: "hidden"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1422,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1414,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1397,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "rounded-lg border border-[#49365D] bg-[#140E20] p-4",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "mb-2 flex items-center justify-between",
										children: /* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-2 text-xs font-semibold text-[#F7F4FC]",
											children: [/* @__PURE__ */ (void 0)(Image, {
												size: 15,
												className: "text-[#B99AF5]"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1436,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", { children: "Book Cover Image" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1437,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1435,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1434,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mb-3 text-[11px] text-[#B5ADC5] leading-relaxed",
										children: "Upload an image to override the default graphic cover placeholder."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1441,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("label", {
										className: "flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#49365D] bg-[#21182F] p-5 text-center transition hover:border-[#7851D8]",
										children: [
											/* @__PURE__ */ (void 0)(Image, {
												size: 20,
												className: "mb-2 text-[#B99AF5]"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1446,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: "text-xs font-medium text-[#F7F4FC]",
												children: uploadingCover ? "Updating Cover…" : "Upload Cover Image"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1447,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: "mt-1 text-[10px] text-[#837996]",
												children: "Accepts .jpg, .png, .webp"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1450,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("input", {
												type: "file",
												accept: "image/*",
												disabled: uploadingCover,
												onChange: (e) => handleCoverUpload(e, uploadModalProduct),
												className: "hidden"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1453,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1445,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1433,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1395,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "mt-6 flex justify-end",
							children: /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setUploadModalProduct(null),
								className: "btn text-xs",
								children: "Close"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1465,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1464,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1369,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1368,
				columnNumber: 9
			}, this),
			selectedOrderDetails && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "w-full max-w-lg rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-2xl",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mb-4 flex items-start justify-between border-b border-[#49365D] pb-3",
							children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-[10px] font-mono uppercase text-[#B99AF5]",
								children: ["Order #", selectedOrderDetails.id]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1483,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("h3", {
								className: "font-serif text-2xl font-medium text-[#F7F4FC]",
								children: "Customer Order Breakdown"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1486,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1482,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setSelectedOrderDetails(null),
								className: "text-[#B5ADC5] hover:text-[#F7F4FC]",
								children: /* @__PURE__ */ (void 0)(X, { size: 18 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1495,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1490,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1481,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-4 text-xs",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "rounded-lg border border-[#49365D] bg-[#140E20] p-3.5 space-y-1",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "font-semibold text-[#F7F4FC]",
											children: selectedOrderDetails.customer.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1502,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "text-[#B5ADC5]",
											children: ["Email: ", selectedOrderDetails.customer.email]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1503,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "text-[#B5ADC5]",
											children: ["WhatsApp: +91 ", selectedOrderDetails.customer.whatsapp]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1504,
											columnNumber: 17
										}, this),
										selectedOrderDetails.customer.address && /* @__PURE__ */ (void 0)("div", {
											className: "mt-2 border-t border-[#49365D]/60 pt-2 text-amber-300",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "block font-medium",
												children: "Shipping Address:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1507,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "text-[#F7F4FC]",
												children: [
													selectedOrderDetails.customer.address,
													", ",
													selectedOrderDetails.customer.city,
													" —",
													" ",
													selectedOrderDetails.customer.pincode
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1508,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1506,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1501,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "rounded-lg border border-[#49365D] bg-[#140E20] p-3.5",
									children: [
										/* @__PURE__ */ (void 0)("span", {
											className: "block font-semibold text-[#F7F4FC] mb-2",
											children: "Purchased Editions"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1518,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("ul", {
											className: "divide-y divide-[#49365D]/60",
											children: selectedOrderDetails.items.map((item, idx) => /* @__PURE__ */ (void 0)("li", {
												className: "flex justify-between py-2",
												children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
													className: "font-medium text-[#F7F4FC]",
													children: item.name
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1523,
													columnNumber: 25
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "ml-2 rounded bg-[#7851D8]/20 px-1.5 py-0.2 font-mono text-[9px] uppercase text-[#B99AF5]",
													children: item.edition
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1524,
													columnNumber: 25
												}, this)] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1522,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "tabular-nums font-medium text-[#F7F4FC]",
													children: [
														item.quantity,
														" × ",
														formatPrice(item.price)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1528,
													columnNumber: 23
												}, this)]
											}, idx, true, {
												fileName: _jsxFileName,
												lineNumber: 1521,
												columnNumber: 21
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1519,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "mt-2 flex justify-between border-t border-[#49365D] pt-2 font-serif text-base font-bold text-[#F7F4FC]",
											children: [/* @__PURE__ */ (void 0)("span", { children: "Total Amount" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1535,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("span", { children: formatPrice(selectedOrderDetails.total) }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1536,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1534,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1517,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "block text-[11px] text-[#B5ADC5] mb-1",
										children: "Payment Status"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1543,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("select", {
										value: selectedOrderDetails.paymentStatus,
										onChange: (e) => {
											const next = e.target.value;
											handleUpdateOrderStatus(selectedOrderDetails.id, next, selectedOrderDetails.shippingStatus);
											setSelectedOrderDetails((prev) => prev ? {
												...prev,
												paymentStatus: next
											} : null);
										},
										className: "field w-full text-xs",
										children: [/* @__PURE__ */ (void 0)("option", {
											value: "pending",
											children: "Pending"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1553,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("option", {
											value: "verified",
											children: "Verified & Paid"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1554,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1544,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1542,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "block text-[11px] text-[#B5ADC5] mb-1",
										children: "Shipping Status"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1559,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("select", {
										value: selectedOrderDetails.shippingStatus || "pending_verification",
										disabled: !selectedOrderDetails.hasPhysicalItems,
										onChange: (e) => {
											const next = e.target.value;
											handleUpdateOrderStatus(selectedOrderDetails.id, selectedOrderDetails.paymentStatus, next);
											setSelectedOrderDetails((prev) => prev ? {
												...prev,
												shippingStatus: next
											} : null);
										},
										className: "field w-full text-xs disabled:opacity-40",
										children: [
											/* @__PURE__ */ (void 0)("option", {
												value: "pending_verification",
												children: "Pending Verification"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1570,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("option", {
												value: "processing",
												children: "Processing / Packing"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1571,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("option", {
												value: "dispatched",
												children: "Dispatched"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1572,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("option", {
												value: "delivered",
												children: "Delivered"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1573,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1560,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1558,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1541,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1499,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "mt-6 flex justify-end",
							children: /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setSelectedOrderDetails(null),
								className: "btn text-xs",
								children: "Done"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1580,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1579,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1480,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1479,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 565,
		columnNumber: 5
	}, this);
}
function BookEditModal({ initialProduct, onClose, onSave }) {
	const isEditing = !!initialProduct;
	const [name, setName] = (0, import_react.useState)(initialProduct?.name || "");
	const [nameTa, setNameTa] = (0, import_react.useState)(initialProduct?.nameTa || "");
	const [slug] = (0, import_react.useState)(initialProduct?.slug || "");
	const [category, setCategory] = (0, import_react.useState)(initialProduct?.category || "career");
	const [format, setFormat] = (0, import_react.useState)(initialProduct?.format || "ebook");
	const [productType, setProductType] = (0, import_react.useState)(initialProduct?.productType || "both");
	const [digitalPrice, setDigitalPrice] = (0, import_react.useState)(initialProduct?.digitalPrice || 199);
	const [physicalPrice, setPhysicalPrice] = (0, import_react.useState)(initialProduct?.physicalPrice || 399);
	const [physicalStock, setPhysicalStock] = (0, import_react.useState)(initialProduct?.physicalStock || 25);
	const [pages, setPages] = (0, import_react.useState)(initialProduct?.pages || 80);
	const [language, setLanguage] = (0, import_react.useState)(initialProduct?.language || "both");
	const [dimensions, setDimensions] = (0, import_react.useState)(initialProduct?.dimensions || "Paperback Book");
	const [shortDescription, setShortDescription] = (0, import_react.useState)(initialProduct?.shortDescription || "");
	const [shortDescriptionTa, setShortDescriptionTa] = (0, import_react.useState)(initialProduct?.shortDescriptionTa || "");
	const [description, setDescription] = (0, import_react.useState)(initialProduct?.description || "");
	const [coverWord, setCoverWord] = (0, import_react.useState)(initialProduct?.coverWord || "BOOK");
	const handleSubmit = (e) => {
		e.preventDefault();
		onSave({
			id: initialProduct?.id,
			name,
			nameTa,
			slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
			category,
			format,
			productType,
			digitalPrice: Number(digitalPrice),
			physicalPrice: productType !== "digital" ? Number(physicalPrice) : void 0,
			price: Number(digitalPrice),
			physicalStock: productType !== "digital" ? Number(physicalStock) : 0,
			pages: Number(pages),
			language,
			dimensions,
			shortDescription,
			shortDescriptionTa,
			description,
			descriptionTa: description,
			coverWord: coverWord.toUpperCase(),
			version: initialProduct?.version
		});
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-2xl sm:p-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-6 flex items-start justify-between border-b border-[#49365D] pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "eyebrow mb-1",
					children: "CATALOG MANAGEMENT"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1655,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-serif text-2xl font-medium text-[#F7F4FC]",
					children: isEditing ? `Edit "${initialProduct.name}"` : "Add New Book to Bookstore"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1656,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1654,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: onClose,
					className: "text-[#B5ADC5] hover:text-[#F7F4FC]",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { size: 20 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1661,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1660,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1653,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				onSubmit: handleSubmit,
				className: "space-y-4 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "mb-1 block font-medium text-[#F7F4FC]",
							children: "Book Title (English) *"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1668,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							required: true,
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "e.g. Creative Watercolor & Painting Book",
							className: "field w-full"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1669,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1667,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "mb-1 block font-medium text-[#F7F4FC]",
							children: "Book Title (Tamil) *"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1680,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							required: true,
							value: nameTa,
							onChange: (e) => setNameTa(e.target.value),
							placeholder: "உதா. படைப்பு நீர்வண்ண ஓவியப் புத்தகம்",
							className: "field w-full"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1681,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1679,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1666,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-1 gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "mb-1 block font-medium text-[#F7F4FC]",
								children: "Category"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1694,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
								value: category,
								onChange: (e) => setCategory(e.target.value),
								className: "field w-full cursor-pointer",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "career",
										children: "Education & Career"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1700,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "money",
										children: "Money & Business"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1701,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "skills",
										children: "Technology & Skills"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1702,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "growth",
										children: "Lifestyle & Growth"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1703,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "children",
										children: "Children & Storybooks"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1704,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "arts",
										children: "Art, Drawing & Painting"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1705,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1695,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1693,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "mb-1 block font-medium text-[#F7F4FC]",
								children: "Format"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1710,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
								value: format,
								onChange: (e) => setFormat(e.target.value),
								className: "field w-full cursor-pointer",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "ebook",
										children: "eBook"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1716,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "guide",
										children: "Guide"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1717,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "artbook",
										children: "Art & Drawing Book"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1718,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "storybook",
										children: "Illustrated Storybook"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1719,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "workbook",
										children: "Activity Workbook"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1720,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "template",
										children: "Template"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1721,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1711,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1709,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "mb-1 block font-medium text-[#F7F4FC]",
								children: "Product Type"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1726,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
								value: productType,
								onChange: (e) => setProductType(e.target.value),
								className: "field w-full cursor-pointer font-semibold text-[#B99AF5]",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "both",
										children: "Both Digital & Physical"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1732,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "digital",
										children: "Digital Only"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1733,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "physical",
										children: "Physical Print Only"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1734,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1727,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1725,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1692,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-1 gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "mb-1 block font-medium text-[#F7F4FC]",
								children: "Digital Price (₹)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1741,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "number",
								min: "0",
								required: true,
								value: digitalPrice,
								onChange: (e) => setDigitalPrice(Number(e.target.value)),
								className: "field w-full"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1742,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1740,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "mb-1 block font-medium text-[#F7F4FC]",
								children: ["Physical Price (₹) ", productType === "digital" && "(Disabled)"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1753,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "number",
								min: "0",
								disabled: productType === "digital",
								value: physicalPrice,
								onChange: (e) => setPhysicalPrice(Number(e.target.value)),
								className: "field w-full disabled:opacity-40"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1756,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1752,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "mb-1 block font-medium text-[#F7F4FC]",
								children: ["Physical Stock Units ", productType === "digital" && "(Disabled)"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1767,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "number",
								min: "0",
								disabled: productType === "digital",
								value: physicalStock,
								onChange: (e) => setPhysicalStock(Number(e.target.value)),
								className: "field w-full disabled:opacity-40"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1770,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1766,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1739,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-1 gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "mb-1 block font-medium text-[#F7F4FC]",
								children: "Total Pages"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1783,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "number",
								min: "1",
								required: true,
								value: pages,
								onChange: (e) => setPages(Number(e.target.value)),
								className: "field w-full"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1784,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1782,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "mb-1 block font-medium text-[#F7F4FC]",
								children: "Language"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1795,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
								value: language,
								onChange: (e) => setLanguage(e.target.value),
								className: "field w-full",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "both",
										children: "Tamil + English"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1801,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "ta",
										children: "Tamil"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1802,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "en",
										children: "English"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1803,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1796,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1794,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "mb-1 block font-medium text-[#F7F4FC]",
								children: "Cover Word"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1808,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "text",
								value: coverWord,
								onChange: (e) => setCoverWord(e.target.value),
								placeholder: "e.g. PAINTING",
								className: "field w-full"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1809,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1807,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1781,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "mb-1 block font-medium text-[#F7F4FC]",
						children: "Physical Dimensions & Paper Quality"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1820,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "text",
						value: dimensions,
						onChange: (e) => setDimensions(e.target.value),
						placeholder: "e.g. A4 Lay-Flat Artbook (180gsm Cold-Pressed Watercolor Paper)",
						className: "field w-full"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1823,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1819,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "mb-1 block font-medium text-[#F7F4FC]",
						children: "Short Description (English)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1833,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
						rows: 2,
						required: true,
						value: shortDescription,
						onChange: (e) => setShortDescription(e.target.value),
						className: "field w-full resize-none"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1834,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1832,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "mb-1 block font-medium text-[#F7F4FC]",
						children: "Short Description (Tamil)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1844,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
						rows: 2,
						value: shortDescriptionTa,
						onChange: (e) => setShortDescriptionTa(e.target.value),
						className: "field w-full resize-none"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1845,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1843,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "mb-1 block font-medium text-[#F7F4FC]",
						children: "Detailed Book Description"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1854,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
						rows: 3,
						required: true,
						value: description,
						onChange: (e) => setDescription(e.target.value),
						className: "field w-full resize-none"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1855,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1853,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex justify-end gap-3 pt-3 border-t border-[#49365D]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: onClose,
							className: "btn text-xs",
							children: "Cancel"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1865,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "submit",
							className: "btn btn-fill text-xs font-medium",
							children: "Save Changes"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1868,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1864,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1665,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 1652,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 1651,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$4 = () => import("./cart-CnCOmptC.mjs");
var Route$4 = createFileRoute("/cart")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: "Your cart — AUVYRA Bookstore" }] })
});
var $$splitComponentImporter$3 = () => import("./checkout-CTJBwHBj.mjs");
var Route$3 = createFileRoute("/checkout/")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "Checkout — AUVYRA Bookstore" }] })
});
var $$splitComponentImporter$2 = () => import("./cancel-CdUBs5hX.mjs");
var Route$2 = createFileRoute("/checkout/cancel")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: "Checkout cancelled — AUVYRA" }] })
});
var $$splitComponentImporter$1 = () => import("./success-DxdKAaZq.mjs");
var Route$1 = createFileRoute("/checkout/success")({
	validateSearch: (search) => ({ orderId: typeof search.orderId === "string" ? search.orderId : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [{ title: "Order Confirmation — AUVYRA Bookstore" }] })
});
var $$splitNotFoundComponentImporter = () => import("../_productId-DFfMfcgp.mjs");
var $$splitComponentImporter = () => import("../_productId-D3LVylSu.mjs");
var Route = createFileRoute("/products/$productId")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	loader: async ({ params }) => {
		const id = Number(params.productId);
		try {
			const live = (await getPublicStoreProductsServerFn()).find((p) => p.id === id);
			if (live) return live;
		} catch {}
		const product = getProduct(id);
		if (!product) throw notFound();
		return product;
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `${loaderData.name} — AUVYRA Bookstore` }, {
		name: "description",
		content: loaderData.shortDescription
	}] : [] })
});
var IndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$7
});
var AdminRoute = Route$5.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$7
});
var CartRoute = Route$4.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$7
});
var CheckoutIndexRoute = Route$3.update({
	id: "/checkout/",
	path: "/checkout/",
	getParentRoute: () => Route$7
});
var rootRouteChildren = {
	IndexRoute,
	AdminRoute,
	CartRoute,
	CheckoutCancelRoute: Route$2.update({
		id: "/checkout/cancel",
		path: "/checkout/cancel",
		getParentRoute: () => Route$7
	}),
	CheckoutSuccessRoute: Route$1.update({
		id: "/checkout/success",
		path: "/checkout/success",
		getParentRoute: () => Route$7
	}),
	ProductsProductIdRoute: Route.update({
		id: "/products/$productId",
		path: "/products/$productId",
		getParentRoute: () => Route$7
	}),
	CheckoutIndexRoute
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
export { LogoMark, Route, Route$1, Route$6, WHATSAPP_DISPLAY, router_exports, submitCustomerOrderServerFn, useCatalogText, useLanguage, useStore, whatsappLink };
