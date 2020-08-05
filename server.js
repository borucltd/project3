const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const routes = require("./routes");
const passport = require("./passport/setup");
const cookieParser = require("cookie-parser");



const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/itt"


// Connect to the Mongo DB
mongoose
  .connect(MONGODB_URI)
  .then(console.log(`Connected to MongoDB ${MONGODB_URI}`))


// Setting app express
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express sessions will be stored in mongo sessions collection in itt database
app.use(
  session({
    secret: "whatever",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
  })
);
app.use(cookieParser("whatever"));
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both frontend and backend
app.use(routes);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
