import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@mui/material";

export default function EditMovieDetailsItem({movie}) {

    const dispatch = useDispatch();
    const history = useHistory();

    const genres = useSelector(store => store.genres);

    const [badTitleSubmit, setBadTitleSubmit] = useState(false);
    const [badPosterSubmit, setBadPosterSubmit] = useState(false); 
    const [badDescSubmit, setBadDescSubmit] = useState(false);
    const [badGenreSubmit, setBadGenreSubmit] = useState(false);

    const [newMovieObjectGenreIds, setNewMovieObjectGenreIds] = useState(movie.genre_ids); 
    const [newMovieObjectGenreNames, setNewMovieObjectGenreNames] = useState(movie.genres);

    const [newMovieObject, setNewMovieObject] = useState({
                                                    id: movie.id,
                                                    title: movie.title,
                                                    poster: movie.poster,
                                                    description: movie.description,
                                                    genre_ids: movie.genre_ids
                                                });



    const removeGenre = (id, name, e) => {
        e.preventDefault();
        // Remove Id from newMovieObject, remove genre name and Id from state
        setNewMovieObject(prevState => ({...prevState, genre_ids: prevState.genre_ids.filter(stateId => stateId != id)}));
        setNewMovieObjectGenreNames(newMovieObjectGenreNames.filter(stateName => stateName != name));
        setNewMovieObjectGenreIds(newMovieObjectGenreIds.filter(stateId => stateId != id));
        console.log(newMovieObjectGenreNames);
    }

    const addGenre = (e) => {
        // Prevent against adding the same genre twice
        if (!newMovieObjectGenreNames.includes(e.target.value.name)) {
            setNewMovieObjectGenreNames(prevState => [...prevState, e.target.value.name]);
            setNewMovieObjectGenreIds(prevState => [...prevState, e.target.value.id]);
            setNewMovieObject(prevState => ({...prevState, genre_ids: ([...prevState.genre_ids,  e.target.value.id])}));
        }
    }

    const backToDetails = () => {
        //Insert id for MovieDetails to use as parameter
        history.push(`/details/${movie.id}`);
    }
    

    const addMovieEdits = () => {
        console.log('edits!:', newMovieObject);
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
                    type: 'SAGA_PUT_MOVIE',
                    payload: newMovieObject
                })
                // Dispatch here to fix id loss bug
                dispatch({
                    type: 'SAGA_FETCH_DETAILS',
                    payload: newMovieObject.id
                })
                console.log('New movie', newMovieObject);
                backToDetails();
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


    return (
        <>
            <TextField 
                onChange={(e) => setNewMovieObject(prevState => ({...prevState, title: e.target.value}))}
                error={(badTitleSubmit === true) ? true : false}
                required={(badTitleSubmit === true) ? true : false}
                value={newMovieObject.title}
                placeholder="title"
                variant="outlined"
                helperText={(badTitleSubmit === true) ? "required" : null}/>
            <section className="editPagePoster">
                <img className="detailsPoster" 
                    src={newMovieObject.poster} 
                    alt="image not found"
                />
            </section>
            <FormControl sx={{ m: 1, width: '60ch' }}>
                <TextField 
                    onChange={(e) => setNewMovieObject(prevState => ({...prevState, poster: e.target.value}))}
                    error={(badPosterSubmit === true) ? true : false}
                    required={(badPosterSubmit === true) ? true : false}
                    value={newMovieObject.poster}
                    placeholder="link to poster"
                    fullWidth
                    variant="outlined"
                    helperText={(badPosterSubmit === true) ? "required" : ""}/>
            </FormControl>
            <section className="editPageDescription">
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
            </section>
            <section className="editPageGenres">
                {newMovieObjectGenreNames?.map((name, i) => {
                        return (
                            <p key={i}>{name}
                                <Button color="secondary" onClick={(e) => removeGenre(newMovieObjectGenreIds[i], name, e)}>Delete</Button>
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
            </section>
            <footer className="movieFooter">
                <Button id="cancelEditsBtn" onClick={backToDetails}>Cancel</Button>
                <Button id="saveEditsBtn" onClick={addMovieEdits}>Save</Button>
            </footer>
        </>
    );
}