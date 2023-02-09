"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Tag.belongsToMany(models.Note, {
        through: models.NoteTag,
        foreignKey: "tagId",
      });
    }
  }
  Tag.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 1000],
        },
      },
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tag",
    }
  );
  return Tag;
};
