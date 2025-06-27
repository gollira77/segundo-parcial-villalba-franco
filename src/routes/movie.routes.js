import express from 'express';
import{
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
} from '../controllers/movie.controllers.js'

const router = express.Router();

router.get('/', getAllMovies); 
router.get('/:id', getMovieById);
router.post('/', createMovie); 
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;