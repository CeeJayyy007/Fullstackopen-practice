const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// connect to mongodb databse
const url = config.MONGODB_URI;

logger.info("connecting to", url);

// connect to db
mongoose
  .connect(url)
  // eslint-disable-next-line no-unused-vars
  .then((result) => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

// allow requests from any origin
app.use(cors());

app.use(express.json());

app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint);

// use error handler middleware
app.use(middleware.errorHandler);

module.exports = app;
