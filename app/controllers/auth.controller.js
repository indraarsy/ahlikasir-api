const db = require("../models");
const config = require("../config/auth.config.js");
const Users = db.users;
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.login = (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    };

    const saltRounds = 8;
    const salt = bcrypt.genSaltSync(saltRounds);

    Users.findOne({where: {username: user.username}})
        .then(data => {
            const decrypt = bcrypt.compareSync(user.password, data.password);
            if(decrypt == true){

                var token = jwt.sign({
					id: data.id
				}, config.JWTSECRET, {
					expiresIn: 86400 //24h expired
                });

                res.cookie('token', token, { httpOnly: true });

                res.json({
                    status: 'ok',
                    accessToken: token
                })
            }
        })
        .catch(err => {
            res.send({
                message: "Something went wrong!"
            });
        })
}

exports.getUser = (req, res) => {
    const id = req.userId;

    Users.findByPk(id)
        .then(data => {
            res.json({
                data:{
                    id: data.id,
                    username: data.username,
                    name: data.name
                }
            })
        })
        .catch(err => {
            res.status(500).send({
            message: "Error"
        });
    });
}