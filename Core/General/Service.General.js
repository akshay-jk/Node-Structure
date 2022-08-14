import ServiceAuth from '../Modules/Auth/Service.Auth.js'

export default {
    RequestValidator: async function (req, res, next) {
        try {
            let { access_token } = req.headers;
            ServiceAuth.DehashToken(access_token)
                .then((succ) => {
                    req.User = succ['payload'];
                    ServiceAuth.GetSession(succ['payload']['_id'])
                        .then((sess) => {
                            ServiceAuth.DehashToken(sess['sess']['Hash'])
                                .then((SessPayload) => {
                                    if (SessPayload['payload']['User'] == succ['payload']['Email']) {
                                        next()
                                    } else {
                                        res.status(200).json({ status: false, msg: 'Authentication Failed', data: {} })
                                    }
                                }).catch((err) => {
                                    res.status(200).json({ status: false, msg: 'Authentication Failed', data: {} })
                                })
                        }).catch((err) => {
                            res.status(200).json({ status: false, msg: 'Authentication Failed', data: {} })
                        })
                }).catch((err) => {
                    res.status(200).json({ status: false, msg: 'Token Expired. Proceed To Login', data: {} })
                })
        } catch (e) {
            res.status(200).json({ status: false, msg: 'Authentication Failed', data: {} })
        }
    }
}