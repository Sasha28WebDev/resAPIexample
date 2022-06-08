const db = require('../db')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
let refreshTokens = [];

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

const User = require('../models/user')

class UserController {
    async loginToService(req, res, next) {
        try {
            let users = await User.find({})

            // Read username and password from request body
            const { username, password } = req.body

            // Filter user from the users array by username and password
            const user = users.find(u => { return u.username === username && u.password === password })
            if (user) {
                // Generate an access token
                const accessToken = jwt.sign({ username: user.username, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
                const refreshToken = jwt.sign({ username: user.username, role: user.role }, REFRESH_TOKEN_SECRET)
                refreshTokens.push(refreshToken);
                res.json({
                    accessToken,
                    refreshToken
                });
            } else {
                res.send('Username or password incorrect')
            }

        } catch (err) {
            return next(err)
        }
    }
    
    tokenGenerate(req, res, next) {
        const { token } = req.body
        if (!token) {
            return res.sendStatus(401)
        }
        if (!refreshTokens.includes(token)) {
            return res.sendStatus(403)
        }
        jwt.verify(token, REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            const accessToken = jwt.sign({ username: user.username, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
            /* res.json({
                accessToken
            })  */
            req.token = accessToken
            console.log(token)
            next()
        })
    }
    logoutService(req, res) {
        const { token } = req.body;
        refreshTokens = refreshTokens.filter(token => t !== token);
        res.send("Logout successful");
    }
}

module.exports = new UserController()