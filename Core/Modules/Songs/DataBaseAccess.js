import Song from '../../DatabaseModels/SongModel.js';

export default {
    FindSongs: async (filter, projection) => {
        return new Promise((resolve, reject) => {
            Song.find(filter, projection, (err, songs) => {
                if (err == null) {
                    if (songs.length != 0) {
                        resolve({ status: true, songs })
                    } else {
                        reject({ status: false, songs: [] })
                    }
                } else {
                    reject({ status: false, songs: [] })
                }
            })
        })
    },
    FindSong: async (filter, projection) => {
        return new Promise((resolve, reject) => {
            Song.findOne(filter, projection, (err, song) => {
                if (err == null) {
                    if (song != null) {
                        resolve({ status: true, song })
                    } else {
                        reject({ status: false, song: [] })
                    }
                } else {
                    reject({ status: false, song: [] })
                }
            })
        })
    },
    AddSong: async (obj) => {
        return new Promise((resolve, reject) => {
            let NewSong = new Song(obj);
            NewSong.save((err, doc) => {
                if (err == null) resolve({ status: true, msg: 'OK' });
                else reject({ status: false, msg: 'Failed' })
            })
        })

    }
}