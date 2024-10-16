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
const knexfile_ts_1 = __importDefault(require("../knexfile.js"));
const router = express_1.default.Router();
const knex = (0, knex_1.default)(knexfile_ts_1.default);
router.route("/").get((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoiceList = yield knex("invoices");
        res.json(invoiceList);
        console.log(res);
    }
    catch (_a) {
        return res.status(500).send("Error getting inventories");
    }
}));
exports.default = router;
