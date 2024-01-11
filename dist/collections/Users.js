"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var EmailVerification_1 = require("../components/email/EmailVerification");
var userOrAdmin = function (_a) {
    var req = _a.req;
    var user = req.user;
    if (user.role === "admin")
        return true;
    return {
        id: {
            equals: user.id
        }
    };
};
exports.Users = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: (function (token) {
                return (0, EmailVerification_1.VerificationEmailHtml)({
                    actionLabel: "account verification ",
                    buttonText: "verify account",
                    href: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token)
                });
            })
        }
    },
    access: {
        read: userOrAdmin,
        create: function () { return true; },
        update: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
    },
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== "admin";
        },
        defaultColumns: ["id"]
    },
    fields: [
        {
            name: "products",
            label: "products",
            admin: {
                condition: function () { return false; }
            },
            relationTo: "products",
            type: "relationship",
            hasMany: true,
        },
        {
            name: "product_files",
            label: "product files",
            admin: {
                condition: function () { return false; }
            },
            relationTo: "product_files",
            type: "relationship",
            hasMany: true,
        },
        {
            name: "role",
            defaultValue: "user",
            required: true,
            type: "select",
            options: [
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
            ]
        }
    ]
};
