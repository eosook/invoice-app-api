import { Knex } from "knex";

const fs = require("fs");
const path = require("path");

export async function seed(knex: Knex): Promise<void> {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data.json'), 'utf8'));

  await knex("senderaddress").del();
  await knex("clientaddress").del();
  await knex("invoices").del();
  await knex("items").del();

  for (const invoice of data){
    const [senderAddressId] = await knex("senderaddress")
    .insert({
      street: invoice.senderAddress.street,
      city: invoice.senderAddress.city,
      postCode: invoice.senderAddress.postCode,
      country: invoice.senderAddress.country,
    })
    .returning("id");

    const [clientAddressId] = await knex("clientaddress")
    .insert({
      street: invoice.clientAddress.street,
      city: invoice.clientAddress.city,
      postCode: invoice.clientAddress.postCode,
      country: invoice.clientAddress.country,
    })
    .returning("id");

    await knex('invoices').insert({
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
      await knex('items').insert({
        invoiceId: invoice.invoiceId, 
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      });
    }
  }
}
