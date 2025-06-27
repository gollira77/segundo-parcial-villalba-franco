import Movie from '../models/movie.model.js';

export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error al querer obtener las películas' });
    }
};

export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);

        if (!movie) {
        return res.status(404).json({ message: 'No se encontro esa película' });
        }

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al querer buscar esa película' });
    }
};

export const createMovie = async (req, res) => {
    try {
        const { title, director, duration, genre, description } = req.body;

        if (!title || !director || !duration || !genre) {
        return res.status(400).json({ message: 'Faltan campos obligatorios, porfavor completarlos' });
        }

        const existe = await Movie.findOne({ where: { title } });
        if (existe) {
        return res.status(400).json({ message: 'Ya existe una película con ese título, ingrese otro titulo' });
        }

        const movie = await Movie.create({
        title,
        director,
        duration,
        genre,
        description
        });

        res.status(201).json({ message: 'La película se creo correctamente ', data: movie });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al crear la película' });
    }
};

export const updateMovie = async (req, res) => {
    try {
        const { title, director, duration, genre, description } = req.body;
        const { id } = req.params;

        const movie = await Movie.findByPk(id);
        if (!movie) {
        return res.status(404).json({ message: 'No se encontro esa película' });
        }

        if (!title || !director || !duration || !genre) {
        return res.status(400).json({ message: 'Faltan campos obligatorios, porfavor ingresar los datos correspondientes en todos los campos' });
        }

        if (title !== movie.title) {
        const existing = await Movie.findOne({ where: { title } });
        if (existing) {
            return res.status(400).json({ message: 'Ya existe una película con ese título, porfavor ingrese otro titulo' });
        }
        }

        await movie.update({
        title,
        director,
        duration,
        genre,
        description
        });

        res.status(200).json({ message: 'La película a sido actualizada correctamente', data: movie });
    } catch (error) {
        res.status(500).json({ message: 'Error al querer actualizar la película' });
    }
};


export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByPk(id);

        if (!movie) {
        return res.status(404).json({ message: 'Película no encontrada' });
        }

        await movie.destroy();
        res.status(200).json({ message: 'Película eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la película' });
    }
};
