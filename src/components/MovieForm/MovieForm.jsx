import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import './MovieForm.css'

import { TextField, Box, MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@mui/material";

export default function MovieForm() {

    const dispatch = useDispatch();
    const history = useHistory();
     
    const genres = useSelector(store => store.genres);

    const [badTitleSubmit, setBadTitleSubmit] = useState(false);
    const [badPosterSubmit, setBadPosterSubmit] = useState(false); 
    const [badDescSubmit, setBadDescSubmit] = useState(false);
    const [badGenreSubmit, setBadGenreSubmit] = useState(false);

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
        // Reset errors on inputs if entries added
        if (newMovieObject.title != '') {
            setBadTitleSubmit(false);
        }
        if (newMovieObject.poster != '') {
            setBadPosterSubmit(false);
        }
        if (newMovieObject.description != '') {
            setBadDescSubmit(false)
        }
        if (newMovieObject.genre_ids[0] != undefined) {
            setBadGenreSubmit(false);
        }
        if (newMovieObject.title != '' && newMovieObject.poster != '' &&
            newMovieObject.description != '' && newMovieObject.genre_ids[0] != undefined) {
                // Dispatch newMovieObject
                dispatch({
                    type: 'SAGA_POST_MOVIE',
                    payload: newMovieObject
                })
                console.log('New movie', newMovieObject);
                backToList();
        }
        // Add errors if any object keys are empty
        if (newMovieObject.title === '') {
            setBadTitleSubmit(true);
        }
        if (newMovieObject.poster === '') {
            setBadPosterSubmit(true);
        }
        if (newMovieObject.description === '') {
            setBadDescSubmit(true);
        }
        if (newMovieObject.genre_ids[0] === undefined) {
            setBadGenreSubmit(true);
        }
    }

    const addGenre = (e) => {
        // Prevent against adding the same genre twice
        if (!newMovieObjectGenreNames.includes(e.target.value.name)) {
            setNewMovieObjectGenreNames(prevState => [...prevState, e.target.value.name]);
            setNewMovieObjectGenreIds(prevState => [...prevState, e.target.value.id]);
            setNewMovieObject(prevState => ({...prevState, genre_ids: ([...prevState.genre_ids,  e.target.value.id])}));
        }
    }

    const removeGenre = (id, name, e) => {
        e.preventDefault();
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
                '& .MuiTextField-root': { m: 2 },
             }}
             noValidate>
            <div className="formDiv">
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
                    fullWidth
                    multiline
                    rows={9}
                    helperText={(badDescSubmit === true) ? "required" : ""}/>
                </div>
                {/* Display for added genres (if any) */}
                {newMovieObjectGenreNames.map((name, i) => {
                    return (
                        <p key={i}>{name}
                            <button onClick={(e) => removeGenre(newMovieObjectGenreIds[i], name, e)}>Delete</button>
                        </p>
                    );
                })}
                {/* Drop-down to add another genre */}
                <InputLabel error={(badGenreSubmit === true) ? true : false}>Add genres</InputLabel>
                <FormControl 
                    sx={{minWidth: 200}}
                    required={(badGenreSubmit === true) ? true : false}
                    error={(badGenreSubmit === true) ? true : false}>
                    <Select
                    value={''}
                    onChange={addGenre}
                    fullWidth
                    >
                        {genres?.map(genre => {
                            return (
                                <MenuItem key={genre?.id} value={{id: genre?.id, name: genre?.name}}>{genre?.name}</MenuItem>
                            );
                        })}
                    </Select>
                    <FormHelperText>{(badGenreSubmit === true) ? "Please add at least one genre" : ""}</FormHelperText>
                </FormControl>
            </Box>
            <footer className="movieFooter">
                <button id="cancelFormBtn" onClick={backToList}>Cancel</button>
                <button id="saveFormBtn" onClick={addNewMovie}>Save</button>
            </footer>
        </>
    );
}