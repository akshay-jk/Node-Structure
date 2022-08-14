import ServiceAuth from "./Service.Auth.js";

export default {
    SignUp: async (req, res) => {
        let { Name, Email, Password, Phone } = req.body;
        ServiceAuth.CheckUser(Name, Email, Phone)
            .then((checkSucc) => {
                res.status(200).json({ status: false, msg: 'User With Same Credentials Exist', data: {} })
            }).catch((err) => {
                ServiceAuth.PasswordHash(Password).then((PassHash) => {
                    ServiceAuth.AddUser({ Name, Email, Hash: PassHash['hash'], Phone }).then((AddStatus) => {
                        res.status(200).json({ status: true, msg: 'Sign Up Success', data: {} });
                    }).catch((err) => {
                        res.status(200).json({ status: false, msg: 'Sign Up Error', data: {} });
                    })
                }).catch((err) => {
                    res.status(200).json({ status: false, msg: 'Sign Up Error', data: {} });
                })
            })
    },
    SignIn: async (req, res) => {
        let { Email, Password } = req.body;
        ServiceAuth.CheckUser('', Email, '')
            .then(async (user) => {
                let StatusFlag = await ServiceAuth.ValidatePassword(user['userDetails']['Email'], Password);
                if (StatusFlag) {
                    ServiceAuth.IntiateLogin(user['userDetails'].toObject())
                        .then((succ) => {
                            res.setHeader('Set-Cookie', 'sessionID=' + succ['sessionID'])
                            res.status(200).json({ status: true, msg: 'Sign In Successfull', data: succ['token'] });
                        }).catch((err) => {
                            console.log(err);
                            res.status(200).json({ status: false, msg: 'Sign In Unsuccessfull', data: {} });
                        })
                } else {
                    res.status(200).json({ status: false, msg: 'Sign In Unsuccessfull', data: {} });
                }
            }).catch((err) => {
                res.status(200).json({ status: false, msg: `Email Doesn't Exist !`, data: {} });
            })
    },
    RefreshToken: async (req, res) => {
        let { refresh_token } = req.headers
        ServiceAuth.RefreshToken(refresh_token)
            .then((succ) => {
                res.setHeader('Set-Cookie', 'sessionID=' + succ['sessionID'])
                res.status(200).json({ status: true, msg: 'Refresh Token Success', data: succ['token'] });
            }).catch((err) => {
                res.status(200).json({ status: false, msg: 'Refresh Token Failure', data: {} });
            })
    }
}