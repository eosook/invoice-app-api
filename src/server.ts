const express = require("express");
const cors = require("cors");
require('dotenv').config({ path: __dirname+'/.env'});

import invoices from './routes/invoices';
import items from './routes/items';

const app = express();
const PORT = process.env.PORT || 8080

app.use(cors());

app.use("/invoices", invoices);
app.use("/items", items);

app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT} `);
  });