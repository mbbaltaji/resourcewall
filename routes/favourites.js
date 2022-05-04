const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const query = `
    SELECT * FROM resources
    JOIN resource_likes ON resources.id = resource_id
    WHERE resource_likes.user_id = $1
    AND liked IS TRUE`;

    db.query(query, [req.cookies.user_id])
    .then((data) => {
      const favourites = data.rows;
      res.json({ favourites });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  })
  return router;
}
