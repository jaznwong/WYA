const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
    const Users = sequelize.define('Users', {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    })

    Users.prototype.validPassword = async function(password) {
        try {
          let isMatch = await bcrypt.compare(password, this.password);
          return isMatch ? this : false
        } catch (err) {
          throw `Password doesn't match`
        }
      };

    Users.beforeCreate(async function(user, option){
        try{
            user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(8))
        }catch(err){
            throw `Error hashing password`
        }
    })

    return Users;
}