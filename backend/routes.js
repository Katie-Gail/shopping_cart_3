// require the Express module
const express = require("express");

//creates a new router object
const cartRoutes = express.Router();
const pool = require("./connection");

// keep track of next ID. this will increment each time an item is added.
// let nextId = 4;

cartRoutes.get("/cart-items", (req, res) => {
  // .json sends response as JSON
  // res.status(200).json(items); //note: defaults to 200 if request has succeeded.
  pool.query("select * from shopping_cart order by id desc").then((result) => {
    // console.log(result);
    res.json(result.rows);
  });
});

// route
cartRoutes.get("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // Find by ID
  const item = items.find((item) => item.id === id);
  if (item) {
    res.status(200).json(item);
  } else {
    // Set response code to 404
    res.status(404);
    res.send(`ID ${id} Not Found`);
  }
});

// route
cartRoutes.post("/cart-items", (req, res) => {
  pool
    .query(
      "insert into shopping_cart(product,price,quantity) values($1::text,$2::money,$3::int)",
      [req.body.product, req.body.price, req.body.quantity]
    )
    .then(() => {
      res.json(req.body);
    });
});

// route
cartRoutes.put("/cart-items/:id", (req, res) => {
  pool
    .query("update shopping_cart set quantity=$1::int where id=$2::int", [
      req.body.quantity,
      req.params.id,
    ])
    .then(() => {
      res.json(req.body);
    });
});

// route
cartRoutes.delete("/cart-items/:id", (req, res) => {
  pool
    .query("delete from shopping_cart where id=$1::int", [req.params.id])
    .then(() => {
      res.sendStatus(204);
    });
});

module.exports = { cartRoutes };
