import { Router } from 'express';
import Validator from './Validator.js'
import Controller from './Controller.js';

const Route = Router();

Route.post('/GetPlaylists', Validator.GetPlaylists, Controller.GetPlaylists);
Route.post('/GetPlaylist/:PlaylistId', Validator.GetPlaylist, Controller.GetPlaylist);

Route.post('/AddPlaylist', Validator.AddPlaylist, Controller.AddPlaylist);
Route.post('/AddSongs/:PlaylistID', Validator.AddSongs, Controller.AddSongs);

Route.post('/ShufflePlaylist/:PlaylistID', Validator.ShufflePlaylist, Controller.ShufflePlaylist);

export default Route;