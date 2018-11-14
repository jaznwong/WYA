module.exports = (sequelize, DataTypes) => {
  var Room = sequelize.define('Room', {
    roomname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    /*
    NOTE:
    - Users and Rooms will define a Many-to-Many relationship
    - A M-M relationship will ultimately involve a lot less overhead
    when it comes to querying all the rooms for a user (such as displaing user's room in dash)
    amd querying all users in a room (for displaying users in room)
    - This necessitates field identified user id of creator
    - This field will be used to validate
    */
    creatorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
          notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    /*
    Structure should look like:
    {
    Monday: {
      0: 3,
      15: 2,
      20: 6
    },
    Wednesday: {
      12: 5,
      18: 1,
      19: 3
      }
    }
  }
    */
    availabilityTally: {
        type: DataTypes.JSON,
        allowNull: true
    },
    /*
    Structure should look like:
    {Sports: 4,
    Music: 2}
    */
    interestTally: {
        type: DataTypes.JSON,
        allowNull: true
    },
    roomstatus: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['OPEN','CLOSED','VOTING','FINALIZED']]
      }
    }
  });

  Room.associate = (models) => {
    models.User.belongsToMany(Room, {through: 'UserRoom'});
    Room.belongsToMany(models.User, {through: 'UserRoom'});
  }

  return Room;
};
