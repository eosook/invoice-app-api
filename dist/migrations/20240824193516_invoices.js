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
exports.up = up;
exports.down = down;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable("invoices", (table) => {
            table.increments("id").primary();
            table.string("invoiceId").notNullable().defaultTo(1);
            table.string("createdAt").notNullable();
            table.string("paymentDue").notNullable();
            table.string("description").notNullable();
            table.integer("paymentTerms").notNullable();
            table.string("clientName").notNullable();
            table.string("clientEmail").notNullable();
            table.string("status").notNullable();
            table.string("total").notNullable();
            table
                .integer("senderAddress_id")
                .unsigned()
                .references("senderAddress.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table
                .integer("clientAddress_id")
                .unsigned()
                .references("clientAddress.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
