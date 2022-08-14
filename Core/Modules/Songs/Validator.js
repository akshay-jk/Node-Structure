import Joi from "../../Configurations/Joi.js";

export default {
    GetSongs: async (req, res, next) => {
        next()
    },
    GetSong: async (req, res, next) => {
        next()
    },
    SearchSong: async (req, res, next) => {
        next();
    },
    AddSong: async (req, res, next) => {
        const BodyPayload = Joi.object({
            "Name": Joi.string().required(),
            "Singers": Joi.array().items(Joi.string().required()).required(),
            "Album": Joi.string().required()
        })

        let { error, value } = BodyPayload.validate(req.body, { abortEarly: false });
        if (error == null) next();
        else res.status(200).json({
            status: false, msg: 'Payload Structure Issue', data: { err: error['details'].map((e) => e.message) }
        })
    }
}