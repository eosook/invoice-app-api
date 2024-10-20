const express = require("express");
const cors = require("cors");
require('dotenv').config({ path: __dirname+'/.env'});

import invoices from './routes/invoices';

const app = express();
const PORT = process.env.PORT || 8080
console.log(process.env.PORT);

app.use(cors());

app.use("/invoices", invoices);

app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT} `);
  });