let { Room } = require("../models");
const Sequelize = require("sequelize");
/**
 * Find an Room on the database
 * @param {*} id - Room id
 */
let findById = async function(id) {
  try {
    let room = await Room.findById(id);
    if (room) return room;
    else throw `Could not find RoomID ${id}`;
  } catch (err) {
    throw `Could not find RoomID ${id}`;
  }
};

/**
 * Returns all Rooms in the database
 */
let getAll = async function() {
  try {
    let allRooms = await Room.findAll();
    return allRooms;
  } catch (err) {
    console.log("error is: " + err);
    throw `unable to retrieve all Rooms`;
  }
};

/**
 * Creates an Room on the database
 * @param {*} params - key value pair mirroring Room model
 */
let create = async function(params) {
  try {
    let room = await searchRoom(params.roomname);
    // console.log(room)
    if (room.length != 0) {
      throw { message: "Not an unique Room" };
    } else {
      return await Room.create(params);
    }
  } catch (error) {
    throw {
      message: error.message || `Unable to create Room ${params.Roomname}`
    };
  }
};

/**
 * Used to delete all Rooms
 * @param {*} params
 */
let deleteAll = async function() {
  try {
    await Room.destroy({ where: {} });
    return;
  } catch (error) {
    throw { message: "Unable to delete all rooms" };
  }
};

let deleteById = async function(roomId) {
  try {
    await Room.destroy({ where: { id: roomId } });
    return;
  } catch (error) {
    throw { message: `Unable to delete room of id ${roomId}` };
  }
};

/**
 * Find an Room with a given param
 * @param {*} param - {field: value}
 */
let findByRoomname = async function(roomname) {
  try {
    return Room.findAll({
      where: {
        roomname: { [Sequelize.Op.like]: `%${roomname}%` }
      }
    });
  } catch (err) {
    console.log(err);
    throw `error finding Rooms with Roomname ${roomname}`;
  }
};

let searchRoom = async function(roomname) {
  try {
    return Room.findAll({
      where: {
        roomname: roomname
      }
    });
  } catch (err) {
    console.log(err);
    throw `error finding Rooms with Roomname ${roomname}`;
  }
};

let addUser = async function(room, user) {
  /*
  TODO: Update RoomInterest, RoomAvailability Models to keep track of user interests/availability
  */
  try {
    await room.addUser(user.id);
    return room;
  } catch (err) {
    throw err;
  }
};

let getUsers = async function(room) {
  try {
    return await room.getUsers();
  } catch (err) {
    throw err;
  }
};

let isUserInRoom = async function(room, userId) {
  try {
    let roomUsers = await room.getUsers({ where: { id: userId } });
    return roomUsers.length;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  findById,
  findByRoomname,
  getAll,
  create,
  deleteAll,
  addUser,
  getUsers,
  isUserInRoom,
  deleteById
};
