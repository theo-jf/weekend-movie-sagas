import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MovieDetailsItem from "./MovieDetailsItem";

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

    }, [params.id]);

    return (
        <MovieDetailsItem key={movie.id} movie={movie} />
    );
}