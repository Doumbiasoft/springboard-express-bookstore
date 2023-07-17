/** Express app for bookstore. */


const express = require("express");
const app = express();

app.use(express.json());

const ExpressError = require("./expressError")
const bookRoutes = require("./routes/books");

app.use("/books", bookRoutes);

/** 404 handler */

app.use((req, res, next) =>{
  const err = new ExpressError("Not Found", 404);
  return next(err);
});


/** general error handler */

app.use((err, req, res, next)=> {
  const status = err.status || 500;
  const message = err.message

  return res.json({
    error: status,
    message: message
  });
});


module.exports = app;
