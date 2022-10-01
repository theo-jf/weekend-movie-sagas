import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const seeDetails = (id) => {
        dispatch({type: 'SAGA_FETCH_DETAILS', payload: id});
        //Insert id for MovieDetails to use as parameter
        history.push(`/details/${id}`);
    }

    const toMovieForm = () => {
        history.push('/addmovie');
    }

    return (
        <>
            <main>
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
            <footer className="addMovieFooter">
                <button onClick={toMovieForm}>Add a Movie</button>
            </footer>
        </>
    );
}

export default MovieList;