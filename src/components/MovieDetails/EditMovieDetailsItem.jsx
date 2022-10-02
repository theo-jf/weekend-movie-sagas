import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EditMovieDetailsItem({movie}) {
    
    const history = useHistory();

    const [newMovieObject, setNewMovieObject] = useState({
                                                    title: '',
                                                    poster: '',
                                                    description: '',
                                                    genre_ids: []
                                                });


    const backToDetails = () => {
        //Insert id for MovieDetails to use as parameter
        history.push(`/details/${movie.id}`);
    }

    const addNewMovie = () => {
        console.log('woooo!');
        history.push(`/details/${movie.id}`);
    }

    return (
        <>
            <footer className="movieFooter">
                <button id="cancelEditsBtn" onClick={backToDetails}>Cancel</button>
                <button id="saveEditsBtn" onClick={addNewMovie}>Save</button>
            </footer>
        </>
    );
}