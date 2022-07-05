const db = require('../db')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

const User = require('../models/user')
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET


class UserController {
    async getUsers(req, res, next) {
        let users = []
        try {
            users = await User.find({})
        } catch (err) {
            return next(err)
        }
        res.json(users)
    }
    async createUser(req, res, next) {
        const { username, password, role } = req.body
        try {
            await User.create({ username, password, role })
        } catch (err) {
            return next(err)
        }
        res.json({ message: "created successful" })
    }
    async updateUser(req, res, next) {
        const { id, property, value } = req.body
        const filter = { id: new mongoose.Types.ObjectId(id) };
        try {
            switch (property) {
                case ('login'): {
                    await User.findOneAndUpdate(filter, { login: value });
                    break;
                }
                case ('password'): {
                    await User.findOneAndUpdate(filter, { password: value });
                    break;
                }
                default: {
                    break;
                }
            }

        } catch (err) {
            return next(err)
        }
        res.json({ message: "user updated successful" })
    }
    async deleteUser(req, res, next) {
        let id = req.params.id
        try {
            await User.deleteOne({ "_id": new mongoose.Types.ObjectId(id) });
        } catch (err) {
            return next(err)
        }
        res.json({ message: "deleted successful" })
    }

}

module.exports = new UserController()
