import { Router } from 'express';
import Validator from './Validator.js'
import Controller from './Controller.js';

const Route = Router();

Route.post('/GetSongs', Controller.GetSongs);
Route.post('/GetSong/:songId', Controller.GetSong);
Route.post('/SearchSong', Controller.SearchSong);

Route.post('/AddSong', Validator.AddSong, Controller.AddSong);

export default Route;