"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Note.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Note.belongsTo(models.Notebook, {
        foreignKey: "notebookId",
      });
      Note.belongsToMany(models.Tag, {
        through: models.NoteTag,
      });
    }
  }
  Note.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Untitled",
      },
      userId: DataTypes.INTEGER,
      content: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notebookId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Note",
    }
  );
  return Note;
};
