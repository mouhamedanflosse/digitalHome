"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
var config_1 = require("../../config");
var strip_1 = require("../../lib/strip");
var addUser = function (_a) {
    var req = _a.req, data = _a.data;
    return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_b) {
            user = req.user;
            return [2 /*return*/, __assign(__assign({}, data), { user: user === null || user === void 0 ? void 0 : user.id })];
        });
    });
};
var syncUser = function (_a) {
    var req = _a.req, doc = _a.doc;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, products, prdIDs_1, createdprdIDs, allprds;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, req.payload.findByID({
                        collection: "users",
                        id: req.user.id,
                    })];
                case 1:
                    user = _b.sent();
                    if (!(user && typeof user === "object")) return [3 /*break*/, 3];
                    products = user.products;
                    prdIDs_1 = __spreadArray([], ((products === null || products === void 0 ? void 0 : products.map(function (prd) {
                        return typeof prd === "object" ? prd.id : prd;
                    })) || []), true);
                    createdprdIDs = prdIDs_1.filter(function (id, index) { return prdIDs_1.indexOf(id) === index; });
                    allprds = __spreadArray(__spreadArray([], createdprdIDs, true), [doc.id], false);
                    return [4 /*yield*/, req.payload.update({
                            collection: "users",
                            id: user.id,
                            data: {
                                products: allprds,
                            },
                        })];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
};
var hasAccess = function (_a) {
    var req = _a.req;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, prdIds;
        return __generator(this, function (_b) {
            user = req.user;
            if (!user)
                return [2 /*return*/, false];
            if ((user === null || user === void 0 ? void 0 : user.role) === "admin")
                return [2 /*return*/, true];
            prdIds = (user.products || []).reduce(function (acc, prd) {
                if (!prd)
                    return acc;
                else if (typeof prd === "string") {
                    acc.push(prd);
                }
                else {
                    acc.push(prd.id);
                }
                return acc;
            }, []);
            return [2 /*return*/, {
                    id: {
                        in: prdIds,
                    },
                }];
        });
    });
};
exports.Products = {
    slug: "products",
    admin: {
        useAsTitle: "name",
    },
    access: {
        read: hasAccess,
        update: hasAccess,
        delete: hasAccess,
    },
    hooks: {
        afterChange: [syncUser],
        beforeChange: [
            addUser,
            function (args) { return __awaiter(void 0, void 0, void 0, function () {
                var data, createdProduct, updated, data, updateProduct, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(args.operation === "create")) return [3 /*break*/, 2];
                            data = args.data;
                            return [4 /*yield*/, strip_1.stripe.products.create({
                                    name: data.name,
                                    default_price_data: {
                                        currency: "USD",
                                        unit_amount: Math.round(data.price * 100),
                                    },
                                })];
                        case 1:
                            createdProduct = _a.sent();
                            updated = __assign(__assign({}, data), { priceID: createdProduct.id, stripeID: createdProduct.default_price });
                            return [2 /*return*/, updated];
                        case 2:
                            if (!(args.operation === "update")) return [3 /*break*/, 4];
                            data = args.data;
                            return [4 /*yield*/, strip_1.stripe.products.update(data.stripeID, {
                                    name: data.name,
                                    default_price: data.priceID,
                                })];
                        case 3:
                            updateProduct = _a.sent();
                            updated = __assign(__assign({}, data), { stripeID: updateProduct.id, priceID: updateProduct.default_price });
                            return [2 /*return*/, updated];
                        case 4: return [2 /*return*/];
                    }
                });
            }); },
        ],
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: function () { return false; },
            },
        },
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
        },
        {
            name: "description",
            label: "description",
            type: "textarea",
            required: true,
        },
        {
            name: "price",
            label: "Price in USD",
            type: "number",
            min: 0,
            max: 1000,
            required: true,
        },
        {
            name: "category",
            label: "Category",
            type: "select",
            options: config_1.PRODUCT_CATEGORIES.map(function (_a) {
                var label = _a.label, value = _a.value;
                return ({ label: label, value: value });
            }),
            required: true,
        },
        {
            name: "product_files",
            label: "product file",
            type: "relationship",
            required: true,
            relationTo: "product_files",
            hasMany: false,
        },
        {
            name: "provedforSell",
            label: "product satuts",
            type: "select",
            defaultValue: "pending",
            access: {
                create: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
                read: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
                update: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
            },
            options: [
                {
                    label: "Approved",
                    value: "approved",
                },
                {
                    label: "Pending for verfiction",
                    value: "pending",
                },
                {
                    label: "Denied",
                    value: "Denied",
                },
            ],
        },
        {
            name: "priceID",
            type: "text",
            access: {
                create: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
                read: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
                update: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
            },
        },
        {
            name: "stripeID",
            type: "text",
            access: {
                create: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
                read: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
                update: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
            },
        },
        {
            name: "images",
            type: "array",
            label: "Product images",
            minRows: 1,
            maxRows: 4,
            required: true,
            labels: {
                singular: "Image",
                plural: "Images",
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
            ],
        },
    ],
};
