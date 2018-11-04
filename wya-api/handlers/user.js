let {
    User
} = require('../models');

/**
 * Find an user on the database
 * @param {*} id - user id
 */
let findById = async function (id) {
    try {
        return await User.findById(id);
    } catch (err) {
        throw `Could not find userID ${id}`;
    }
};

/**
 * Returns all users in the database
 */
let getAll = async function () {
    try {
        let allUsers = await User.findAll();
        return allUsers;
    } catch (err) {
        console.log("error is: " + err)
        throw `unable to retrieve all users`
    }
};

/**
 * Creates an user on the database
 * @param {*} params - key value pair mirroring user model
 */
let create = async function (params) {
    try{
        let user = await findByUsername(params.username)
        if(user){
            throw {message: "Not an unique user"}
        }
        else{
            await User.create(params)
            return
        }
        
    }catch(error){
        throw {message: error.message || `Unable to create user ${params.username}`}
    }
}

/**
 * Used to delete all users
 * @param {*} params 
 */
let deleteAll = async function(){
    try{
        await User.destroy({where: {}})
        return
    }catch(error){
        throw {message: "Unable to delete all rooms"}
    }
}

/**
 * Find an user with a given param
 * @param {*} param - {field: value}
 */
let findByUsername = async function (username) {
    try {
        return await User.findOne({
            where: {
                username
            }
        });
    } catch (err) {
        // console.log(err)
        throw `error finding users with username ${username}`
    }
};

module.exports = {
    findById,
    getAll,
    create,
    deleteAll,
    findByUsername
}