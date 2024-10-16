const express = require("express");
require('dotenv').config({ path: __dirname+'/.env'});

import invoices from './routes/invoices';

const app = express();
const PORT = process.env.PORT || 8080

app.use("/invoices", invoices);

app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT} `);
  });