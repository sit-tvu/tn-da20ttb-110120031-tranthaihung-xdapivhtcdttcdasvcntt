const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProgramModel = sequelize.define('Program', {
  program_id: {
    type: DataTypes.STRING(255),
    primaryKey: true,
    underscored: true
  },
  programName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isDelete: {
    type: DataTypes.TINYINT(1),
    defaultValue: 0
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  tableName: 'programs',
  underscored: false
});

module.exports = ProgramModel;