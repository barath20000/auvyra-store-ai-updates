import { TSS_SERVER_FUNCTION, createServerFn } from "./ssr.mjs";
import { categories, products } from "./products-vOGwWypY.mjs";
import { _enum, array, boolean, number, object, string } from "../_libs/zod.mjs";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
// node_modules/.nitro/vite/services/ssr/assets/adminActions-c3wR1LDn.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var DATA_DIR = path.resolve(process.cwd(), ".admin-data");
var DB_FILE = path.join(DATA_DIR, "database.json");
var PDF_DIR = path.join(DATA_DIR, "uploads", "pdfs");
var COVERS_DIR = path.join(DATA_DIR, "uploads", "covers");
function ensureDirectories() {
	if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
	if (!fs.existsSync(PDF_DIR)) fs.mkdirSync(PDF_DIR, { recursive: true });
	if (!fs.existsSync(COVERS_DIR)) fs.mkdirSync(COVERS_DIR, { recursive: true });
}
function hashPassword(password, salt) {
	return crypto.pbkdf2Sync(password, salt, 1e4, 64, "sha512").toString("hex");
}
function createInitialDatabase() {
	const salt1 = crypto.randomBytes(16).toString("hex");
	const salt2 = crypto.randomBytes(16).toString("hex");
	return {
		version: 1,
		adminUsers: [
			{
				id: "admin_barath",
				email: "barath@auvyra.com",
				name: "Barath",
				salt: salt1,
				passwordHash: hashPassword("AuvyraAdmin#2026", salt1)
			},
			{
				id: "admin_barath_gmail",
				email: "vsbarathsudhakar@gmail.com",
				name: "Barath",
				salt: salt1,
				passwordHash: hashPassword("AuvyraAdmin#2026", salt1)
			},
			{
				id: "admin_kavi_gmail",
				email: "kaviravi1905@gmail.com",
				name: "Kavi",
				salt: salt2,
				passwordHash: hashPassword("AuvyraAdmin#2026", salt2)
			},
			{
				id: "admin_kavi_work",
				email: "kavi@auvyra.com",
				name: "Kavi",
				salt: salt2,
				passwordHash: hashPassword("AuvyraAdmin#2026", salt2)
			}
		],
		sessions: {},
		products: products.map((p, index) => ({
			id: p.id,
			slug: p.slug,
			category: p.category,
			format: p.format,
			language: p.language,
			coverWord: p.coverWord,
			name: p.name,
			nameTa: p.nameTa,
			shortDescription: p.shortDescription,
			shortDescriptionTa: p.shortDescriptionTa,
			description: p.description,
			descriptionTa: p.descriptionTa,
			includes: p.includes,
			includesTa: p.includesTa,
			pages: p.pages,
			price: p.price,
			digitalPrice: p.digitalPrice ?? p.price,
			physicalPrice: p.physicalPrice,
			productType: p.productType,
			physicalStock: p.productType === "digital" ? 0 : 35 + index * 7 % 25,
			featured: p.featured,
			coverImage: p.coverImage,
			dimensions: p.dimensions,
			isbn: p.isbn || `978-81-96${String(1e3 + p.id).padStart(4, "0")}`,
			version: 1,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		})),
		orders: [{
			id: "AUV-261101-7F89A",
			createdAt: (/* @__PURE__ */ new Date(Date.now() - 1728e5)).toISOString(),
			customer: {
				name: "Suresh Kumar",
				email: "suresh.k@example.com",
				whatsapp: "9840123456",
				address: "14 Gandhi Road, T. Nagar",
				city: "Chennai",
				pincode: "600017"
			},
			items: [{
				id: 9,
				cartKey: "9:physical",
				name: "Creative Watercolor & Painting Book",
				price: 499,
				quantity: 1,
				edition: "physical",
				format: "artbook",
				category: "arts"
			}, {
				id: 7,
				cartKey: "7:digital",
				name: "Build Better Habits",
				price: 199,
				quantity: 1,
				edition: "digital",
				format: "ebook",
				category: "growth"
			}],
			hasDigitalItems: true,
			hasPhysicalItems: true,
			subtotal: 698,
			total: 698,
			paymentStatus: "verified",
			paymentGateway: "upi_whatsapp",
			shippingStatus: "processing",
			lastModifiedBy: "Barath",
			updatedAt: (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString()
		}, {
			id: "AUV-261102-3B45C",
			createdAt: (/* @__PURE__ */ new Date(Date.now() - 18e6)).toISOString(),
			customer: {
				name: "Priya Meenakshi",
				email: "priya.m@example.com",
				whatsapp: "9443187654"
			},
			items: [{
				id: 11,
				cartKey: "11:digital",
				name: "Tamil Illustrated Storybook: Little Birds",
				price: 179,
				quantity: 1,
				edition: "digital",
				format: "storybook",
				category: "children"
			}],
			hasDigitalItems: true,
			hasPhysicalItems: false,
			subtotal: 179,
			total: 179,
			paymentStatus: "pending",
			paymentGateway: "pending_verification",
			updatedAt: (/* @__PURE__ */ new Date(Date.now() - 18e6)).toISOString()
		}],
		auditLog: [{
			id: "log_init",
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			adminName: "System",
			action: "INITIALIZE",
			details: "AUVYRA Shared Admin Database initialized with 2 administrators and 14 book editions."
		}]
	};
}
function readDatabase() {
	ensureDirectories();
	try {
		if (!fs.existsSync(DB_FILE)) {
			const initial = createInitialDatabase();
			writeDatabase(initial);
			return initial;
		}
		const raw = fs.readFileSync(DB_FILE, "utf-8");
		const parsed = JSON.parse(raw);
		if (!parsed.products || parsed.products.length === 0) {
			const initial = createInitialDatabase();
			writeDatabase(initial);
			return initial;
		}
		let updated = false;
		if (!parsed.adminUsers?.some((u) => u.email.toLowerCase() === "kaviravi1905@gmail.com")) {
			const salt = crypto.randomBytes(16).toString("hex");
			parsed.adminUsers.push({
				id: "admin_kavi_gmail",
				email: "kaviravi1905@gmail.com",
				name: "Kavi",
				salt,
				passwordHash: hashPassword("AuvyraAdmin#2026", salt)
			});
			updated = true;
		}
		if (!parsed.adminUsers?.some((u) => u.email.toLowerCase() === "vsbarathsudhakar@gmail.com")) {
			const salt = crypto.randomBytes(16).toString("hex");
			parsed.adminUsers.push({
				id: "admin_barath_gmail",
				email: "vsbarathsudhakar@gmail.com",
				name: "Barath",
				salt,
				passwordHash: hashPassword("AuvyraAdmin#2026", salt)
			});
			updated = true;
		}
		if (updated) writeDatabase(parsed);
		return parsed;
	} catch (err) {
		console.error("Error reading admin database:", err);
		const initial = createInitialDatabase();
		writeDatabase(initial);
		return initial;
	}
}
function writeDatabase(db) {
	ensureDirectories();
	db.version = (db.version || 0) + 1;
	fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
}
function authenticateAdmin(email, plainPassword) {
	const db = readDatabase();
	const normalizedEmail = email.trim().toLowerCase();
	const user = db.adminUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
	if (!user) return null;
	if (hashPassword(plainPassword, user.salt) !== user.passwordHash) return null;
	const token = crypto.randomBytes(32).toString("hex");
	const now = Date.now();
	const expiresAt = now + 6048e5;
	db.sessions[token] = {
		token,
		adminId: user.id,
		email: user.email,
		name: user.name,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		expiresAt
	};
	user.lastLogin = (/* @__PURE__ */ new Date()).toISOString();
	for (const [key, sess] of Object.entries(db.sessions)) if (sess.expiresAt < now) delete db.sessions[key];
	db.auditLog.unshift({
		id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		adminName: user.name,
		action: "LOGIN",
		details: `${user.name} logged in from device session.`
	});
	writeDatabase(db);
	return {
		user,
		token
	};
}
function verifySession(token) {
	if (!token) return null;
	const db = readDatabase();
	const session = db.sessions[token];
	if (!session) return null;
	if (session.expiresAt < Date.now()) {
		delete db.sessions[token];
		writeDatabase(db);
		return null;
	}
	return session;
}
function logoutSession(token) {
	const db = readDatabase();
	if (db.sessions[token]) {
		const adminName = db.sessions[token].name;
		delete db.sessions[token];
		db.auditLog.unshift({
			id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			adminName,
			action: "LOGOUT",
			details: `${adminName} logged out session.`
		});
		writeDatabase(db);
	}
}
function getPdfFilePath(fileName) {
	ensureDirectories();
	return path.join(PDF_DIR, fileName);
}
function saveSecurePdf(productId, originalName, base64Data) {
	ensureDirectories();
	const safeOriginal = originalName.replace(/[^a-zA-Z0-9.-]/g, "_");
	const fileName = `book_${productId}_${Date.now()}_${safeOriginal}`;
	const targetPath = path.join(PDF_DIR, fileName);
	const buffer = Buffer.from(base64Data, "base64");
	fs.writeFileSync(targetPath, buffer);
	return {
		fileName,
		size: buffer.length
	};
}
function saveCoverImage(productId, originalName, base64Data) {
	ensureDirectories();
	const ext = path.extname(originalName) || ".jpg";
	const fileName = `cover_${productId}_${Date.now()}${ext}`;
	const targetPath = path.join(COVERS_DIR, fileName);
	const buffer = Buffer.from(base64Data, "base64");
	fs.writeFileSync(targetPath, buffer);
	return `data:${ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg"};base64,${base64Data}`;
}
function readSecurePdf(fileName) {
	const filePath = getPdfFilePath(fileName);
	if (!fs.existsSync(filePath)) return null;
	return fs.readFileSync(filePath);
}
var adminLoginServerFn_createServerFn_handler = createServerRpc({
	id: "66c35d8a9a4962a44631ac079d54f7e2b238ab0a8aff1086d90c9c6926cd8dfe",
	name: "adminLoginServerFn",
	filename: "src/lib/server/adminActions.ts"
}, (opts) => adminLoginServerFn.__executeServer(opts));
var adminLoginServerFn = createServerFn({ method: "POST" }).validator(object({
	email: string().email(),
	password: string().min(1)
})).handler(adminLoginServerFn_createServerFn_handler, async ({ data: { email, password } }) => {
	const auth = authenticateAdmin(email, password);
	if (!auth) return {
		success: false,
		error: "Invalid administrator email or password."
	};
	return {
		success: true,
		token: auth.token,
		admin: {
			id: auth.user.id,
			email: auth.user.email,
			name: auth.user.name
		}
	};
});
var adminVerifySessionServerFn_createServerFn_handler = createServerRpc({
	id: "b569614c4114cb50bbdb4c9b85e6425f67c9f69885ad344a25b32313ed013085",
	name: "adminVerifySessionServerFn",
	filename: "src/lib/server/adminActions.ts"
}, (opts) => adminVerifySessionServerFn.__executeServer(opts));
var adminVerifySessionServerFn = createServerFn({ method: "POST" }).validator(object({ token: string().optional() })).handler(adminVerifySessionServerFn_createServerFn_handler, async ({ data: { token } }) => {
	const session = verifySession(token);
	if (!session) return { valid: false };
	const db = readDatabase();
	const activeSessionsCount = Object.keys(db.sessions).length;
	return {
		valid: true,
		admin: {
			id: session.adminId,
			email: session.email,
			name: session.name
		},
		activeSessionsCount
	};
});
var adminLogoutServerFn_createServerFn_handler = createServerRpc({
	id: "9b768b4884588cec31dcfc004942fcc650b2e700fafd7f4b55413b2a30b9dae4",
	name: "adminLogoutServerFn",
	filename: "src/lib/server/adminActions.ts"
}, (opts) => adminLogoutServerFn.__executeServer(opts));
var adminLogoutServerFn = createServerFn({ method: "POST" }).validator(object({ token: string() })).handler(adminLogoutServerFn_createServerFn_handler, async ({ data: { token } }) => {
	logoutSession(token);
	return { success: true };
});
var adminGetDashboardDataServerFn_createServerFn_handler = createServerRpc({
	id: "24bb4eaa8ecd874f2adceb7adcb5ba3e5ff1b8038c30274c201bf8ab7dd2a6e1",
	name: "adminGetDashboardDataServerFn",
	filename: "src/lib/server/adminActions.ts"
}, (opts) => adminGetDashboardDataServerFn.__executeServer(opts));
var adminGetDashboardDataServerFn = createServerFn({ method: "POST" }).validator(object({ token: string() })).handler(adminGetDashboardDataServerFn_createServerFn_handler, async ({ data: { token } }) => {
	if (!verifySession(token)) throw new Error("Unauthorized administrator access");
	const db = readDatabase();
	const activeAdmins = db.adminUsers.map((u) => ({
		id: u.id,
		email: u.email,
		name: u.name,
		lastLogin: u.lastLogin
	}));
	const activeSessionsList = Object.values(db.sessions).map((s) => ({
		adminId: s.adminId,
		name: s.name,
		email: s.email,
		createdAt: s.createdAt
	}));
	return {
		version: db.version,
		products: db.products,
		orders: db.orders,
		categories,
		auditLog: db.auditLog.slice(0, 50),
		adminList: activeAdmins,
		activeSessionsList
	};
});
var adminPollSyncServerFn_createServerFn_handler = createServerRpc({
	id: "8258ddb6dc1d40926547ff944d4a60eab09ab60eb5e403ab05e1b53260cea2af",
	name: "adminPollSyncServerFn",
	filename: "src/lib/server/adminActions.ts"
}, (opts) => adminPollSyncServerFn.__executeServer(opts));
var adminPollSyncServerFn = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	clientVersion: number()
})).handler(adminPollSyncServerFn_createServerFn_handler, async ({ data: { token, clientVersion } }) => {
	if (!verifySession(token)) return {
		authorized: false,
		hasUpdate: false,
		serverVersion: 0
	};
	const db = readDatabase();
	return {
		authorized: true,
		hasUpdate: db.version > clientVersion,
		serverVersion: db.version
	};
});
var adminSaveProductServerFn_createServerFn_handler = createServerRpc({
	id: "1e5622c2ecff17968bb8d3fd1f814ec6b198fd5102cced8f439b13cc26df7218",
	name: "adminSaveProductServerFn",
	filename: "src/lib/server/adminActions.ts"
}, (opts) => adminSaveProductServerFn.__executeServer(opts));
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
})).handler(adminSaveProductServerFn_createServerFn_handler, async ({ data: { token, product } }) => {
	const session = verifySession(token);
	if (!session) throw new Error("Unauthorized administrator access");
	const db = readDatabase();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	if (product.id) {
		const index = db.products.findIndex((p) => p.id === product.id);
		if (index === -1) return {
			success: false,
			error: "Product not found"
		};
		const existing = db.products[index];
		if (product.expectedVersion && existing.version > product.expectedVersion) return {
			success: false,
			conflict: true,
			currentProduct: existing,
			error: `Book was recently modified by ${existing.lastModifiedBy || "another admin"}. Please review the updated version.`
		};
		const updated = {
			...existing,
			...product,
			id: existing.id,
			version: existing.version + 1,
			lastModifiedBy: session.name,
			updatedAt: now
		};
		db.products[index] = updated;
		db.auditLog.unshift({
			id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
			timestamp: now,
			adminName: session.name,
			action: "UPDATE_BOOK",
			details: `${session.name} updated book "${updated.name}" (ID #${updated.id}, Digital: ₹${updated.digitalPrice}${updated.physicalPrice ? `, Physical: ₹${updated.physicalPrice}` : ""}, Stock: ${updated.physicalStock}).`
		});
		writeDatabase(db);
		return {
			success: true,
			product: updated
		};
	} else {
		const nextId = Math.max(0, ...db.products.map((p) => p.id)) + 1;
		const newProduct = {
			...product,
			id: nextId,
			version: 1,
			lastModifiedBy: session.name,
			updatedAt: now
		};
		db.products.unshift(newProduct);
		db.auditLog.unshift({
			id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
			timestamp: now,
			adminName: session.name,
			action: "ADD_BOOK",
			details: `${session.name} added new book "${newProduct.name}" (ID #${newProduct.id}, Type: ${newProduct.productType}).`
		});
		writeDatabase(db);
		return {
			success: true,
			product: newProduct
		};
	}
});
var adminDeleteProductServerFn_createServerFn_handler = createServerRpc({
	id: "15a6d38833eaecaefec003a853dff3e1dc4879b74ba1d7e8183fc5fde45089e3",
	name: "adminDeleteProductServerFn",
	filename: "src/lib/server/adminActions.ts"
}, (opts) => adminDeleteProductServerFn.__executeServer(opts));
var adminDeleteProductServerFn = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	productId: number()
})).handler(adminDeleteProductServerFn_createServerFn_handler, async ({ data: { token, productId } }) => {
	const session = verifySession(token);
	if (!session) throw new Error("Unauthorized administrator access");
	const db = readDatabase();
	const target = db.products.find((p) => p.id === productId);
	if (!target) return {
		success: false,
		error: "Product not found"
	};
	db.products = db.products.filter((p) => p.id !== productId);
	db.auditLog.unshift({
		id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		adminName: session.name,
		action: "DELETE_BOOK",
		details: `${session.name} deleted book "${target.name}" (ID #${target.id}).`
	});
	writeDatabase(db);
	return { success: true };
});
var adminUpdateStockServerFn_createServerFn_handler = createServerRpc({
	id: "a75068fb223dd105723d0c6377f93755591ca1fb35fa1c117323ae9ed774c184",
	name: "adminUpdateStockServerFn",
	filename: "src/lib/server/adminActions.ts"
}, (opts) => adminUpdateStockServerFn.__executeServer(opts));
var adminUpdateStockServerFn = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	productId: number(),
	newStock: number().min(0)
})).handler(adminUpdateStockServerFn_createServerFn_handler, async ({ data: { token, productId, newStock } }) => {
	const session = verifySession(token);
	if (!session) throw new Error("Unauthorized administrator access");
	const db = readDatabase();
	const target = db.products.find((p) => p.id === productId);
	if (!target) return {
		success: false,
		error: "Product not found"
	};
	const oldStock = target.physicalStock;
	target.physicalStock = newStock;
	target.version += 1;
	target.lastModifiedBy = session.name;
	target.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
	db.auditLog.unshift({
		id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		adminName: session.name,
		action: "UPDATE_STOCK",
		details: `${session.name} adjusted physical stock of "${target.name}" from ${oldStock} to ${newStock}.`
	});
	writeDatabase(db);
	return {
		success: true,
		physicalStock: newStock
	};
});
var adminUpdateOrderStatusServerFn_createServerFn_handler = createServerRpc({
	id: "e8157de9022d12a8aa423a39dfbc65d600e77129e888ddfc2169d5bebff89295",
	name: "adminUpdateOrderStatusServerFn",
	filename: "src/lib/server/adminActions.ts"
}, (opts) => adminUpdateOrderStatusServerFn.__executeServer(opts));
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
})).handler(adminUpdateOrderStatusServerFn_createServerFn_handler, async ({ data: { token, orderId, paymentStatus, shippingStatus } }) => {
	const session = verifySession(token);
	if (!session) throw new Error("Unauthorized administrator access");
	const db = readDatabase();
	const order = db.orders.find((o) => o.id === orderId);
	if (!order) return {
		success: false,
		error: "Order not found"
	};
	order.paymentStatus = paymentStatus;
	if (shippingStatus) order.shippingStatus = shippingStatus;
	else if (paymentStatus === "verified" && order.hasPhysicalItems && !order.shippingStatus) order.shippingStatus = "processing";
	order.lastModifiedBy = session.name;
	order.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
	db.auditLog.unshift({
		id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		adminName: session.name,
		action: "UPDATE_ORDER",
		details: `${session.name} updated order #${order.id} status: Payment = ${paymentStatus}${shippingStatus ? `, Shipping = ${shippingStatus}` : ""}.`
	});
	writeDatabase(db);
	return {
		success: true,
		order
	};
});
var adminUploadFileServerFn_createServerFn_handler = createServerRpc({
	id: "a6cc033e526b7133f6c210165914f1c93fe7393a2daa938f169365e3bccf1506",
	name: "adminUploadFileServerFn",
	filename: "src/lib/server/adminActions.ts"
}, (opts) => adminUploadFileServerFn.__executeServer(opts));
var adminUploadFileServerFn = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	productId: number(),
	fileType: _enum(["pdf", "cover"]),
	fileName: string(),
	base64Data: string()
})).handler(adminUploadFileServerFn_createServerFn_handler, async ({ data: { token, productId, fileType, fileName, base64Data } }) => {
	const session = verifySession(token);
	if (!session) throw new Error("Unauthorized administrator access");
	const db = readDatabase();
	const product = db.products.find((p) => p.id === productId);
	if (!product) return {
		success: false,
		error: "Product not found"
	};
	const now = (/* @__PURE__ */ new Date()).toISOString();
	if (fileType === "pdf") {
		const saved = saveSecurePdf(productId, fileName, base64Data);
		product.pdfFileName = saved.fileName;
		product.pdfOriginalName = fileName;
		product.pdfSize = saved.size;
		product.pdfUploadedAt = now;
		product.version += 1;
		product.lastModifiedBy = session.name;
		product.updatedAt = now;
		db.auditLog.unshift({
			id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
			timestamp: now,
			adminName: session.name,
			action: "UPLOAD_PDF",
			details: `${session.name} uploaded secure digital PDF "${fileName}" (${(saved.size / 1024).toFixed(1)} KB) for book "${product.name}".`
		});
		writeDatabase(db);
		return {
			success: true,
			pdfFileName: saved.fileName,
			pdfSize: saved.size
		};
	} else {
		const coverUrl = saveCoverImage(productId, fileName, base64Data);
		product.coverImage = coverUrl;
		product.version += 1;
		product.lastModifiedBy = session.name;
		product.updatedAt = now;
		db.auditLog.unshift({
			id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
			timestamp: now,
			adminName: session.name,
			action: "UPLOAD_COVER",
			details: `${session.name} uploaded new cover image for book "${product.name}".`
		});
		writeDatabase(db);
		return {
			success: true,
			coverImage: coverUrl
		};
	}
});
var adminDownloadPdfServerFn_createServerFn_handler = createServerRpc({
	id: "162299fab99157ab06a2d09a7ba54db249b498c2ed8f571dfbb0787caee950ff",
	name: "adminDownloadPdfServerFn",
	filename: "src/lib/server/adminActions.ts"
}, (opts) => adminDownloadPdfServerFn.__executeServer(opts));
var adminDownloadPdfServerFn = createServerFn({ method: "POST" }).validator(object({
	token: string(),
	fileName: string()
})).handler(adminDownloadPdfServerFn_createServerFn_handler, async ({ data: { token, fileName } }) => {
	if (!verifySession(token)) throw new Error("Unauthorized administrator access");
	const buffer = readSecurePdf(fileName);
	if (!buffer) return {
		success: false,
		error: "File not found on secure server storage"
	};
	return {
		success: true,
		base64: buffer.toString("base64"),
		mimeType: "application/pdf",
		fileName
	};
});
var getPublicStoreProductsServerFn_createServerFn_handler = createServerRpc({
	id: "42068fafb1a85499050726466df6e5d785fc878d6990c762f0cf89227e8121c1",
	name: "getPublicStoreProductsServerFn",
	filename: "src/lib/server/adminActions.ts"
}, (opts) => getPublicStoreProductsServerFn.__executeServer(opts));
var getPublicStoreProductsServerFn = createServerFn({ method: "GET" }).handler(getPublicStoreProductsServerFn_createServerFn_handler, async () => {
	try {
		return readDatabase().products;
	} catch {
		return products;
	}
});
var submitCustomerOrderServerFn_createServerFn_handler = createServerRpc({
	id: "2ca72aad11a5471bfa1e2d2c56be8c40142b6b0f25f41913d6bf88f2db25fb9a",
	name: "submitCustomerOrderServerFn",
	filename: "src/lib/server/adminActions.ts"
}, (opts) => submitCustomerOrderServerFn.__executeServer(opts));
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
}) })).handler(submitCustomerOrderServerFn_createServerFn_handler, async ({ data: { order } }) => {
	try {
		const db = readDatabase();
		const existing = db.orders.find((o) => o.id === order.id);
		if (existing) return {
			success: true,
			orderId: order.id,
			total: existing.total
		};
		const normalizedEmail = order.customer.email.toLowerCase().trim();
		const normalizedName = order.customer.name.trim();
		const normalizedPhone = order.customer.whatsapp.trim();
		const aggregatedMap = /* @__PURE__ */ new Map();
		for (const item of order.items) {
			const key = `${item.id}:${item.edition}`;
			const existingItem = aggregatedMap.get(key);
			if (existingItem) {
				existingItem.quantity += item.quantity;
				if (existingItem.quantity > 50) existingItem.quantity = 50;
			} else aggregatedMap.set(key, { ...item });
		}
		const consolidatedItems = Array.from(aggregatedMap.values());
		let hasDigitalItems = false;
		let hasPhysicalItems = false;
		let calculatedSubtotal = 0;
		const verifiedItems = [];
		for (const item of consolidatedItems) {
			const product = db.products.find((p) => p.id === item.id);
			if (!product) return {
				success: false,
				error: `Product ID #${item.id} is no longer available in the catalog.`
			};
			if (item.edition === "physical") {
				if (product.productType === "digital") return {
					success: false,
					error: `"${product.name}" is only available as a digital edition.`
				};
				if (typeof product.physicalStock === "number" && product.physicalStock < item.quantity) return {
					success: false,
					error: `Insufficient stock for "${product.name}". Available: ${product.physicalStock}, requested: ${item.quantity}.`
				};
				hasPhysicalItems = true;
				const serverPrice = product.physicalPrice ?? product.price;
				calculatedSubtotal += serverPrice * item.quantity;
				verifiedItems.push({
					id: product.id,
					cartKey: item.cartKey,
					name: product.name,
					price: serverPrice,
					quantity: item.quantity,
					edition: "physical",
					format: product.format,
					category: product.category
				});
			} else {
				if (product.productType === "physical") return {
					success: false,
					error: `"${product.name}" is only available as a physical edition.`
				};
				hasDigitalItems = true;
				const serverPrice = product.digitalPrice ?? product.price;
				const digitalQty = 1;
				calculatedSubtotal += serverPrice * digitalQty;
				verifiedItems.push({
					id: product.id,
					cartKey: item.cartKey,
					name: product.name,
					price: serverPrice,
					quantity: digitalQty,
					edition: "digital",
					format: product.format,
					category: product.category
				});
			}
		}
		if (hasPhysicalItems) {
			if (!order.customer.address?.trim() || !order.customer.city?.trim() || !order.customer.pincode?.trim()) return {
				success: false,
				error: "Complete shipping address (address, city, and pincode) is required for physical book orders."
			};
		}
		const shippingFee = hasPhysicalItems ? calculatedSubtotal >= 999 ? 0 : 60 : 0;
		const calculatedTotal = calculatedSubtotal + shippingFee;
		for (const vItem of verifiedItems) if (vItem.edition === "physical") {
			const product = db.products.find((p) => p.id === vItem.id);
			if (product && typeof product.physicalStock === "number") {
				product.physicalStock = Math.max(0, product.physicalStock - vItem.quantity);
				product.version += 1;
				product.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
			}
		}
		const storedOrder = {
			id: order.id,
			createdAt: order.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
			customer: {
				name: normalizedName,
				email: normalizedEmail,
				whatsapp: normalizedPhone,
				address: order.customer.address?.trim(),
				city: order.customer.city?.trim(),
				pincode: order.customer.pincode?.trim(),
				notes: order.customer.notes?.trim()
			},
			items: verifiedItems,
			hasDigitalItems,
			hasPhysicalItems,
			subtotal: calculatedSubtotal,
			total: calculatedTotal,
			paymentStatus: "pending",
			paymentGateway: order.paymentGateway || "razorpay",
			shippingStatus: hasPhysicalItems ? "pending_verification" : void 0,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		db.orders.unshift(storedOrder);
		db.auditLog.unshift({
			id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			adminName: "Storefront",
			action: "ORDER_PLACED",
			details: `Customer ${storedOrder.customer.name} placed order #${storedOrder.id} for ₹${storedOrder.total} (${storedOrder.items.length} items). Payment: pending.`
		});
		writeDatabase(db);
		return {
			success: true,
			orderId: storedOrder.id,
			subtotal: storedOrder.subtotal,
			shippingFee,
			total: storedOrder.total
		};
	} catch (err) {
		console.error("Failed to record order in shared database:", err);
		return {
			success: false,
			error: err.message || "Failed to place order"
		};
	}
});
export { adminDeleteProductServerFn_createServerFn_handler, adminDownloadPdfServerFn_createServerFn_handler, adminGetDashboardDataServerFn_createServerFn_handler, adminLoginServerFn_createServerFn_handler, adminLogoutServerFn_createServerFn_handler, adminPollSyncServerFn_createServerFn_handler, adminSaveProductServerFn_createServerFn_handler, adminUpdateOrderStatusServerFn_createServerFn_handler, adminUpdateStockServerFn_createServerFn_handler, adminUploadFileServerFn_createServerFn_handler, adminVerifySessionServerFn_createServerFn_handler, getPublicStoreProductsServerFn_createServerFn_handler, submitCustomerOrderServerFn_createServerFn_handler };
