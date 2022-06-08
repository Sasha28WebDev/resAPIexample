const Router = require('express')
const router = new Router()
const auth = require('../controllers/auth.controller')

router.post('/login',auth.loginToService);
router.post('/token', auth.tokenGenerate);
router.post('/logout', auth.logoutService);

module.exports = router