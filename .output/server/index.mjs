globalThis.__nitro_main__ = import.meta.url;
import { H3Core, HTTPError, NodeResponse, composeMiddleware, createMatcherFromFind, defineHandler, defineLazyEventHandler, headers, memoizeRouteRulesMatcher, serve, toEventHandler } from "./_libs/h3+rou3+srvx.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
// node_modules/nitro/dist/runtime/internal/polyfills/fast-response.mjs
if (globalThis.Response !== NodeResponse) globalThis.Response = NodeResponse;
// node_modules/nitro/dist/runtime/_libs/hookable.mjs
function e$1(t, n, r, i) {
	for (let a = r; a < t.length; a += 1) try {
		let r = i ? i.run(() => t[a](...n)) : t[a](...n);
		if (r && typeof r.then == `function`) return Promise.resolve(r).then(() => e$1(t, n, a + 1, i));
	} catch (e) {
		return Promise.reject(e);
	}
}
var t$1 = class {
	_hooks;
	constructor() {
		this._hooks = {};
	}
	hook(e, t) {
		return !e || typeof t != `function` ? () => {} : (this._hooks[e] = this._hooks[e] || [], this._hooks[e].push(t), () => {
			t &&= (this.removeHook(e, t), void 0);
		});
	}
	removeHook(e, t) {
		let n = this._hooks[e];
		if (n) {
			let r = n.indexOf(t);
			r !== -1 && n.splice(r, 1), n.length === 0 && (this._hooks[e] = void 0);
		}
	}
	callHook(t, ...n) {
		let r = this._hooks[t];
		if (r && r.length !== 0) return e$1(r.slice(), n, 0);
	}
};
// node_modules/nitro/dist/runtime/_libs/ufo.mjs
String.fromCharCode;
var e = /%2f/gi;
function t(e = ``) {
	try {
		return decodeURIComponent(`` + e);
	} catch {
		return `` + e;
	}
}
function n(n) {
	return t(n.replace(e, `%252F`));
}
var r = /\/$|\/\?|\/#/;
var i = /^\.?\//;
function a(e = ``, t) {
	return t ? r.test(e) : e.endsWith(`/`);
}
function o(e = ``, t) {
	if (!t) return (a(e) ? e.slice(0, -1) : e) || `/`;
	if (!a(e, !0)) return e || `/`;
	let n = e, r = ``, i = e.indexOf(`#`);
	i !== -1 && (n = e.slice(0, i), r = e.slice(i));
	let [o, ...s] = n.split(`?`);
	return ((o.endsWith(`/`) ? o.slice(0, -1) : o) || `/`) + (s.length > 0 ? `?${s.join(`?`)}` : ``) + r;
}
function s(e = ``, t) {
	if (!t) return e.endsWith(`/`) ? e : e + `/`;
	if (a(e, !0)) return e || `/`;
	let n = e, r = ``, i = e.indexOf(`#`);
	if (i !== -1 && (n = e.slice(0, i), r = e.slice(i), !n)) return r;
	let [o, ...s] = n.split(`?`);
	return o + `/` + (s.length > 0 ? `?${s.join(`?`)}` : ``) + r;
}
function c(e = ``) {
	return e.startsWith(`/`);
}
function l(e = ``) {
	return c(e) ? e : `/` + e;
}
function u(e) {
	return e && e !== `/`;
}
function d(e, ...t) {
	let n = e || ``;
	for (let e of t.filter((e) => u(e))) if (n) {
		let t = e.replace(i, ``);
		n = s(n) + t;
	} else n = e;
	return n;
}
// #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/BookCover-BJbOQFWb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1168-iPiGxzYl0GGLe1RVplzbX7lnJy4\"",
		"mtime": "2026-11-04T18:01:14.414Z",
		"size": 4456,
		"path": "../public/assets/BookCover-BJbOQFWb.js"
	},
	"/assets/ProductCard-BWhmYelA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1eed-uiocBfNwS89GcXFQhF9zEXNaJPw\"",
		"mtime": "2026-11-04T18:01:14.414Z",
		"size": 7917,
		"path": "../public/assets/ProductCard-BWhmYelA.js"
	},
	"/assets/_productId-C7ljaHhr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"278-XvC1Kd7EeEHeVKsTR6Ebft6276E\"",
		"mtime": "2026-11-04T18:01:14.414Z",
		"size": 632,
		"path": "../public/assets/_productId-C7ljaHhr.js"
	},
	"/assets/_productId-DrHyJjig.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b14-CBF4BYshBBEOMpZtd4VE9Uv/BMs\"",
		"mtime": "2026-11-04T18:01:14.414Z",
		"size": 15124,
		"path": "../public/assets/_productId-DrHyJjig.js"
	},
	"/assets/aistudio/AUVYRA-UPDATED-CART-FILES-3_58dab778.zip": {
		"type": "application/zip",
		"etag": "\"1b5da-qfgtuUPRwWaDFJr2DmJYeymwjm4\"",
		"mtime": "2026-11-04T18:01:15.704Z",
		"size": 112090,
		"path": "../public/assets/aistudio/AUVYRA-UPDATED-CART-FILES-3_58dab778.zip"
	},
	"/assets/arrow-left-C4hoKRqP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c2-1kl1LiI/13L4swd0TriyIJnLuaQ\"",
		"mtime": "2026-11-04T18:01:14.414Z",
		"size": 194,
		"path": "../public/assets/arrow-left-C4hoKRqP.js"
	},
	"/assets/cancel-D-KQOevC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c4-ebWNth7qQ8y/GO1P+i6L5nEzJtI\"",
		"mtime": "2026-11-04T18:01:14.414Z",
		"size": 1476,
		"path": "../public/assets/cancel-D-KQOevC.js"
	},
	"/assets/cart-TBPof-EL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c8a-0haNy4T858Ot6e0y8JqHTJbM5B8\"",
		"mtime": "2026-11-04T18:01:14.414Z",
		"size": 11402,
		"path": "../public/assets/cart-TBPof-EL.js"
	},
	"/assets/check-CcZYkoG3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-jrEQiuDIU+MYElVf8KGYBXPhM5o\"",
		"mtime": "2026-11-04T18:01:14.414Z",
		"size": 153,
		"path": "../public/assets/check-CcZYkoG3.js"
	},
	"/assets/checkout-BqMTP1ga.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cb6-CChFAZqhGJLdrgRzOzVY2735J4Q\"",
		"mtime": "2026-11-04T18:01:14.414Z",
		"size": 23734,
		"path": "../public/assets/checkout-BqMTP1ga.js"
	},
	"/assets/i18n-CyTJSUnD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20abe-oMqJPDod6HFua42HUMNPIFa1Yh8\"",
		"mtime": "2026-11-04T18:01:14.414Z",
		"size": 133822,
		"path": "../public/assets/i18n-CyTJSUnD.js"
	},
	"/assets/index-DO5X2B75.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"d533-m72ZzDEj7nD0Am+NpUN+Tuh56Qw\"",
		"mtime": "2026-11-04T18:01:14.415Z",
		"size": 54579,
		"path": "../public/assets/index-DO5X2B75.css"
	},
	"/assets/index-DfrrLc62.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"875d6-FGD9eAg6ErVRTN/amwaqbnOqgdw\"",
		"mtime": "2026-11-04T18:01:14.414Z",
		"size": 554454,
		"path": "../public/assets/index-DfrrLc62.js"
	},
	"/assets/message-circle-BQYFyi9Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10e-fw5HyeJsnMvswsTr7i423iyqB6Q\"",
		"mtime": "2026-11-04T18:01:14.414Z",
		"size": 270,
		"path": "../public/assets/message-circle-BQYFyi9Y.js"
	},
	"/assets/orders-B8516hRX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f26-iAgV5vF+Bw4Fe5hI0/FZFaPKF+k\"",
		"mtime": "2026-11-04T18:01:14.414Z",
		"size": 3878,
		"path": "../public/assets/orders-B8516hRX.js"
	},
	"/assets/preload-helper-B2ZrA5Dw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22ce-9UDDlZk+zD7g+jt/jW+V8VUC4IA\"",
		"mtime": "2026-11-04T18:01:14.414Z",
		"size": 8910,
		"path": "../public/assets/preload-helper-B2ZrA5Dw.js"
	},
	"/assets/pricing-Cctmtomv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"88-0eZkDJKa/htEyHfkvNNnxazluJM\"",
		"mtime": "2026-11-04T18:01:14.415Z",
		"size": 136,
		"path": "../public/assets/pricing-Cctmtomv.js"
	},
	"/assets/routes-DaTj3Zgl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53d4-w3tGnCL8kZVK4Byb01FAkceke0g\"",
		"mtime": "2026-11-04T18:01:14.415Z",
		"size": 21460,
		"path": "../public/assets/routes-DaTj3Zgl.js"
	},
	"/assets/sparkles-DNrUDxmz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21d-cD5RiBaNiBgi3yHN3M+1Sh3UzV8\"",
		"mtime": "2026-11-04T18:01:14.415Z",
		"size": 541,
		"path": "../public/assets/sparkles-DNrUDxmz.js"
	},
	"/assets/store-DTtgHtLC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7d7a-Qg3BXt648BsrnBmPIRyzEyEV6Kw\"",
		"mtime": "2026-11-04T18:01:14.415Z",
		"size": 32122,
		"path": "../public/assets/store-DTtgHtLC.js"
	},
	"/assets/success-Dv-L94Zx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54e8-iLthbWqhwdfBMlKhB8E7tQ/VqTM\"",
		"mtime": "2026-11-04T18:01:14.415Z",
		"size": 21736,
		"path": "../public/assets/success-Dv-L94Zx.js"
	},
	"/assets/truck-8ndcSpOL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d7-8aelCkTfjjDfP6dPMn8kYmV9Jw8\"",
		"mtime": "2026-11-04T18:01:14.415Z",
		"size": 727,
		"path": "../public/assets/truck-8ndcSpOL.js"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"248-Rp7c8YVZVlLaNLIJSAQlVMHxC7c\"",
		"mtime": "2026-11-04T18:01:15.704Z",
		"size": 584,
		"path": "../public/favicon.svg"
	}
};
// #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path)).catch((error) => {
		if (error?.code !== "ENOENT") throw error;
	});
}
// #nitro/virtual/public-assets
var publicAssetBases = { "/assets/": { "maxAge": 31536e3 } };
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
function hasAsset(id = "") {
	return !!(public_assets_data_default[id] || public_assets_data_default[id + ".gz"] || public_assets_data_default[id + ".br"] || public_assets_data_default[id + ".zst"]);
}
// node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var noCacheHeaders = { "cache-control": "no-store" };
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	const path = l(o(event.url.pathname));
	let id = path.includes("%") ? n(path) : path;
	if (!hasAsset(id) && !hasAsset(d(id, "index.html")) && !isPublicAssetURL(id)) return;
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((entry) => {
		const [name, ...parameters] = entry.split(";");
		const quality = parameters.map((parameter) => parameter.trim().split("=")).find(([key]) => key.toLowerCase() === "q")?.[1];
		const weight = quality === void 0 ? 1 : Number.parseFloat(quality);
		return {
			ext: EncodingMap[name.trim().toLowerCase()],
			weight: Number.isNaN(weight) ? 1 : weight
		};
	}).filter((entry) => entry.ext && entry.weight > 0).sort((a, b) => b.weight - a.weight || (a.ext < b.ext ? -1 : a.ext > b.ext ? 1 : 0)).map((entry) => entry.ext), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, d(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) throw new HTTPError({
			status: 404,
			headers: noCacheHeaders
		});
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	const data = readAsset(id);
	return typeof data?.then === "function" ? data.then((resolved) => assertAssetData(resolved)) : assertAssetData(data);
});
function assertAssetData(data) {
	if (data === null || data === void 0) throw new HTTPError({
		status: 404,
		headers: noCacheHeaders
	});
	return data;
}
// #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = {
		route: "/assets/**",
		rank: 0,
		rules: [{
			name: "headers",
			route: "/assets/**",
			handler: headers,
			options: { "cache-control": "public, max-age=31536000, immutable" }
		}]
	};
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1);
		let s = p.split("/");
		let l = s.length;
		let _w;
		if (l > 1) {
			if (s[1] === "assets") r.push(l > 2 ? {
				data: $0,
				params: {
					"0": _w = p.slice(8),
					_: _w
				}
			} : {
				data: $0,
				params: {}
			});
		}
		return r.reverse();
	};
})();
var _lazy_7385f145cb1fd37a = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_7385f145cb1fd37a
	};
	return ((_m, p) => {
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1);
		const w = p.slice(1);
		return {
			data,
			params: w ? {
				"0": w,
				_: w
			} : {}
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
// node_modules/nitro/dist/runtime/internal/error/utils.mjs
function createErrorHeaders(error, event, unhandled) {
	const headers = new Headers(unhandled ? {} : error.headers);
	const errHeaders = event.res?.errHeaders;
	if (errHeaders) for (const [name, value] of errHeaders) if (name === "set-cookie") headers.append(name, value);
	else headers.set(name, value);
	return headers;
}
// node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = createErrorHeaders(error, event, unhandled);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
// #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
// #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => {
		event.context.routeRules = getRouteRules(event.req.method, event.url.pathname).routeRules;
		if (event.req.method === "HEAD") {
			const route = findRoute("HEAD", event.url.pathname);
			return route?.data.method ? route : findRoute("GET", event.url.pathname);
		}
		return findRoute(event.req.method, event.url.pathname);
	};
	h3App["~middleware"].push(createRouteRulesMiddleware());
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~middleware"].push(createCacheRuleMiddleware());
	return h3App;
}
// node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new t$1();
}
function getRouteRules(method, pathname) {
	return matchRouteRules(method, pathname);
}
function createRouteRulesMiddleware() {
	const middleware = (event, next) => {
		const { rules, cache } = resolveRouteRuleChains(event.req.method, event.url.pathname);
		if (cache) event[kCacheRule] = cache;
		return rules ? rules(event, next) : next();
	};
	return markUntraced(middleware);
}
function createCacheRuleMiddleware() {
	const middleware = (event, next) => {
		const cache = event[kCacheRule];
		return cache ? cache(event, next) : next();
	};
	return markUntraced(middleware);
}
var _matchRouteRules;
function matchRouteRules(method, pathname) {
	return (_matchRouteRules ??= memoizeRouteRulesMatcher(createMatcherFromFind(findRouteRules)))(method, pathname);
}
var kCacheRule = /* @__PURE__ */ Symbol("nitro.cacheRule");
var _routeRuleChains = /* @__PURE__ */ new WeakMap();
function resolveRouteRuleChains(method, pathname) {
	const { matchedRules, routeRuleMiddleware } = matchRouteRules(method, pathname);
	if (routeRuleMiddleware.length === 0) return {};
	let chains = _routeRuleChains.get(routeRuleMiddleware);
	if (!chains) {
		const hasCache = !!matchedRules.cache?.handler;
		const rules = hasCache ? routeRuleMiddleware.slice(0, -1) : routeRuleMiddleware;
		chains = {
			rules: rules.length > 0 ? composeMiddleware(rules) : void 0,
			cache: hasCache ? routeRuleMiddleware.at(-1) : void 0
		};
		_routeRuleChains.set(routeRuleMiddleware, chains);
	}
	return chains;
}
function markUntraced(middleware) {
	middleware.__traced__ = true;
	return middleware;
}
// node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
// #nitro/virtual/server-entry
var serverEntryOptions = {};
// #nitro/virtual/tracing
var tracingSrvxPlugins = [];
// node_modules/nitro/dist/runtime/internal/serve.mjs
function resolveServeOptions(opts) {
	const { port, hostname, tls, ...entryOptions } = serverEntryOptions;
	const env = globalThis.process?.env || {};
	const _parsedPort = Number.parseInt(env.NITRO_PORT ?? env.PORT ?? "");
	const cert = env.NITRO_SSL_CERT;
	const key = env.NITRO_SSL_KEY;
	const socketPath = env.NITRO_UNIX_SOCKET;
	const resolved = {
		...entryOptions,
		port: Number.isNaN(_parsedPort) ? port ?? 3e3 : _parsedPort,
		hostname: env.NITRO_HOST || env.HOST || hostname,
		tls: cert && key ? {
			cert,
			key
		} : tls,
		...opts,
		plugins: [...tracingSrvxPlugins, ...opts.plugins || []]
	};
	for (const runtime of [
		"node",
		"bun",
		"deno"
	]) if (entryOptions[runtime] && opts[runtime]) resolved[runtime] = {
		...entryOptions[runtime],
		...opts[runtime]
	};
	if (socketPath) {
		resolved.node = {
			...resolved.node,
			path: socketPath
		};
		resolved.bun = {
			...resolved.bun,
			unix: socketPath
		};
		resolved.deno = {
			...resolved.deno,
			path: socketPath
		};
	}
	return resolved;
}
// node_modules/nitro/dist/runtime/internal/shutdown.mjs
function setupCloseHooks(server) {
	const closeServer = server.close.bind(server);
	let closeHooks;
	server.close = (closeActiveConnections) => closeServer(closeActiveConnections).finally(() => closeHooks ??= callCloseHooks());
}
async function callCloseHooks() {
	try {
		await useNitroHooks().callHook("close");
	} catch (error) {
		console.error("[nitro] Error while calling `close` hooks:", error);
	}
}
// node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var nitroApp = useNitroApp();
var server = serve(resolveServeOptions({ fetch: nitroApp.fetch }));
server.ready().catch((error) => {
	console.error("[nitro] Failed to start server:", error);
	process.exit(1);
});
setupCloseHooks(server);
trapUnhandledErrors();
var node_server_default = {};
export { node_server_default as default };
