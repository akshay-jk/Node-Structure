import Joi from '../../Configurations/Joi.js'

export default {
    GetPlaylists: async (req, res, next) => {
        next()
    },
    GetPlaylist: async (req, res, next) => {
        next()
    },
    AddPlaylist: async (req, res, next) => {
        const BodyPayload = Joi.object({
            "User": Joi.string().required(),
            "Songs": Joi.array().items(Joi.string().required()).required(),
            "Name": Joi.string().required()
        })

        let { error, value } = BodyPayload.validate(req.body, { abortEarly: false });
        if (error == null) next();
        else res.status(200).json({
            status: false, msg: 'Payload Structure Issue', data: { err: error['details'].map((e) => e.message) }
        })
    },
    AddSongs: async (req, res, next) => {
        const BodyPayload = Joi.object({
            "User": Joi.string().required(),
            "Songs": Joi.array().items(Joi.string().required()).required(),
            "Name": Joi.string().required()
        })

        let { error, value } = BodyPayload.validate(req.body, { abortEarly: false });
        if (error == null) next();
        else res.status(200).json({
            status: false, msg: 'Payload Structure Issue', data: { err: error['details'].map((e) => e.message) }
        })
    },
    ShufflePlaylist: async (req, res, next) => {
        next()
    }
}