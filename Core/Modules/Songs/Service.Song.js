import DB from './DataBaseAccess.js'

export default {
    GetSongs: async (filter, projection) => {
        return new Promise((resolve, reject) => {
            DB.FindSongs(filter, projection)
                .then((songs) => {
                    resolve({ status: true, songs: songs['songs'] })
                }).catch((err) => {
                    reject({ status: false, songs: [] })
                })
        })
    },
    GetSong: async (filter, projection) => {
        return new Promise((resolve, reject) => {
            DB.FindSong(filter, projection)
                .then((songs) => {
                    resolve({ status: true, songs: songs['song'] })
                }).catch((err) => {
                    reject({ status: false, songs: {} })
                })
        })
    },
    AddSong: async (obj) => {
        return new Promise((resolve, reject) => {
            DB.AddSong(obj).then((succ) => {
                resolve({ status: true, msg: 'Song Added' })
            }).catch((err) => {
                reject({ status: false, msg: 'Song Addition Failed' })
            })
        })
    }
}