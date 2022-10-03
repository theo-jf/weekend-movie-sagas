import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Snackbar, Alert, Button } from "@mui/material";

import MovieDetailsItem from "./MovieDetailsItem";

export default function MovieDetails() {

    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const movie = useSelector(store => store.details);
    const snackbar = useSelector(store => store.snackbar);

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

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({type: 'RESET_SNACKBAR'});
    }

    const toEditDetails = (id) => {
        history.push(`/details/edit/${id}`);
    }

    const backToList = () => {
        history.push('/');
    }

    return (
        <>
            <MovieDetailsItem key={movie.id} movie={movie} />
            <Snackbar open={snackbar.putError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Error updating movie
                </Alert>
            </Snackbar>
            <footer className="movieFooter">
                <Button id="backToList" onClick={backToList}>Back to List</Button>
                <Button onClick={() => toEditDetails(movie.id)}>Edit entry</Button>
            </footer>
        </>
    );
}