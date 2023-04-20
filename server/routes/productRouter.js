const router = require("express").Router();
const Product = require("../models/Product");
const User = require("../models/User");
const Comment = require("../models/Comment");

router.get("/", async (req, res) => {
  try {
    const findProduct = await Product.find();
    res.status(200).json(findProduct);
  } catch (error) {
    res.status(400).send(e.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, price, category, images: pictures } = req.body;
    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      pictures,
    });
    const products = await Product.find();
    res.status(201).json(products);
  } catch (error) {
    res.status(400).send(e.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  try {
    const findUser = await User.findById(user_id);
    if (!findUser.isAdmin) {
      return res.status(401).json("You aren't the ADMIN");
    }
    await Product.findByIdAndDelete(id);
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).send(e.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name: req?.body?.name, description: req?.body?.description, price: req?.body?.price, category:req?.body?.category, pictures: req?.body?.pictures },
      { new: true }
    );
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    const similar = await Product.find({
      category: product.category,
    }).limit(5);
    const comment = await Comment.find({
      product: id
    }).populate('owner')
    res.status(200).json({ product, similar, comment });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    let products;
    const sort = { _id: -1 };
    if (category == "all") {
      products = await Product.find().sort(sort);
    } else {
      products = await Product.find({ category }).sort(sort);
    }
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/add-to-cart", async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    if (user.cart[productId]) {
      userCart[productId] += 1;
    } else {
      userCart[productId] = 1;
    }
    userCart.count += 1;
    userCart.total = Number(userCart.total) + Number(price);
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(e.message);
  }
});

router.post("/increase-cart", async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total += Number(price);
    userCart.count += 1;
    userCart[productId] += 1;
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(e.message);
  }
});

router.post("/decrease-cart", async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(price);
    userCart.count -= 1;
    userCart[productId] -= 1;
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(e.message);
  }
});

router.post("/remove-from-cart", async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(userCart[productId]) * Number(price);
    userCart.count -= userCart[productId];
    delete userCart[productId];
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(e.message);
  }
});

router.post("/comment/:id", async (req, res) => {
  const { id } = req.params;
  const {user_id, comment} = req.body

  try {
    const user = await User.findById(user_id);
    const newComment = await Comment.create({
      owner: user,
      product: id,
      content: comment
    });
    const product = await Product.findById(id);
    product.comments.push(newComment);
    await product.save();
    res.json(newComment);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
