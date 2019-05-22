// implement your API here
const express = require("express"); // equilvalent to importing express
const db = require("./data/db.js"); // get functions used in database

const server = express(); // give server all express capabilities
server.use(express.json()); // this is required to send and receive JSON

// GET ============================ GET ============================= GET =============================== GET
// return array of all user objects
server.get("/api/users", (req, res) => {
  db.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved", error });
    });
});

// POST ========================== POST =========================== POST ============================== POST
server.post("/api/users", (req, res) => {
  const userInfo = req.body;

  db.insert(userInfo)
    .then(user => {
      if (!userInfo) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." })
          .end();
      } else {
        res.status(201).json({ success: true, user });
      }
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        error: "There was an error while saving the user to the database",
        error
      });
    });
});

server.listen(4000, () => {
  console.log(`\n***Server is Running on Port 4000***\n`);
});
