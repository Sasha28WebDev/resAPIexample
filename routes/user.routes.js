const Router = require('express')
const router = new Router()
const user = require('../controllers/user.controller')

router.post('/user',user.createUser)
router.get('/users',user.getUsers)
router.put('/user',user.updateUser)
router.delete('/users/:id',user.deleteUser)

module.exports = router