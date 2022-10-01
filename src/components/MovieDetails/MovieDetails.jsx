import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MovieDetailsItem from "./MovieDetailsItem";

export default function MovieDetails() {

    // FIX RENDERING BUG!!!!!

    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const movie = useSelector(store => store.details);

    useEffect(() => {

        dispatch({
            type: 'SAGA_FETCH_DETAILS',
            payload: params.id
        });

        return () => {
            dispatch({type: 'CLEAR_DETAILS'});
        }

    }, [params.id]);

    const backToList = () => {
        history.push('/');
    }

    return (
        <>
            <button id="backToList" onClick={backToList}>Back to List</button>
            <MovieDetailsItem key={movie.id} movie={movie} />
        </>
    );
}