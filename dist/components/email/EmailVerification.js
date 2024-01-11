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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationEmailHtml = exports.EmailVerification = void 0;
var components_1 = require("@react-email/components");
var React = __importStar(require("react"));
var EmailVerification = function (_a) {
    var actionLabel = _a.actionLabel, buttonText = _a.buttonText, href = _a.href;
    return (React.createElement(components_1.Html, null,
        React.createElement(components_1.Head, null),
        React.createElement(components_1.Preview, null, "The marketplace for high-quality digital goods."),
        React.createElement(components_1.Body, { style: main },
            React.createElement(components_1.Container, { style: container },
                React.createElement(components_1.Img, { src: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/hippo-newsletter-sign-up.png"), width: "150", height: "150", alt: "DigitalHippo", style: logo }),
                React.createElement(components_1.Text, { style: paragraph }, "Hi there,"),
                React.createElement(components_1.Text, { style: paragraph },
                    "Welcome to DigitalHippo, the marketplace for high quality digital goods. Use the button below to ",
                    actionLabel,
                    "."),
                React.createElement(components_1.Section, { style: btnContainer },
                    React.createElement(components_1.Button, { style: button, href: href }, buttonText)),
                React.createElement(components_1.Text, { style: paragraph },
                    "Best,",
                    React.createElement("br", null),
                    "The DigitalHippo team"),
                React.createElement(components_1.Hr, { style: hr }),
                React.createElement(components_1.Text, { style: footer }, "If you did not request this email, you can safely ignore it.")))));
};
exports.EmailVerification = EmailVerification;
var VerificationEmailHtml = function (props) {
    return (0, components_1.render)(React.createElement(exports.EmailVerification, __assign({}, props)), { pretty: true });
};
exports.VerificationEmailHtml = VerificationEmailHtml;
var main = {
    backgroundColor: "#ffffff",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
var container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};
var logo = {
    margin: "0 auto",
};
var paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};
var btnContainer = {
    textAlign: "center",
};
var button = {
    padding: "12px 12px",
    backgroundColor: "#2563eb",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
};
var hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};
var footer = {
    color: "#8898aa",
    fontSize: "12px",
};
