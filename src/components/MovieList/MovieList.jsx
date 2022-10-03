import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

import { Snackbar, Alert, Grid, CardContent, Button } from "@mui/material";

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
                <Grid container spacing={1} className="moviesDisplay">
                    {movies.map(movie => {
                        return (
                            <Grid item key={movie.id}>
                                <CardContent className="movieItem">
                                    <h3>{movie.title}</h3>
                                    <img className="poster" 
                                        src={movie.poster} 
                                        alt={movie.title}
                                        onClick={() => seeDetails(movie.id)}
                                    />
                                </CardContent>
                            </Grid>
                        );
                    })}
                </Grid>
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
                <Button onClick={toMovieForm}>Add a Movie</Button>
            </footer>
        </>
    );
}

export default MovieList;