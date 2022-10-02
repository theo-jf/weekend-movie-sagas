import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import './EditMovieDetails.css';
import EditMovieDetailsItem from "./EditMovieDetailsItem";

export default function EditMovieDetails() {

    const dispatch = useDispatch();
    const params = useParams();
    let movie = useSelector(store => store.details);

    useEffect(() => {
        console.log('Edit params:', params);
        // Fetch the movie details to edit associated with the id in params
        dispatch({
            type: 'SAGA_FETCH_DETAILS',
            payload: params.id
        });
        
        dispatch({type: 'SAGA_FETCH_GENRES'});

        // Clear the details store upon leaving the page
        return () => {
            dispatch({type: 'CLEAR_DETAILS'});
        }

    }, [params.id]);

    return (
        <EditMovieDetailsItem movie={movie}/>
    );

}