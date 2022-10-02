const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

// GET route for a specific movie's details
router.get('/:id', (req, res) => {

  const getId = req.params.id;
  const sqlText = `SELECT
                      movies.id, movies.title, movies.poster, movies.description, 
                      ARRAY_AGG (genres.name) genres
                   FROM "movies"
                      JOIN "movies_genres"
                        ON movies.id = movies_genres.movie_id
                      JOIN "genres"
                        ON movies_genres.genre_id = genres.id
                      WHERE movies.id = $1
                      GROUP BY movies.id, movies.title, movies.poster, movies.description;`
  
  pool.query(sqlText, [getId])
    .then(result => {
      res.send(result.rows[0]);
    })
    .catch(error => {
      console.log('Error in /api/movies/:id GET', error);
    })

})

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Loop through genre_ids in new movie object
    for ( let genre_id of req.body.genre_ids) {
      // Now handle the genre reference
      const insertMovieGenreQuery = `
        INSERT INTO "movies_genres" ("movie_id", "genre_id")
        VALUES  ($1, $2);
        `
        // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
        pool.query(insertMovieGenreQuery, [createdMovieId, genre_id]).then(result => {
          // Don't set the successful response header inside the loop!
        }).catch(err => {
          // catch for second query
          console.log(err);
          return res.sendStatus(500)
        })
    }
    // After the loop has completed successfully, send response
    return res.sendStatus(201);
// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;