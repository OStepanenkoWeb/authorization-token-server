const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-sevice')
const tokenService = require('./token-serice')
const userDto = require('../dtos/user-dto')

class UserService {
    async registration(email, password) {
        const collection = UserModel.collection
        const candidate = await UserModel.findOne({ email }).exec()

        if (candidate) {
            throw new Error('The user with the specified email already exists ')
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await UserModel.create({ email, password:hashPassword, activationLink })

        await mailService.sendActivationMail(email, activationLink)

        const userData = new userDto(user)
        console.log(userData)
        const tokens = tokenService.generateToken({...userData})

        await tokenService.saveToken(userData.id, tokens.refreshToken)

        return {
           ...tokens,
            user: userData
        }

    }

}

module.exports = new UserService()