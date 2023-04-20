const express = require("express");
const app = express();
const http = require("http");
require("dotenv").config();
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
require("./connection");
const io = new Server(server, {
  cors: "http://localhost:3000",
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
});

const User = require("./models/User");
const userRoutes = require("./routes/userRouters");
const productRoutes = require("./routes/productRouter");
const orderRoutes = require("./routes/orderRouter");
const imagesRoutes = require("./routes/imageRouter");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/images", imagesRoutes);

app.post("/create-payment", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.status(200).json(paymentIntent);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

server.listen(8080, () => {
  console.log(`server running at port`, 8080);
});


app.set('socketio', io)