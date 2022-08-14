import ServicePlaylist from './Service.Playlist.js'

export default {
    GetPlaylists: async (req, res) => {
        ServicePlaylist.GetPlaylists({}, { CreatedAt: 0 })
            .then((succ) => {
                res.status(200).json({ status: true, msg: 'Playlists List', data: { playlists: succ['playlists'] } });
            }).catch((err) => {
                res.status(200).json({ status: false, msg: 'No Playlists List', data: { playlists: [] } });
            })
    },
    GetPlaylist: async (req, res) => {
        let { PlaylistId } = req.params;
        ServicePlaylist.GetPlaylist({ _id: PlaylistId }, { CreatedAt: 0 })
            .then((succ) => {
                res.status(200).json({ status: true, msg: 'Playlist Details', data: { playlist: succ['playlists'] } });
            }).catch((err) => {
                res.status(200).json({ status: true, msg: 'Playlist Details Not Found', data: { playlist: {} } });
            })
    },
    AddPlaylist: async (req, res) => {
        let { User, Songs, Name } = req.body;
        ServicePlaylist.AddPlaylist({ User, Songs, Name })
            .then((succ) => {
                res.status(200).json({ status: true, msg: succ['msg'], data: {} })
            }).catch((err) => {
                res.status(200).json({ status: false, msg: err['msg'], data: {} })
            })
    },
    AddSongs: async (req, res) => {
        let { PlaylistID } = req.params;
        let { Songs } = req.body;
        ServicePlaylist.AddSongs({ PlaylistID, Songs })
            .then((succ) => {
                res.status(200).json({ status: true, msg: 'Songs Added To Playlist', data: {} });
            }).catch((err) => {
                res.status(200).json({ status: false, msg: 'Songs Failed To Add', data: {} })
            })
    },
    ShufflePlaylist: async (req, res) => {
        let { PlaylistID } = req.params;
        ServicePlaylist.ShufflePlaylist({ _id: PlaylistID }, { CreatedAt: 0 })
            .then((succ) => {
                res.status(200).json({ status: true, msg: 'Playlist Details', data: { Songs: succ['Songs'] } });
            }).catch((err) => {
                res.status(200).json({ status: true, msg: 'Playlist Details Not Found', data: { Songs: {} } });
            })
    }
}