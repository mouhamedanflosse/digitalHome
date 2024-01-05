"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidtion2 = exports.authValidtion = void 0;
var zod_1 = require("zod");
// for sign up
exports.authValidtion = zod_1.z.object({
    email: zod_1.z.string().email({ message: "invalid email" }),
    password: zod_1.z.string().min(8, { message: "password must be at least 8 characters long." }),
    confirm: zod_1.z.string()
}).refine(function (data) { return data.password === data.confirm; }, {
    path: ['confirm'],
    message: 'Passwords does not match'
});
// for sign in 
exports.authValidtion2 = zod_1.z.object({
    email: zod_1.z.string().email({ message: "invalid email" }),
    password: zod_1.z.string().min(8, { message: "password must be at least 8 characters long." }),
});
