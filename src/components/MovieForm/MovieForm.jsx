import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TextField, FormControl } from "@mui/material";

export default function MovieForm() {

    const dispatch = useDispatch();
    const history = useHistory();
     
    const genres = useSelector(store => store.genres);

    const [badTitleSubmit, setBadTitleSubmit] = useState(false);
    const [badPosterSubmit, setBadPosterSubmit] = useState(false); 
    const [badGenreSubmit, setBadGenreSubmit] = useState(false);
    const [badDescSubmit, setBadDescSubmit] = useState(false);

    const [newMovieObject, setNewMovieObject] = useState({});


    useEffect(() => {
        dispatch({type: 'SAGA_FETCH_GENRES'});
    }, []);

    const backToList = () => {
        history.push('/');
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
                <TextField onChange={(e) => setNewMovieObject({title: e.target.value})}
                        error={(badTitleSubmit === true) ? true : false}
                        required={(badTitleSubmit === true) ? true : false}
                        value={newMovieObject.title}
                        placeholder="title"
                        variant="standard"
                        fullWidth
                        helperText={(badTitleSubmit === true) ? "required" : null}/>
                <TextField onChange={(e) => setNewMovieObject({poster: e.target.value})}
                        error={(badPosterSubmit === true) ? true : false}
                        required={(badPosterSubmit === true) ? true : false}
                        value={newMovieObject.poster}
                        placeholder="link to poster"
                        variant="standard"
                        fullWidth
                        helperText={(badPosterSubmit === true) ? "required" : ""}/>
                <TextField onChange={(e) => setNewMovieObject({description: e.target.value})}
                        error={(badDescSubmit === true) ? true : false}
                        required={(badDescSubmit === true) ? true : false}
                        value={newMovieObject.description}
                        placeholder="description"
                        variant="standard"
                        fullWidth
                        helperText={(badDescSubmit === true) ? "required" : ""}/>
            </div>
                {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Error uploading item
                    </Alert>
                </Snackbar> */}
            </Box>
            <footer className="movieFooter">
                <button id="cancelFormBtn" onClick={backToList}>Cancel</button>
                <button id="saveFormBtn" onClick={backToList}>Save</button>
            </footer>
        </>
    );
}