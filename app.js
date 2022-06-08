
const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.APP_PORT || 3001
const HOST = process.env.APP_IP || 'localhost'

const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes')

const {authenticateJWT} = require('./middleware/middleware')



app.use(express.json())

app.use('/auth', authRouter)
app.use('/api', authenticateJWT, userRouter)
//app.use('/api',auth.tokenGenerate)
app.listen(PORT,()=> console.log(`server listening on http://${HOST}:${PORT}`))
