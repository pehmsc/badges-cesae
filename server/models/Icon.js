'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Icon extends Model {
    static associate(models) {
      Icon.hasMany(models.Event, {
        foreignKey: 'icon_id',
        as: 'events',
      });
    }
  }

  Icon.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      svg_path: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Icon',
      tableName: 'icons',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );

  return Icon;
};