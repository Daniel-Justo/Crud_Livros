const { DataTypes } = require('sequelize')
const connection = require('./connection')

const livros = connection.define('livros',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: true
    },
    capa: {
        type: DataTypes.STRING,
        allowNull: true
    },
    editora: {
        type: DataTypes.STRING,
        allowNull: true
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataDePublicacao: {
        type: DataTypes.DATE
    }
})

module.exports = livros
