import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MovieDetailsItem from "./MovieDetailsItem";

export default function MovieDetails() {

    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const movie = useSelector(store => store.details);

    // On page load . . . 
    useEffect(() => {
        
        // Fetch the movie details associated with the id in params
        dispatch({
            type: 'SAGA_FETCH_DETAILS',
            payload: params.id
        });

        // Clear the details store upon leaving the page
        return () => {
            dispatch({type: 'CLEAR_DETAILS'});
        }

    }, [params.id]);

    const toEditDetails = (id) => {
        console.log('movie id???', movie)
        history.push(`/details/edit/${id}`);
    }

    const backToList = () => {
        history.push('/');
    }

    return (
        <>
            <button onClick={() => toEditDetails(movie.id)}>Edit movie entry</button>
            <MovieDetailsItem key={movie.id} movie={movie} />
            <footer className="movieFooter">
                <button id="backToList" onClick={backToList}>Back to List</button>
            </footer>
        </>
    );
}