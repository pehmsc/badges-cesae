'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('icons', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'Nome identificador do ícone (ex: globe, code-bracket, academic-cap)',
      },
      svg_path: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'Conteúdo SVG do path (atributo d do elemento path)',
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Categoria para agrupar ícones (ex: tecnologia, gestão, design)',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('icons');
  },
};