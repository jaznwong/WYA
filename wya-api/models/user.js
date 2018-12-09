const bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        firstname: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING
        },
        interests: {
              type: DataTypes.ARRAY(DataTypes.STRING),
              allowNull: true
        },
        availability: {
            type: DataTypes.JSON,
            allowNull: true
        }
    })

    User.prototype.validPassword = async function (password) {
        try {
            let isMatch = await bcrypt.compareSync(password, this.password);
            return isMatch ? this : false
        } catch (err) {
            throw `Incorrect Password`
        }
    };

    User.beforeCreate((user) =>
        new sequelize.Promise((resolve) => {
            bcrypt.hash(user.password, null, null, (err, hashedPassword) => {
                resolve(hashedPassword);
            });
        }).then((hashedPw) => {
            user.password = hashedPw;
        })
    );

    return User;
}
