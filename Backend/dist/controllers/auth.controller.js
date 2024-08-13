"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.signup = exports.login = void 0;
const login = (req, res) => {
    res.send('Login endpoint');
};
exports.login = login;
const signup = (req, res) => {
    res.send('Signup endpoint');
};
exports.signup = signup;
const logout = (req, res) => {
    res.send("logout Endpoint");
};
exports.logout = logout;
