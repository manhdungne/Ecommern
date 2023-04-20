const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "is required"],
    },
    age: {
      type: String,
    },
    location: {
      type: String,
    },
    mobile: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "is required"],
      unique: true,
      index: true,
      validate: {
        validator: function (str) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    password: {
      type: String,
      required: [true, "is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Object,
      default: {
        total: 0,
        count: 0,
      },
    },
    notifications: {
      type: Array,
      default: [],
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  {
    minimize: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

userSchema.pre("remove", function (next) {
  this.model("Order").remove({ owner: this_id }, next);
});

//Export the model
module.exports = mongoose.model("User", userSchema);
