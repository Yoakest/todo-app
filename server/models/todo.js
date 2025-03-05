const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sequelize bağlantısı


const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: false, // createdAt ve updatedAt sütunları kullanılmaz
});

module.exports = Todo;
