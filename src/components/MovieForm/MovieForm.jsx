import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MovieForm() {

    const dispatch = useDispatch();
    const history = useHistory();
     
    const genres = useSelector(store => store.genres);

    useEffect(() => {
        dispatch({type: 'SAGA_FETCH_GENRES'});
    }, []);

    const backToList = () => {
        history.push('/');
    }

    return (
        <>
            <footer className="addMovieFooter">
                <button id="cancelFormBtn" onClick={backToList}>Cancel</button>
                <button id="saveFormBtn" onClick={backToList}>Save</button>
            </footer>
        </>
    );
}