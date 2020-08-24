module.exports = app => {
    const { authJwt } = require("../middlewares");
    const users = require("../controllers/users.controller.js");
  
    var router = require("express").Router();

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create a new Tutorial
    router.post("/", users.create);
  
    // Retrieve all users
    router.get("/", authJwt.verifyToken, users.findAll);
  
    // // Retrieve all published users
    router.get("/active", users.findActive);
  
    // // Retrieve a single Tutorial with id
    router.get("/:id", users.findOne);
  
    // // Update a Tutorial with id
    router.put("/:id", users.update);
  
    // // Delete a Tutorial with id
    router.delete("/:id", users.delete);
  
    // // Create a new Tutorial
    // router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
};