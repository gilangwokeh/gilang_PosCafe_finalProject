const { connect } = require('mongoose');
import getProductController from "./models/product";
import product from "./utils/data"
const { success, error } = require("consola")
import Config from "./config";
//for input to the database mongoose
const startApp = async () => {
  try {
    await connect(Config.DB_mongodb, { useUnifiedTopology: true, useNewUrlParser: true })
      .then(() => success({ message: `Successfully connection with the database \n ${Config.DB_mongodb}`, badge: true }))

  } catch (error) {
    ((error: any) => error({ message: `unable to connection the database  \n ${error}`, badge: true }))
  }
}
startApp()

const importData = async () => {
  try {
    // await getProductController.deleteMany()
    await getProductController.insertMany(product)
    console.log('insert succesFully')
    process.exit()
  } catch (error) {
    console.log('error')
    process.exit()
  }
}

importData();