"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
require('dotenv').config({ path: __dirname + '/.env' });
const invoices_1 = __importDefault(require("./routes/invoices"));
const items_1 = __importDefault(require("./routes/items"));
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express());
app.use("/invoices", invoices_1.default);
app.use("/items", items_1.default);
app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT} `);
});
