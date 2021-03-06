// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require('cookie-parser');


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const resourceRoutes = require("./routes/resources");
const categoryRoutes = require("./routes/category");
const addResource = require("./routes/addResource");
const myResources = require("./routes/myResources");
const favourites = require("./routes/favourites");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/resources", resourceRoutes(db));
app.use("/api/category", categoryRoutes(db));
app.use("/api/addresource", addResource(db));
app.use("/api/myresources", myResources(db));
app.use("/api/favourites", favourites(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/resources", (req, res) => {
  const user_id = req.cookies.user_id;
  const username = req.cookies.username;
  res.render("resources", { user: username });

});

app.get("/login/:user_id", (req, res) => {
  const id = req.params.user_id;

  dbQuery= `
  SELECT name FROM users
  WHERE id = $1
  `;

  db.query(dbQuery, [id])
  .then(data => {
    if(data.rows.length > 0) {
      res.cookie('user_id', id);
      const user = data.rows[0];
      res.cookie('username', user.name);
      res.render('resources', {user: user.name, user_id: id});
    }
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);

});
