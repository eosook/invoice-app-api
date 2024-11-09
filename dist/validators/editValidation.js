"use strict";
const Joi = require("joi");
const editValidation = Joi.object({
    id: Joi.number().integer().required(),
    invoiceId: Joi.string().required(),
    createdAt: Joi.date().required(),
    paymentDue: Joi.date().required(),
    description: Joi.string().required(),
    paymentTerms: Joi.number().integer().required(),
    status: Joi.string().valid("pending", "paid", "draft").required(), // adapt based on allowed statuses
    total: Joi.number().min(0).required(),
    senderAddress_id: Joi.number().integer().required(),
    clientAddress_id: Joi.number().integer().required(),
    clientName: Joi.string().required(),
    clientEmail: Joi.string().email().required(),
    clientaddress_city: Joi.string().required(),
    clientaddress_country: Joi.string().required(),
    clientaddress_postCode: Joi.string().required(),
    clientaddress_street: Joi.string().required(),
    senderaddress_city: Joi.string().required(),
    senderaddress_country: Joi.string().required(),
    senderaddress_postCode: Joi.string().required(),
    senderaddress_street: Joi.string().required(),
});
module.exports = editValidation;
