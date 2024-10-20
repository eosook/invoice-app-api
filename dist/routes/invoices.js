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
const knexfile_js_1 = __importDefault(require("../knexfile.js"));
const router = express_1.default.Router();
const knex = (0, knex_1.default)(knexfile_js_1.default);
router.get('/', (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoiceList = yield knex("invoices");
        response.json(invoiceList);
        console.log(response);
    }
    catch (error) {
        return error;
    }
}));
router.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    console.log(id);
    try {
        const invoiceInfo = yield knex("invoices").where("id", id);
        response.json(invoiceInfo);
    }
    catch (error) {
        return error;
    }
}));
exports.default = router;
