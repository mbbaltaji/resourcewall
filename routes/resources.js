const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    console.log('query: ', req.body.searchQuery);
    let query = `SELECT * FROM resources`;
    console.log(query);
    db.query(query)
      .then(data => {
        const resources = data.rows;
        res.json({ resources });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    // query to find resources by title
    let query = `SELECT * FROM resources WHERE title LIKE $1`;
    // req.body.searchQuery contains the value from the search input field
    db.query(query, [req.body.searchQuery])
      .then(data => {
        const resources = data.rows;
        res.json({ resources });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
