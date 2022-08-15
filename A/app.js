const express = require("express");
const fs = require("fs");
const moment = require("moment");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// 1. MIDDLEWARES
app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from middleware!!!");
  next();
});

app.use((req, res, next) => {
  // req.requestTime = moment(new Date().toISOString()).format(
  //   "DD/MM/YYYY | HH:mm:ss"
  // );
  req.requestTime = moment();
  next();
});

// 2. ROUTE HANDLER

// const tag = {
//   name: "hehehehe",
//   callback1: (name) => {
//     console.log(name);
//   },
//   callback() {
//     console.log(this.name);
//   },
// };

// tag.callback1(tag.name);
// tag.callback();

// 3. ROUTES

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// 4. SERVER

module.exports = app;
