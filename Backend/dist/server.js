"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const connect_1 = __importDefault(require("./db/connect"));
const Auth_routes_1 = __importDefault(require("./routes/Auth.routes"));
const Message_routes_1 = __importDefault(require("./routes/Message.routes"));
const User_routes_1 = __importDefault(require("./routes/User.routes"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware to parse JSON
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//root route 
app.use("/api/auth", Auth_routes_1.default);
app.use("/api/messages", Message_routes_1.default);
app.use("/api/userss", User_routes_1.default);
// Start the server
app.listen(port, () => {
    (0, connect_1.default)();
    console.log(`Server started on port ${port}`);
});
