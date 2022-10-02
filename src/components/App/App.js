import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieForm from '../MovieForm/MovieForm';
import EditMovieDetails from '../MovieDetails/EditMovieDetails';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route exact path="/details/:id">
          {/* Details page */}
          <MovieDetails />
        </Route>
        <Route exact path="/details/edit/:id">
          {/* Details edit page */}
          <EditMovieDetails />
        </Route>
        <Route exact path="/addmovie">
          {/* Add Movie page */}
          <MovieForm />
        </Route>
      </Router>
    </div>
  );
}


export default App;
