"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notebook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notebook.belongsTo(models.User, { foreignKey: "userId" });
      Notebook.hasMany(models.Note, {
        foreignKey: "notebookId",
        onDelete: "CASCADE",
        hooks: true,
      });
      // Notebook.hasMany(models.Task, {
      //   foreignKey: "notebookId",
      //   onDelete: "CASCADE",
      //   hooks: true,
      // });
    }
  }
  Notebook.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: DataTypes.INTEGER,
      firstNotebook: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Notebook",
    }
  );
  return Notebook;
};
