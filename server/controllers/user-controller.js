const userService = require('../service/user-service')
const MAX_AGE = 2592000000 // 30d * 24h * 60m * 60s * 1000ms

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password} = req.body
            const userData = await userService.registration(email, password)

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: MAX_AGE,
                httpOnly: true
            })

            return res.json(userData)
        } catch (e) {
            console.error('Error registration in UserController: ', e)
        }
    }

    async login(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {

        }
    }


    async activate(req, res, next) {
        try {
            const activationLink = req.params.link

            await userService.activate(activationLink)

            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            console.error('Error in activate method:', e)
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async getUser(req, res, next) {
        try {
            res.json(['123', '4343'])
        } catch (e) {
          console.error(e)
        }
    }

}

module.exports = new UserController()