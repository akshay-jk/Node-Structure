import Joi from '../../Configurations/Joi.js'

export default {
    SignUp: async (req, res, next) => {
        const BodyPayload = Joi.object({
            Name: Joi.string().required(),
            Email: Joi.string().required(),
            Password: Joi.string().alphanum().required(),
            Phone: Joi.string().required().length(10)
        })

        let { error, value } = BodyPayload.validate(req.body, { abortEarly: false });
        if (error == null) next();
        else res.status(200).json({
            status: false, msg: 'Payload Structure Issue', data: { err: error['details'].map((e) => e.message) }
        })
    },
    SignIn: async (req, res, next) => {
        const BodyPayload = Joi.object({
            Email: Joi.string().required(),
            Password: Joi.string().alphanum().required()
        })

        let { error, value } = BodyPayload.validate(req.body, { abortEarly: false });
        if (error == null) next();
        else res.status(200).json({
            status: false, msg: 'Payload Structure Issue', data: { err: error['details'].map((e) => e.message) }
        })
    },
    RefreshToken: async (req, res, next) => {
        next();
    }
}