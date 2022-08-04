const { success, badRequest, onError, serverValidation, unknownError, created } = require('../helpers/response_helper')
const { validationResult } = require('express-validator')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const { generateRegisterationToken, generateUserToken, parseJwt } = require('../middleware/isAuthenticated')
const { login, register } = require('../helpers/user.helper')


module.exports = {
    login: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const { username, password } = req.body;
            const check = await login(username, password);
            if (check) {
                const token = generateUserToken(check);
                return check.isRegisterd ? success(res, "login successfull", token) : created(res, "login succesfull", token);
            }
            return badRequest(res, "user not found");
        } catch (error) {
            console.log(error);
            return unknownError(res, "unknown error")
        }
    },
    register: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return badRequest(res, "bad request")
            }
            const { clientId } = parseJwt(req);
            const addUser = await register(clientId, req.body);
            return addUser ? created(res, "profile added") : badRequest(res, "bad request");
        } catch (error) {
            console.log(error)
            return unknownError(res, "unknown error")
        }
    },
 
    getUser: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                serverValidation(res, { errorName: "serverValidation", errors: errors.array() })
            } else {
                const userId = req.params.id
                const userDetails = await userModel.findById(userId)
                if (userDetails) {
                    success(res, 'here is user info', userDetails)
                } else {
                    badRequest(r4es, 'cannot find user')
                }
            }
        } catch (error) {
            console.log(error)
            onError(res, error)
        }
    },
    getAll: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                serverValidation(res, { errorName: "serverValidation", errors: errors.array() })
            } else {
                const users = await userModel.find()
                if (users.length > 0) {
                    success(res, 'heres all the user', users)
                } else {
                    badRequest(res, 'no users found')
                }
            }
        } catch (error) {
            console.log(error)
            onError(res, error)
        }
    }
}