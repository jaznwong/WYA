module.exports = (sequelize, DataTypes) => {
  var Vote = sequelize.define('Vote', {
    /*
    TEMP, will not need
    */
    placename: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  Vote.associate = (models) => {
    Vote.belongsTo(models.User)
    Vote.belongsTo(models.Room);
  }

  return Vote;
};
