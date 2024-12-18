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
router.get("/:invoiceId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const invoiceId = req.params.invoiceId;
    try {
        const items = yield knex("items")
            .where("items.invoiceId", invoiceId);
        res.json(items);
    }
    catch (error) {
        return error;
    }
}));
exports.default = router;
