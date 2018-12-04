module.exports = (sequelize, DataTypes) => {
  var Vote = sequelize.define('Vote', {
    /*
    TEMP, will not need
    */
    votedFor: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  Vote.associate = (models) => {
    Vote.belongsTo(models.User)
    Vote.belongsTo(models.Room);
  }

  return Vote;
};
