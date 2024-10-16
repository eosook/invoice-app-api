import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("invoices", (table) => {
        table.increments("id").primary();
        table.string("invoiceId").notNullable().defaultTo("N/A");
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
}


export async function down(knex: Knex): Promise<void> {
}

