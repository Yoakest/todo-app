"use strict";

var _require = require('sequelize'),
  DataTypes = _require.DataTypes;
var sequelize = require('../config/database');
var Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  completed_date: {
    type: DataTypes.STRING,
    allowNull: true // Tamamlanma tarihi isteğe bağlı olsun
  }
}, {
  timestamps: false // createdAt ve updatedAt kullanılmayacak
});
module.exports = Todo;