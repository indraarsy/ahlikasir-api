module.exports = app => {
    const { authJwt } = require("../middlewares");
    const auth = require("../controllers/auth.controller.js");
    var router = require("express").Router();

    router.post('/login', auth.login)
    router.get('/user', authJwt.verifyToken, auth.getUser)

    app.use('/api/auth', router);
}