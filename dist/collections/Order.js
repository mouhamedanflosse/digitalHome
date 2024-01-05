"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var yourOrder = function (_a) {
    var req = _a.req;
    var user = req.user;
    if ((user === null || user === void 0 ? void 0 : user.role) === "admin")
        return true;
    return {
        user: {
            equals: user === null || user === void 0 ? void 0 : user.id
        }
    };
};
exports.Order = {
    slug: "order",
    admin: {
        useAsTitle: "your orders",
        description: "a summary for all your orders on digitalHome",
    },
    access: {
        read: yourOrder,
        create: function (_a) {
            var req = _a.req;
            return req.user.id === "admin";
        },
        update: function (_a) {
            var req = _a.req;
            return req.user.id === "admin";
        },
        delete: function (_a) {
            var req = _a.req;
            return req.user.id === "admin";
        },
    },
    fields: [
        {
            name: "_isPaid",
            required: true,
            type: "checkbox",
            access: {
                read: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
                update: function () { return false; },
                create: function () { return false; },
            },
            admin: {
                hidden: true,
            },
        },
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            admin: {
                hidden: true,
            },
        },
        {
            name: "products",
            type: "relationship",
            relationTo: "products",
            hasMany: true,
            required: true,
        },
    ],
};
