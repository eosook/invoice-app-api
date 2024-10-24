import express, { Request, Response } from "express";
import initKnex from "knex";
import config from "../knexfile";
import Router = require("express");

const router = express.Router();
const knex = initKnex(config);

function aliasColumns(tableName: string, columns: string[]) {
  return columns.map(
    (column) => `${tableName}.${column} as ${tableName}_${column}`
  );
}

const addressColumns = ["street", "city", "postCode", "country"];

router.get("/", async (_request: Request, response: Response) => {
  try {
    const invoiceList = await knex("invoices");
    response.json(invoiceList);
  } catch (error: any) {
    return error;
  }
});

router.get("/:id", async (request: Request, response: Response) => {
  const id = request.params.id;
  try {
    const invoiceInfo = await knex("invoices")
      .join("senderaddress", "invoices.senderAddress_id", "senderaddress.id")
      .join("clientaddress", "invoices.clientAddress_id", "clientaddress.id")
      .where("invoices.invoiceId", id)
      .select(
        "invoices.*",
        ...aliasColumns("senderaddress", addressColumns),
        ...aliasColumns("clientaddress", addressColumns)
      );
    response.json(invoiceInfo);
  } catch (error: any) {
    return error;
  }
});

export default router;
