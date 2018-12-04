let {
    Vote,
    User,
    Room
} = require('../models');

/**
 * Find an Vote on the database
 * @param {*} id - Vote id
 */
let findVote = async function (userId, roomId) {
    try {
        let vote = await Vote.findOne({
            where: {
                UserId: userId,
                RoomId: roomId
            },
            include:[
                {model: User},
                {model: Room}
            ]
        });
        if (vote) return vote
        else throw `Could not find Vote`;
    } catch (err) {
        throw `Could not find Vote`;
    }
};

let findVotes = async function (roomId) {
    try {
        let votes = await Vote.findAll({
          include:[
          {
            model: Room,
            where: {id: roomId}
          }]
        });
        if (votes) return votes
        else throw `Could not find Vote`;
    } catch (err) {
        throw `Could not find Vote`;
    }
};


/**
 * Creates an Vote on the database
 * @param {*} params - key value pair mirroring Vote model
 */
let createVote = async function (params) {
    try {
        let room = await findVote(params.userId, params.roomId)
        if(room){
            throw {message: "Not an unique Vote"}
        }
    }
    catch(err){
        if (err.message) return err
        else{
            let vote = await Vote.create({votedFor: params.votedFor})
            .then((vote) => {
              vote.setUser(params.userId)
              .then((vote) => {
                vote.setRoom(params.roomId)
                .then((vote) => {return vote})
                .catch((err) => {
                    console.log(err)
                    return err
                })
              })
            })
            .catch((err) => {
                console.log(err)
                return err
            })
            if (vote) return vote;
        }
    }
}

/**
 * Used to delete all Votes
 * @param {*} params
 */
let deleteAllVotes = async function(){
    try{
        await Vote.destroy({where: {}})
        return
    }catch(error){
        throw {message: "Unable to delete all rooms"}
    }
}


/**
 * Used to delete all Votes of a Room
 * @param {*} params
 */
let deleteAllVotesOfRoom = async function(roomId){
    try{
        await Vote.destroy({
            include:[
                {
                    model: Room,
                    where: {id: roomId}
                }
            ]
        })
        return
    }catch(error){
        throw {message: "Unable to delete all rooms"}
    }
}

let deleteVoteById = async function(voteId){
    try{
        await Vote.destroy({where: {id: voteId}})
        return
    }catch(error){
        throw {message: `Unable to delete room of id ${voteId}`}
    }
}

module.exports = {
    findVote,
    findVotes,
    createVote,
    deleteAllVotes,
    deleteVoteById
}
