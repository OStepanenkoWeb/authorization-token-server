const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const userDto = require('../dtos/user-dto')
const ApiError = require('../exeptions/api-error')

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email }).exec()

        if (candidate) {
            throw ApiError.BadRequest(`The user with the specified ${email} already exists `)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await UserModel.create({ email, password:hashPassword, activationLink })

        const activationUrl = `${process.env.API_URL}/api/activate/${activationLink}`

        await mailService.sendActivationMail(email, activationUrl)

        return await this.saveUserToken(user)

    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink } )

        if(!user) {
            throw ApiError.BadRequest('The user with the specified link does not exist')
        }

        user.isActivated = true

        await user.save()
    }

    async login(email, password) {
        const user = await UserModel.findOne( { email } )

        if (!user) {
            throw ApiError.BadRequest('User with this email was not found')
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password)

        if (!isPasswordEquals) {
            throw ApiError.BadRequest('Password is not correct')
        }

        return await this.saveUserToken(user)
    }

    async logout (refreshToken) {
        return await tokenService.removeToken(refreshToken)
    }

    async refresh (refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }

        const user = await UserModel.findById( userData.id )

        return await this.saveUserToken(user)
    }

    async getAllUsers () {
        return UserModel.find();
    }

    async saveUserToken (user) {
        const userData = new userDto(user)

        const tokens = tokenService.generateToken({...userData})
        await tokenService.saveToken(userData.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userData
        }
    }

}

module.exports = new UserService()