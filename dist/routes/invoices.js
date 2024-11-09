"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../knexfile"));
const router = express_1.default.Router();
const knex = (0, knex_1.default)(knexfile_1.default);
const editValidation = require('../validators/editValidation');
function aliasColumns(tableName, columns) {
    return columns.map((column) => `${tableName}.${column} as ${tableName}_${column}`);
}
const addressColumns = ["street", "city", "postCode", "country"];
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoiceList = yield knex("invoices");
        res.json(invoiceList);
    }
    catch (error) {
        return error;
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const invoiceInfo = yield knex("invoices")
            .join("senderaddress", "invoices.senderAddress_id", "senderaddress.id")
            .join("clientaddress", "invoices.clientAddress_id", "clientaddress.id")
            .where("invoices.invoiceId", id)
            .select("invoices.*", ...aliasColumns("senderaddress", addressColumns), ...aliasColumns("clientaddress", addressColumns));
        res.json(invoiceInfo);
    }
    catch (error) {
        return error;
    }
}));
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
router.put("/:id/edit", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const invoiceId = req.params.id;
    const postData = req.body;
    const { error, value } = editValidation.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        res.status(200).json({ message: "Invoice Edited Successfully!" });
    }
    catch (_a) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = router;
