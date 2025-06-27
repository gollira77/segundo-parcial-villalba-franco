import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Movie = sequelize.define('Movie', {
    title: {type: DataTypes.STRING, allowNull: false, unique: true},
    director: {type: DataTypes.STRING, allowNull: false},
    duration: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1}},
    genre: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING}}, 
    {tableName: 'movies', }
);

export default Movie;
