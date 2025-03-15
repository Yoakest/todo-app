const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  completed_date: {
    type: DataTypes.STRING,
    allowNull: true, // Tamamlanma tarihi isteğe bağlı olsun
  }
}, {
  timestamps: false, // createdAt ve updatedAt kullanılmayacak
});

module.exports = Todo;
