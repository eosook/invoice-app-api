import express, {Request, Response} from "express";
import initKnex from "knex";

const config = require('../knexfile.ts');

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

export default router;