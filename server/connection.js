require("dotenv").config();

const mongoose = require("mongoose");

const connectionStr = `mongodb+srv://registry:registry@cluster0.6ut2hw1.mongodb.net/Ecommern`;

mongoose
  .connect(connectionStr, { useNewUrlparser: true })
  .then(() => console.log("connected to mongod"))
  .catch((err) => console.log(err));


  mongoose.connection.on('error', err => {
    console.log(err)
  })