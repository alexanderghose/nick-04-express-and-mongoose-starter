"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// ! importing mongoose
const mongoose_1 = __importDefault(require("mongoose"));
// ! import Movies
const movies_1 = __importDefault(require("./models/movies"));
const app = (0, express_1.default)();
const movieData = [
    { name: 'Diehard', movieId: 1 },
    { name: 'The Grinch', movieId: 2 },
    { name: 'Home Alone', movieId: 3 }
];
const router = express_1.default.Router();
// getting my movies
router.route('/api/movies').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ! Let's use mongoose to get our movies!
    const movies = yield movies_1.default.find();
    res.send(movies);
}));
// Getting an individual movie
router.route('/api/movies/:movieId').get((req, res) => {
    const movieId = Number(req.params.movieId);
    console.log(movieId);
    const foundMovie = movieData.find((movie) => {
        return movieId === movie.movieId;
    });
    res.send(foundMovie);
});
// Posting a movie
router.route('/api/movies').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ! IT NEEDS TO GO IN HERE!!
    console.log('POSTING!', req.body);
    // ! This is actually creating the movie on Mongodb.
    const movie = yield movies_1.default.create(req.body);
    // ! This is the response the USER gets in insomnia.
    res.send(movie);
}));
// Delete a movie
router.route('/api/movies/:movieId').delete((req, res) => {
    res.send("TODO: not implemented");
});
// Put a movie
router.route('/api/movies/:movieId').put((req, res) => {
    res.send("TODO: not implemented");
});
app.use(express_1.default.json());
app.use(router);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        // ! Before we start express, we connect to the database.
        yield mongoose_1.default.connect('mongodb://127.0.0.1:27017/moviesdb');
        console.log('Connected to the database! 🔥');
        app.listen(8000, () => {
            console.log('Express API is running on http://localhost:8000');
        });
    });
}
start();
