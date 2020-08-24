process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./app/models");
// Force ketika ada update di kolom dan hapus semua data
// db.sequelize.sync({force: true}).then(() => {
//     console.log("DB Konek");
// });

db.sequelize.sync().then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});

// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hello 😁" });
});

// set port, listen for requests
require("./app/routes/tutorial.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);