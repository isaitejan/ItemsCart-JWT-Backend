require('dotenv').config();

const express = require("express");
const app = express();
const reqlog = require('./utilities/requestLogger.js');
const errlog = require('./utilities/errorLogger.js');
const bodyparser = require('body-parser');
const router = require('./routes/api-router.js');
const user = require('./routes/user-router.js');
const db = require('./utilities/databaseConnection.js');
const cors = require('cors');

app.use(cors());
app.use(bodyparser.json());

app.use(reqlog);

app.use("/api/user",user);
app.use("/api/items",router);

app.use(errlog);

app.listen(process.env.PORT,()=>{
    console.log("Server started listening at",process.env.PORT);
})