import User from '../../DatabaseModels/UserModel.js'
import Session from '../../DatabaseModels/SessionModel.js';

export default {
    GetUsers: async (findQuery, projectionQuery) => {
        User.find(findQuery, projectionQuery, (err, UserDetail) => {
            if (err == null) {
                return false;
            } else {
                return UserDetail;
            }
        })
    },
    GetUser: async (findQuery, projectionQuery) => {
        return new Promise((resolve, reject) => {
            User.findOne(findQuery, projectionQuery, (err, UserDetail) => {
                if (err == null) {
                    if (UserDetail == null) {
                        reject({ status: false, user: {} })
                    } else {
                        resolve({ status: true, user: UserDetail });
                    }
                } else {
                    reject({ status: false, user: {} })
                }
            })
        })
    },
    NewUser: async (Obj) => {
        let { Name, Email, Hash, Phone } = Obj
        let NewUser = new User({ Name, Email, PasswordHash: Hash, Phone, CreatedAt: new Date(), UpdatedAt: new Date() });
        NewUser.save((err, saved) => {
            if (err) { return false }
            else { return true }
        })
    },
    GetSession: async (filter, projection) => {
        return new Promise((resolve, reject) => {
            Session.findOne(filter, projection, (err, sess) => {
                if (err == null) resolve({ status: true, sess })
                else reject({ status: false, sess: {} })
            })
        })
    },
    CreateSession: async (Obj) => {
        return new Promise((resolve, reject) => {
            let { User, Hash } = Obj;
            Session.findOneAndUpdate({ User }, { Hash }, { upsert: true, returnOriginal: false }, (err, returnStatus) => {
                if (err == null) {
                    resolve({ status: true, sessionId: returnStatus['_id'] })
                } else {
                    reject({ status: true, sessionId: '' })
                }
            })
        })
    }
}