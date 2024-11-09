import express, { Request, Response } from "express";
import initKnex from "knex";
import config from "../knexfile";
import Router = require("express");

const router = express.Router();
const knex = initKnex(config);

router.get("/:invoiceId", async (req: Request, res: Response) => {
    const invoiceId = req.params.invoiceId;
    try{
        const items = await knex("items")
            .where("items.invoiceId", invoiceId)
        res.json(items);
    } catch(error:any) {
        return error;
    }
})

export default router;