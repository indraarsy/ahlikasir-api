const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");

verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    
    const split = token.split(' ');
    
    jwt.verify(split[1], config.JWTSECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const authJwt = {
    verifyToken: verifyToken
}

module.exports = authJwt;