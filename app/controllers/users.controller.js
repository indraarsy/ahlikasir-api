const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");

// Create User
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name || !req.body.username || !req.body.password) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		return;
	}

	// Encrypt Password
	const saltRounds = 8;
	const salt = bcrypt.genSaltSync(saltRounds);

	// Create a User
	const user = {
		name: req.body.name,
		address: req.body.address,
		phone: req.body.phone,
		email: req.body.email,
		role: req.body.role,
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, salt),
	};

	// Save Tutorial in the database
	Users.create(user)
		.then((data) => {
			res.json({
				status: "success",
				message: "User telah dibuat",
			});
		})
		.catch((err) => {
			res.json({
				status: "error",
				message: err.message || "Something went wrong!",
			});
		});
};

// Get all users
exports.findAll = (req, res) => {
	Users.findAll({ attributes: ["name", "address", "phone", "email"] })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving users.",
			});
		});
};

// Find User by Id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Users.findByPk(id)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error retrieving Tutorial with id=" + id,
			});
		});
};

// Find User Active
exports.findActive = (req, res) => {
	Users.findAll({ where: { role: 1 } })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error retrieving Tutorial with id=" + id,
			});
		});
};

// Update User
exports.update = (req, res) => {
	const id = req.params.id;

	Users.update(req.body, { where: { id: id } })
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "User was updated successfully.",
				});
			} else {
				res.send({
					message: `Something went wrong!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error updating Tutorial with id=" + id,
			});
		});
};

// Delete users
exports.delete = (req, res) => {
	const id = req.params.id;

	Users.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "User was deleted successfully!",
				});
			} else {
				res.send({
					message: `Something went wrong!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Could not delete Tutorial with id=" + id,
			});
		});
};
