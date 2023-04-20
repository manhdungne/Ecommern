const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
  products: {
    type: Object,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  status: {
    type: String,
    default: "processing",
  },
  total: {
    type: Number,
    default: 0,
  },
  count: {
    type: Number,
    default: 0,
  },
  date: {
    type: String,
    default: new Date().toISOString().split('T')[0]
  }, 
  address: {
    type: String,
  },
  country: {
    type: String
  }
}, {
    minimize: true
});

//Export the model
module.exports = mongoose.model("Order", orderSchema);
