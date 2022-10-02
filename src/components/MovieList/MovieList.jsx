import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

import { Snackbar, Alert } from "@mui/material";

function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);
    const snackbar = useSelector(store => store.snackbar);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const seeDetails = (id) => {
        // dispatch({type: 'SAGA_FETCH_DETAILS', payload: id});
        //Insert id for MovieDetails to use as parameter
        history.push(`/details/${id}`);
    }

    const toMovieForm = () => {
        history.push('/addmovie');
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({type: 'RESET_SNACKBAR'});
    }

    return (
        <>
            <main className="movieListMain">
                <h1>MovieList</h1>
                <section className="movies">
                    {movies.map(movie => {
                        return (
                            <div key={movie.id} >
                                <h3>{movie.title}</h3>
                                <img className="poster" 
                                    src={movie.poster} 
                                    alt={movie.title}
                                    onClick={() => seeDetails(movie.id)}
                                />
                            </div>
                        );
                    })}
                </section>
            </main>
            <Snackbar open={snackbar.postError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Error uploading movie
                </Alert>
            </Snackbar>
            <Snackbar open={snackbar.postSuccess} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Movie added
                </Alert>
            </Snackbar>
            <Snackbar open={snackbar.getError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Error fetching movies
                </Alert>
            </Snackbar>
            <footer className="movieFooter">
                <button onClick={toMovieForm}>Add a Movie</button>
            </footer>
        </>
    );
}

export default MovieList;