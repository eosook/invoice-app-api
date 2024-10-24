import express, { Request, Response } from "express";
import initKnex from "knex";
import config from "../knexfile";
import Router = require("express");

const router = express.Router();
const knex = initKnex(config);

router.get("/:invoiceId", async (request: Request, response: Response) => {
    const invoiceId = request.params.invoiceId;
    try{
        const items = await knex("items")
            .where("items.invoiceId", invoiceId)
        response.json(items);
    } catch(error:any) {
        return error;
    }
})

export default router;