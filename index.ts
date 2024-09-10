import express from 'express'
// ! importing mongoose
import mongoose from 'mongoose'
// ! import Movies
import Movies from './models/movies'

const app = express() 

const movieData = [
  { name: 'Diehard', movieId: 1 },
  { name: 'The Grinch', movieId: 2 },
  { name: 'Home Alone', movieId: 3 } 
]

const router = express.Router()

// getting my movies
router.route('/api/movies').get(async (req, res) => {
  // ! Let's use mongoose to get our movies!
  const movies = await Movies.find();
  res.send(movies)
})

// Getting an individual movie
router.route('/api/movies/:movieId').get((req, res) => {
  const movieId = Number(req.params.movieId)
  console.log(movieId)
  const foundMovie = movieData.find((movie) => {
    return movieId === movie.movieId 
  })
  res.send(foundMovie)
})

// Posting a movie
router.route('/api/movies').post(async (req, res) => {
  // ! IT NEEDS TO GO IN HERE!!
  console.log('POSTING!', req.body)
  // ! This is actually creating the movie on Mongodb.
  const movie = await Movies.create(req.body)
  // ! This is the response the USER gets in insomnia.
  res.send(movie)
})

// Delete a movie
router.route('/api/movies/:movieId').delete((req, res) => {
  res.send("TODO: not implemented")
})

// Put a movie
router.route('/api/movies/:movieId').put((req, res) => {
  res.send("TODO: not implemented")
})

app.use(express.json())
app.use(router)


async function start() {
  // ! Before we start express, we connect to the database.
  await mongoose.connect('mongodb://127.0.0.1:27017/moviesdb')
  console.log('Connected to the database! 🔥')

  app.listen(8000, () => {
    console.log('Express API is running on http://localhost:8000')
  })
}

start()

