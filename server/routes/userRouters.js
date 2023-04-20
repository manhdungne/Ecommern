const router = require("express").Router();
const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Comment = require("../models/Comment");

// Sign Up
router.post("/signup", async (req, res) => {
  const { name, email, password, age, mobile, location } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
      age,
      mobile,
      location,
    });
    res.json(user);
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).send("Email already exists");
    res.status(400).send(error.message);
  }
});

// Log in
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).send("Please enter email and password");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("This credential doesnt exists");
    }
    const validate = await user.comparePassword(password);
    if (!validate) {
      return res.status(400).send("Wrong password");
    }
    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get a user
router.get("/", async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).populate("orders");
    res.json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id/orders", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("orders");
    res.json(user.orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/editUser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        name: req?.body?.name,
        age: req?.body?.age,
        location: req?.body?.location,
        mobile: req?.body?.mobile,
      },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/change-password/:id", async (req, res) => {
  const { id } = req.params;
  const {password} = req.body
  try {
      const user = await User.findById(id);
      user.password = password;
      user.save()
    res.status(200).json(user);

  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
