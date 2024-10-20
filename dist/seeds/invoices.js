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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const fs = require("fs");
const path = require("path");
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data.json'), 'utf8'));
        yield knex("senderaddress").del();
        yield knex("clientaddress").del();
        yield knex("invoices").del();
        yield knex("items").del();
        for (const invoice of data) {
            const [senderAddressId] = yield knex("senderaddress")
                .insert({
                street: invoice.senderAddress.street,
                city: invoice.senderAddress.city,
                postCode: invoice.senderAddress.postCode,
                country: invoice.senderAddress.country,
            })
                .returning("id");
            const [clientAddressId] = yield knex("clientaddress")
                .insert({
                street: invoice.clientAddress.street,
                city: invoice.clientAddress.city,
                postCode: invoice.clientAddress.postCode,
                country: invoice.clientAddress.country,
            })
                .returning("id");
            yield knex('invoices').insert({
                invoiceID: invoice.invoiceId,
                createdAt: invoice.createdAt,
                paymentDue: invoice.paymentDue,
                description: invoice.description,
                paymentTerms: invoice.paymentTerms,
                clientName: invoice.clientName,
                clientEmail: invoice.clientEmail,
                status: invoice.status,
                senderAddress_Id: senderAddressId,
                clientAddress_Id: clientAddressId,
                total: invoice.total,
            });
            for (const item of invoice.items) {
                yield knex('items').insert({
                    invoiceId: invoice.invoiceId,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    total: item.total,
                });
            }
        }
    });
}
