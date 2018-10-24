module.exports = (sequelize, DataTypes) => {
  var Rooms = sequelize.define('Rooms', {
    /*
    Planned Data Fields:
    - Room Name
    - Creator
    - Users in Room
        Array of User IDs
    - isClosed
        Boolean if room is letting more people join
    - setVenue
       Boolean if room has voted/agreed on venue
    - Venue
        Should hold venue name, venue address, venue type/interest (?)
        Either array or JSON
    - setSchedule
        Boolean if time has been set => algorithm vs vote
    - Schedule
        Hold date & time period
        Array/JSON
    - isFinalized
        Boolean if room creator approves event details
        When true, finalizes event and event details can no longer be change
    */
    name: DataTypes.TEXT,
    isFinalized: DataTypes.BOOLEAN
  });

  Rooms.associate = (models) => {
    // associations can be defined here
  }

  return Rooms;
};
