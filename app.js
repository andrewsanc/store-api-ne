require("dotenv").config();

// Async Errors

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// Middleware
app.use(express.json());

// Rootes

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Product Routes</a>');
});

// Product Routes

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);

    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

// Invoke starting our server
start();
