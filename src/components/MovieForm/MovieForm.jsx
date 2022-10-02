import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TextField, Box, MenuItem, Select, InputLabel } from "@mui/material";

export default function MovieForm() {

    const dispatch = useDispatch();
    const history = useHistory();
     
    const genres = useSelector(store => store.genres);

    const [badTitleSubmit, setBadTitleSubmit] = useState(false);
    const [badPosterSubmit, setBadPosterSubmit] = useState(false); 
    const [badGenreSubmit, setBadGenreSubmit] = useState(false);
    const [badDescSubmit, setBadDescSubmit] = useState(false);

    const [newMovieObject, setNewMovieObject] = useState({
                                                    title: '',
                                                    poster: '',
                                                    description: '',
                                                    genre_ids: []
                                                });

    // State storage for added genres display
    // Keep track of Ids for removeGenreFunction
    const [newMovieObjectGenreIds, setNewMovieObjectGenreIds] = useState([]);                                          
    const [newMovieObjectGenreNames, setNewMovieObjectGenreNames] = useState([]);


    useEffect(() => {
        dispatch({type: 'SAGA_FETCH_GENRES'});
    }, []);

    const backToList = () => {
        history.push('/');
    }

    const addNewMovie = () => {
        console.log('New movie', newMovieObject);
        backToList();
    }

    const addGenre = (e) => {
        // Prevent against adding the same genre twice
        if (!newMovieObjectGenreNames.includes(e.target.value.name)) {
            setNewMovieObjectGenreNames(prevState => [...prevState, e.target.value.name]);
            setNewMovieObjectGenreIds(prevState => [...prevState, e.target.value.id]);
            setNewMovieObject(prevState => ({...prevState, genre_ids: ([...prevState.genre_ids,  e.target.value.id])}));
        }
    }

    const removeGenre = (id, name) => {
        // Remove Id from newMovieObject, remove genre name and Id from state
        setNewMovieObject(prevState => ({...prevState, genre_ids: prevState.genre_ids.filter(stateId => stateId != id)}));
        setNewMovieObjectGenreIds(newMovieObjectGenreIds.filter(stateId => stateId != id));
        setNewMovieObjectGenreNames(newMovieObjectGenreNames.filter(stateName => stateName != name));
        console.log(newMovieObjectGenreNames);
    }

    return (
        <>  
            <h2>Add a Movie</h2>
            <Box component="form" 
             className="form" 
             autoComplete="off"
             sx={{
                '& .MuiTextField-root': { m: 1 },
             }}
             noValidate>
            <div>
                <TextField 
                    onChange={(e) => setNewMovieObject(prevState => ({...prevState, title: e.target.value}))}
                    error={(badTitleSubmit === true) ? true : false}
                    required={(badTitleSubmit === true) ? true : false}
                    value={newMovieObject.title}
                    placeholder="title"
                    variant="standard"
                    fullWidth
                    helperText={(badTitleSubmit === true) ? "required" : null}/>
                <TextField 
                    onChange={(e) => setNewMovieObject(prevState => ({...prevState, poster: e.target.value}))}
                    error={(badPosterSubmit === true) ? true : false}
                    required={(badPosterSubmit === true) ? true : false}
                    value={newMovieObject.poster}
                    placeholder="link to poster"
                    variant="standard"
                    fullWidth
                    helperText={(badPosterSubmit === true) ? "required" : ""}/>
                <TextField 
                    onChange={(e) => setNewMovieObject(prevState => ({...prevState, description: e.target.value}))}
                    error={(badDescSubmit === true) ? true : false}
                    required={(badDescSubmit === true) ? true : false}
                    value={newMovieObject.description}
                    placeholder="description"
                    variant="standard"
                    fullWidth
                    helperText={(badDescSubmit === true) ? "required" : ""}/>
                {/* Display for added genres (if any) */}
                {newMovieObjectGenreNames.map((name, i) => {
                    return (
                        <p key={i}>{name}
                            <button onClick={() => removeGenre(newMovieObjectGenreIds[i], name)}>Delete</button>
                        </p>
                    );
                })}
                {/* Drop-down to add another genre */}
                <InputLabel>Add genres</InputLabel>
                <Select
                value={''}
                onChange={addGenre}
                >
                    {genres?.map(genre => {
                        return (
                            <MenuItem key={genre?.id} value={{id: genre?.id, name: genre?.name}}>{genre?.name}</MenuItem>
                        );
                    })}
                </Select>
            </div>
                {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Error uploading item
                    </Alert>
                </Snackbar> */}
            </Box>
            <footer className="movieFooter">
                <button id="cancelFormBtn" onClick={backToList}>Cancel</button>
                <button id="saveFormBtn" onClick={addNewMovie}>Save</button>
            </footer>
        </>
    );
}