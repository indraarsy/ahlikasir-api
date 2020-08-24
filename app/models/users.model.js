module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        address: {
            type: Sequelize.STRING(100)
        },
        phone: {
            type: Sequelize.STRING(20)
        },
        email: {
            type: Sequelize.STRING(50),
            validate: {
                isEmail:true
            },
            unique: {
                args: true,
                msg: 'Email address already in use!'
            }
        },
        role:{
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        username: {
            type: Sequelize.STRING(50),
            unique: {
                args: true,
                msg: 'Username already exist!'
            },
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
    });
  
    return Users;
};