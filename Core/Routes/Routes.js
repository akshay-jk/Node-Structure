import { Router } from 'express';

import AuthRoutes from '../Modules/Auth/Routes.Auth.js'
import SongRoutes from '../Modules/Songs/Routes.Songs.js';
import PlaylistRoutes from '../Modules/Playlists/Routes.Playlist.js';

const Route = Router();

Route.use('/Sign', AuthRoutes);
Route.use('/Auth/Songs', SongRoutes);
Route.use('/Auth/PlayLists', PlaylistRoutes);

export default Route;