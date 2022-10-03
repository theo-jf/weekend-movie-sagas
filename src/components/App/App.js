import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieForm from '../MovieForm/MovieForm';
import EditMovieDetails from '../MovieDetails/EditMovieDetails';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

function App() {
  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFFFFF',
        contrastText: '#5f9ea0',
      },
      secondary: {
        main: '#028090',
        contrastText: '#FFFFFF',
      },
      background: {
        paper: '#F4F5F5',
      }
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <header className="mainHeader">
          <Typography variant="h3">
            <h1 className="headerText">The Movies Saga!</h1>
          </Typography>
        </header>
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
      </ThemeProvider>
    </div>
  );
}


export default App;
