"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require('dotenv').config({ path: __dirname + '/.env' });
const invoices_1 = __importDefault(require("./routes/invoices"));
const app = express();
const PORT = process.env.PORT || 8080;
app.use("/invoices", invoices_1.default);
app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT} `);
    console.log("Press CTRL + C to stop server");
});
