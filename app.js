import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import movieRoutes from './src/routes/movie.routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/movies', movieRoutes);

sequelize.authenticate()
    .then(() => {
        console.log('Conectado a la base de datos');
        return sequelize.sync();
    })
    .then(() => {
        app.listen(PORT, () => {
        console.log(`El servidor esta corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al querer conectarse con la base de datos:', error);
});