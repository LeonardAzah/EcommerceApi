require("dotenv").config();
require("express-async-errors");
const express = require("express");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("e-commerce api");
});

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3500;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Connected to port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
