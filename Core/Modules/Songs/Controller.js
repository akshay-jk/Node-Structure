import ServiceSong from './Service.Song.js'

export default {
    GetSongs: async (req, res) => {
        ServiceSong.GetSongs({}, { CreatedAt: 0 })
            .then((succ) => {
                res.status(200).json({ status: true, msg: 'Songs List', data: { songs: succ['songs'] } });
            }).catch((err) => {
                res.status(200).json({ status: false, msg: 'No Songs List', data: { songs: [] } });
            })
    },
    GetSong: async (req, res) => {
        let { songId } = req.params;
        ServiceSong.GetSong({ _id: songId }, { CreatedAt: 0 })
            .then((succ) => {
                res.status(200).json({ status: true, msg: 'Song Details', data: { song: succ['songs'] } });
            }).catch((err) => {
                res.status(200).json({ status: true, msg: 'Song Details Not Found', data: { song: {} } });
            })
    },
    SearchSong: async (req, res) => {
        let { KeyWord } = req.query;
        let SearchFilter = {
            $or: [
                { Name: { '$regex': KeyWord, '$options': 'i' } },
                { Album: { '$regex': KeyWord, '$options': 'i' } }
            ]
        }
        ServiceSong.GetSongs(SearchFilter, { CreatedAt: 0 })
            .then((succ) => {
                res.status(200).json({ status: true, msg: 'Song Details', data: { song: succ['songs'] } });
            }).catch((err) => {
                res.status(200).json({ status: true, msg: 'Song Details Not Found', data: { song: {} } });
            })
    },
    AddSong: async (req, res) => {
        let { Name, Singers, Album } = req.body;
        ServiceSong.AddSong({ Name, Singers, Album })
            .then((succ) => {
                res.status(200).json({ status: true, msg: succ['msg'], data: {} })
            }).catch((err) => {
                res.status(200).json({ status: false, msg: err['msg'], data: {} })
            })
    }
}