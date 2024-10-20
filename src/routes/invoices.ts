import express, {Request, Response} from "express";
import initKnex from "knex";
import config from '../knexfile.js'
import Router = require("express");

const router = express.Router();
const knex = initKnex(config);

router.get('/', async (_request : Request, response: Response) => {
  try {
    const invoiceList = await knex("invoices");
    response.json(invoiceList);
    console.log(response);
  } catch (error: any) {
    return error;
  }
});

router.get('/:id', async (request: Request, response: Response) => {
  const id = request.params.id;
  console.log(id);
  try {
    const invoiceInfo = await knex("invoices").where("id", id);
    response.json(invoiceInfo);
  } catch (error: any) {
    return error;
  }
})

export default router;