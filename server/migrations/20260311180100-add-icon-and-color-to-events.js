'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('events', 'icon_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'icons',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      comment: 'FK para o ícone do badge (obrigatório para cursos)',
    });

    await queryInterface.addColumn('events', 'badge_color', {
      type: Sequelize.STRING(7),
      allowNull: true,
      comment: 'Cor de fundo do badge em hex (ex: #7B2D8E)',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('events', 'badge_color');
    await queryInterface.removeColumn('events', 'icon_id');
  },
};