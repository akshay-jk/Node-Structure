import fs from 'fs';
import Bcrypt from '../../Configurations/Bcrypt.js';
import Jwt from '../../Configurations/JsonWebToken.js'

import DB from './DataBaseAccess.js';

import GlobalValues from '../../Utilities/GlobalValues.js';

export default {
    getPrivateKey: async () => {
        return new Promise((resolve, reject) => {
            fs.readFile(CurrentWorkingDirectory + '/Core/Utilities/PrivateKey.txt', { encoding: 'utf-8' }, (err, PrKey) => {
                if (err == null) {
                    resolve({ status: true, PrKey })
                } else {
                    reject({ status: false, PrKey: '' })
                }
            })
        })
    },
    CheckUser: async (Name, Email, Phone) => {
        return new Promise(async (resolve, reject) => {
            try {
                let userDetails = await DB.GetUser({ $or: [{ Name }, { Email }, { Phone }] }, { PasswordHash: 0 });
                if (!userDetails['status']) {
                    reject({ status: false, userDetails: "" })
                } else {
                    resolve({ status: true, userDetails: userDetails['user'] })
                }
            } catch (e) {
                reject({ status: false, userDetails: "" })
            }
        })
    },
    PasswordHash: async (password) => {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err, Hash) => {
                if (err) reject({ status: false, hash: '' })
                else resolve({ status: true, hash: Hash })
            })
        })
    },
    AddUser: async (obj) => {
        return new Promise(async (resolve, reject) => {
            try {
                await DB.NewUser({ ...obj });
                resolve({ status: true, data: {} })
            } catch (e) {
                reject({ status: false, data: {} })
            }
        })
    },
    ValidatePassword: async (id, Password) => {
        try {
            let UserDetails = await DB.GetUser({ $or: [{ Email: id }, { Phone: id }] }, { PasswordHash: 1 });
            if (UserDetails['status']) {
                let PasswordCheck = Bcrypt.compareSync(Password, UserDetails['user']['PasswordHash']);
                if (PasswordCheck) return true;
                else return false;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    },
    HashToken: async function (obj, TTL) {
        return new Promise((resolve, reject) => {
            this.getPrivateKey().then((pk) => {
                if (pk['status']) {
                    Jwt.sign(obj, pk['PrKey'], { algorithm: "RS256", expiresIn: TTL ? GlobalValues.RefreshTokenTTL : GlobalValues.AuthTokenTTL },
                        (err, token) => {
                            if (err == null) resolve({ status: true, token })
                            else reject({ status: false, token: '' })
                        });
                } else {
                    reject({ status: false, token: '' })
                }
            }).catch((err) => {
                reject({ status: false, token: '' })
            })
        })
    },
    DehashToken: async function (Hash) {
        return new Promise((resolve, reject) => {
            this.getPrivateKey().then((pk) => {
                if (pk['status']) {
                    Jwt.verify(Hash, pk['PrKey'], { algorithms: ["RS256"] }, (err, payload) => {
                        if (err == null) resolve({ status: true, payload })
                        else reject({ status: false, payload: '' })
                    });
                } else {
                    reject({ status: false, payload: '' })
                }
            }).catch((err) => {
                reject({ status: false, payload: '' })
            })
        })
    },
    GetSession: async function (User) {
        return new Promise((resolve, reject) => {
            DB.GetSession({ User }, {})
                .then((succ) => resolve({ status: true, sess: succ['sess'] }))
                .catch((err) => reject({ status: false, sess: {} }))
        })
    },
    CreateSession: async function (User) {
        return new Promise((resolve, reject) => {
            this.HashToken({ User: User['Email'] }, false).then((Hash) => {
                DB.CreateSession({ User: User['_id'], Hash: Hash['token'] }).then((succ) => {
                    resolve({ status: true, sessionID: succ['sessionId'] })
                }).catch((e) => {
                    reject({ status: false, sessionID: "" })
                })
            }).catch((e) => {
                reject({ status: false, sessionID: "" })
            })
        })
    },
    IntiateLogin: async function (obj) {
        return new Promise(async (resolve, reject) => {
            this.HashToken(obj, false)
                .then((AuthToken) => {
                    this.HashToken(obj, true).then((RefreshToken) => {
                        this.CreateSession(obj).then((sessSucc) => {
                            resolve({ status: true, token: { AuthToken: AuthToken['token'], RefreshToken: RefreshToken['token'] }, sessionID: sessSucc['sessionID'] })
                        }).catch((sessErr) => {
                            reject({ status: false, token: {}, sessionID: '' })
                        })
                    }).catch((err) => {
                        reject({ status: false, token: {}, sessionID: '' })
                    })
                }).catch((err) => {
                    reject({ status: false, token: {}, sessionID: '' })
                })
        })
    },
    RefreshToken: async function (Hash) {
        return new Promise(async (resolve, reject) => {
            this.DehashToken(Hash)
                .then((succ) => {
                    delete succ['payload']['iat']
                    delete succ['payload']['exp']
                    this.IntiateLogin(succ['payload'])
                        .then((sessSucc) => {
                            resolve({ status: true, token: sessSucc['token'], sessionID: sessSucc['sessionID'] })
                        }).catch((err) => {
                            reject({ status: false, token: {}, sessionID: '' })
                        })
                }).catch((err) => {
                    reject({ status: false, token: {}, sessionID: '' })
                })
        })
    }
}