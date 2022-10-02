import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('SAGA_FETCH_DETAILS', fetchDetails);
    yield takeEvery('SAGA_FETCH_GENRES', fetchAllGenres);
    yield takeEvery('SAGA_POST_MOVIE', postNewMovie);
    yield takeEvery('SAGA_PUT_MOVIE', updateMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch (error) {
        console.log(error);
        yield put ({
            type: 'GET_MOVIES_ERROR'
        })
    }
        
}

function* fetchDetails(action) {
    const detailsId = action.payload;
    // Get specific movie's details from the Database
    try{
        const detailsObject = yield axios.get(`/api/movie/${detailsId}`);
        console.log('details object:', detailsObject.data);
        yield put ({
            type: 'SET_DETAILS',
            payload: detailsObject.data
        })
    } catch (error) {
        console.log(error);
        alert('Error loading details');
    }
}

function* fetchAllGenres() {
    try {
        const allGenres = yield axios.get('/api/genre');
        yield put ({
            type: 'SET_GENRES',
            payload: allGenres.data
        })
    } catch (error) {
        console.log(error);
        alert('Error fetching genres')
    }
}

function* postNewMovie(action) {
    try { 
        yield axios.post('/api/movie', action.payload);
        yield put({
            type: 'FETCH_MOVIES'
        })
        yield put ({
            type: 'POST_MOVIE_SUCCESS'
        })
    } catch (error) {
        console.log(error);
        yield put ({
            type: 'POST_MOVIES_ERROR'
        })
    }
}

function* updateMovie(action) {
    try {

    } catch (error) {
        console.log(error)
        yield put ({
            type: 'PUT_MOVIES_ERROR'
        })
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the details that will display on MovieDetails
const details = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        case 'CLEAR_DETAILS':
            return {};
    }
    return state;
}

// Boolean for snackbar appearance
const snackbar = (state = {postSuccess: false, postError: false, getError: false, putError: false}, action) => {
    switch (action.type) {
        case 'POST_MOVIE_SUCCESS':
            return {...state, success: true};
        case 'POST_MOVIE_ERROR':
            return {... state, error: true};
        case 'GET_MOVIES_ERROR':
            return {... state, getError: true};
        case 'PUT_MOVIE_ERROR':
            return {...state, putError: true};
        case 'RESET_SNACKBAR':
            return {success: false, error: false, getError: false, putError: false};
    }  
    return state;
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details,
        snackbar
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
