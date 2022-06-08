
require('dotenv').config()
const mongoose = require('mongoose')
const { DB_CONNECTION_STRING } = process.env
const User = require('./models/user')

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    //useCreateIndex: true
})
const db = mongoose.connection
db.on('error', err => {
    console.error('Ошибка MongoDB' + err.message)
    process.exit(1)
})
db.once('open', () => { console.log('Установлено соедниение с MongoDB') })


//Если записей в бд нет,то наполняем ее базовыми данными
User.find((err, data) => {
    if (err) return console.error(err)
    if (data.length) return

    new User(
        {
            username: 'Alex',
            password: 'password123admin',
            role: 'admin'
        }
    ).save()

    new User({
        username: 'Petr',
        password: 'password123member',
        role: 'user'
    }).save()
})

module.exports = db