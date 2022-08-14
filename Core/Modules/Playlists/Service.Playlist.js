import DB from './DataBaseAccess.js'

export default {
    GetPlaylists: async (filter, projection) => {
        return new Promise((resolve, reject) => {
            DB.FindPlaylists(filter, projection)
                .then((playlists) => {
                    resolve({ status: true, playlists: playlists['playlists'] })
                }).catch((err) => {
                    reject({ status: false, playlists: [] })
                })
        })
    },
    GetPlaylist: async (filter, projection) => {
        return new Promise((resolve, reject) => {
            DB.FindPlaylist(filter, projection)
                .then((playlists) => {
                    resolve({ status: true, playlists: playlists['playlist'] })
                }).catch((err) => {
                    reject({ status: false, playlists: {} })
                })
        })
    },
    AddPlaylist: async (obj) => {
        return new Promise((resolve, reject) => {
            DB.AddPlaylist(obj).then((succ) => {
                resolve({ status: true, msg: 'Song Added' })
            }).catch((err) => {
                reject({ status: false, msg: 'Song Addition Failed' })
            })
        })
    },
    AddSongs: async (Obj) => {
        return new Promise((resolve, reject) => {
            DB.AddSongsToPlaylist(Obj.PlaylistID, Obj.Songs)
                .then((succ) => {
                    resolve({ status: true, data: succ['data'] });
                }).catch((err) => {
                    reject({ status: false, data: {} })
                })
        })
    },
    ShufflePlaylist: async (filter, projection) => {
        return new Promise((resolve, reject) => {
            DB.FindPlaylist(filter, projection).then((playlists) => {
                let Songs = playlists['playlist']['Songs'].sort(() => Math.random() - 0.5);
                resolve({ status: true, Songs: Songs })
            }).catch((err) => {
                reject({ status: false, playlists: {} })
            })
        })
    }
}