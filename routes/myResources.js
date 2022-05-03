const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const query = `
    SELECT * FROM resources
    WHERE user_id = $1
    `;
    db.query(query, [req.cookies.user_id])
      .then((data) => {
        const resources = data.rows;
        res.json({ resources });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
