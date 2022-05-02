const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const query = `
      INSERT  INTO resources
      (user_id, url, title, description, category)
      VALUES
      ( $1, $2, $3, $4, $5)
      RETURNING*`;

      db.query(query, [req.body.user_id, req.body.url, req.body.title, req.body.description, req.body.category])
        .then(data => {
          const resources = data.rows[0];
          res.json({ resources });
        })
        .catch(err => {
          res.status(500).json({ error: err.message });
        });
  });
  return router;
}
