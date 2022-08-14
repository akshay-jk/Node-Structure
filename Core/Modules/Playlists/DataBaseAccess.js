import Playlist from '../../DatabaseModels/PlaylistModel.js';
import Mongoose from '../../Configurations/Mongoose.js'

export default {
    FindPlaylists: async (filter, projection) => {
        return new Promise((resolve, reject) => {
            Playlist.find(filter, projection, (err, playlists) => {
                if (err == null) {
                    if (playlists.length != 0) {
                        resolve({ status: true, playlists })
                    } else {
                        reject({ status: false, playlists: [] })
                    }
                } else {
                    reject({ status: false, playlists: [] })
                }
            })
        })
    },
    FindPlaylist: async (filter, projection) => {
        return new Promise((resolve, reject) => {
            Playlist.findOne(filter, projection, (err, playlist) => {
                if (err == null) {
                    if (playlist != null) {
                        resolve({ status: true, playlist })
                    } else {
                        reject({ status: false, playlist: [] })
                    }
                } else {
                    reject({ status: false, playlist: [] })
                }
            })
        })
    },
    AddPlaylist: async (obj) => {
        return new Promise((resolve, reject) => {
            let NewPlaylist = new Playlist({
                User: Mongoose.Types.ObjectId(obj['User']),
                Name: obj['Name'],
                Songs: [...obj['Songs'].map((songID) => Mongoose.Types.ObjectId(songID))]
            });
            NewPlaylist.save((err, doc) => {
                if (err == null) resolve({ status: true, msg: 'OK' });
                else reject({ status: false, msg: 'Failed' })
            })
        })
    },
    AddSongsToPlaylist: async (playlistID, songsArr) => {
        return new Promise((resolve, reject) => {
            Playlist.updateOne({ _id: Mongoose.Types.ObjectId(playlistID) }, { $push: { Songs: { $each: songsArr } } },
                (err, returnStat) => {
                    if (err == null) resolve({ status: true, data: returnStat })
                    else reject({ status: false, data: {} })
                })
        })
    }
}