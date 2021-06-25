var express = require("express");
var logger = require("morgan");
var cookie = require("cookie-parser");
var session = require("express-session");
var myLogger = require("./middlewares/logger");
var cookieTracker = require("./middlewares/cookietracker");

// Include all routes
var classRouter = require("./routes/classes");

// Create Express instance
var app = express();

// Middlewares
app.use(myLogger);
app.use(logger("dev"));
app.use(cookie());
app.use(cookieTracker);
app.use(session({ secret: "s3cre7", resave: false, saveUninitialized: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Registering routes
app.use("/", classRouter);

// 404 Handler
app.use(function (req, res, next) {
	next({status: 404, message: "Not Found"}); // {status: 404, message: "Not Found"}
});

// error handler
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.send({ msg: err.message || "error" });
});

module.exports = app;
