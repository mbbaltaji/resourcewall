const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    let query = 'SELECT * FROM resources WHERE category = $1';

    db.query(query, [req.body.searchQuery])
      .then(data => {
        const resources = data.rows;
        res.json({ resources });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
}
