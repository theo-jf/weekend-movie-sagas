import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MovieDetails() {

    // FIX RENDERING BUG!!!!!

    const dispatch = useDispatch();
    const params = useParams();
    const movie = useSelector(store => store.details);
    const genres = movie.genres

    useEffect(() => {

        dispatch({
            type: 'SAGA_FETCH_DETAILS',
            payload: params.id
        });

        return () => {
            dispatch({type: 'CLEAR_DETAILS'});
        }

    }, [params.id])

    return (
        <div key={movie.id} >
        <h3>{movie.title}</h3>
        <img className="detailsPoster" 
            src={movie.poster} 
            alt={movie.title}
        />
        <p>{(genres.length > 1) ? 'Genres' : 'Genre'}</p>
        {movie.genres.map(genre => {
            return (
                <p>{genre}</p>
            );
        })}
        </div>
    );
}