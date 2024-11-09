import express, { Request, Response } from "express";
import initKnex from "knex";
import config from "../knexfile";
import Router = require("express");
import { InvoiceInfo } from "../types/invoiceInfo";

interface InvoiceRequest extends Request {
  body: InvoiceInfo
}

const router = express.Router();
const knex = initKnex(config);

const editValidation = require('../validators/editValidation');

function aliasColumns(tableName: string, columns: string[]) {
  return columns.map(
    (column) => `${tableName}.${column} as ${tableName}_${column}`
  );
}

const addressColumns = ["street", "city", "postCode", "country"];

router.get("/", async (_req: Request, res: Response) => {
  try {
    const invoiceList = await knex("invoices");
    res.json(invoiceList);
  } catch (error: any) {
    return error;
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
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
    res.json(invoiceInfo);
  } catch (error: any) {
    return error;
  }
});

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

router.put("/:id/edit", jsonParser, async (req: InvoiceRequest, res: Response) => {
  const invoiceId = req.params.id;
  const postData = req.body;
  const {error, value} = editValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  try {
    res.status(200).json({ message: "Invoice Edited Successfully!"})
  } catch {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



export default router;
