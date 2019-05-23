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

// find user by ID
server.get("/api/users/:id", (req, res) => {
  db.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json({ success: true, user });
      } else {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        error: "The user information could not be retrieved.",
        error
      });
    });
});

// POST ========================== POST =========================== POST ============================== POST
// create new user
// server.post("/api/users", (req, res) => {
//   const userInfo = req.body;

//   db.insert(userInfo)
//     .then(user => {
//       if (!user.name || !user.bio) {
//         res
//           .status(400)
//           .json({ errorMessage: "Please provide name and bio for the user." })
//           .end();
//       } else {
//         res.status(201).json({ success: true, user });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({
//         success: false,
//         error: "There was an error while saving the user to the database",
//         error
//       });
//     });
// });

server.post("/api/users", (req, res) => {
  const userInfo = req.body;

  if (!userInfo.name || !userInfo.bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
  } else {
    db.insert(userInfo)
      .then(user => {
        res.status(201).json({ success: true, user });
      })
      .catch(error => {
        res.status(500).json({
          success: false,
          error: "There was an error while saving the user to the database",
          error
        });
      });
  }
});

// PUT ============================= PUT ========================== PUT =========================== PUT
// server.put("/api/users/:id", (req, res) => {
//     const { id } = req.params;
//     const changes = req.body;

//     db.update(id, changes)
//     .then(updated => {
//         if(updated) {
//             res.status(200).json({ success: true, updated });
//         } else if {

//         }
//     })
// })

// DELETE ===================== DELETE ========================== DELETE ========================== DELETE
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).json({
          success: true
        });
      } else {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        error: "The user could not be removed",
        error
      });
    });
});

server.listen(4000, () => {
  console.log(`\n***Server is Running on Port 4000***\n`);
});
