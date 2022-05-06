/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("request", req.cookies.user_id);
    const query = `
    SELECT * FROM users
    WHERE users.id = $1
    `;
    db.query(query, [req.cookies.user_id])
      .then((data) => {
        const users = data.rows[0];
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
