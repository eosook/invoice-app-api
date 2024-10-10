import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("senderAddress", (table) => {
        table.increments("id").primary();
        table.string("street").notNullable();
        table.string("city").notNullable();
        table.string("postCode").notNullable();
        table.string("country").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
}

