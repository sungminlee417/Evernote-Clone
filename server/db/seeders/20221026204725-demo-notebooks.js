"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Notebooks", [
      {
        name: "First Notebook",
        userId: 1,
        firstNotebook: true,
      },
      {
        name: "test2",
        userId: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Notebooks",
      {
        userId: 1,
      },
      {}
    );
  },
};
