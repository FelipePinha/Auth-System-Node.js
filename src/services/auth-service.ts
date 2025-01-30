import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user-model'

export class AuthService {
    async login(data: {email: string, password: string}) {
        const { email, password } = data

        try {
            const foundUser = await UserModel.findByEmail(email)

            if(!foundUser) {
                throw new Error('User not found')
            }

            if(!bcrypt.compareSync(password, foundUser.password)) {
                throw new Error("Incorrect email or password")
            }

            const jwtSecret = String(process.env.JWT_PASS)
            const token = jwt.sign({id: foundUser.id, email: foundUser.email}, jwtSecret, {
                expiresIn: "8h"
            })

            const {password: _, id, ...loggedUser} = foundUser

            return {
                loggedUser,
                token
            }
        } catch(e) {
            throw e
        }
    }
}