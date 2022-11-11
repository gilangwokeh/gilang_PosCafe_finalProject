const cors = require('cors');
const exprees = require('express');
const body = require("body-parser");
const { connect } = require('mongoose');
const { success, error } = require("consola")
import cookieParser from "cookie-parser";
import Config from "./config";
const app = exprees();
app.use(cors());

app.use(body.json());
app.use(cookieParser());

app.use("/api/users", require('./routes/users'))
const startApp = async () => {
  try {
    await connect(Config.DB_mongodb, { useUnifiedTopology: true, useNewUrlParser: true })
      .then(() => success({ message: `Successfully connection with the database \n ${Config.DB_mongodb}`, badge: true }))
  } catch (error) {
    ((error: any) => error({ message: `unable to connection the database  \n ${error}`, badge: true }))
  }
}
startApp();
app.listen(Config.PORT, () => success({ message: `server started server on port ${Config.PORT}`, badge: true }))

export default startApp