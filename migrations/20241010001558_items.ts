import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("items", (table) => {
        table.increments("id").primary();
        table.integer("invoiceId").notNullable();
        table.string("name").notNullable();
        table.integer("quantity").notNullable();
        table.integer("price").notNullable();
        table.integer("total").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
}

