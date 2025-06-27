import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

sequelize.authenticate()
    .then(() => console.log('Se pudo Conectar a la base de datos'))
    .catch((err) => console.error('Hubo un error al querer conectarse a la base de datos:', err));