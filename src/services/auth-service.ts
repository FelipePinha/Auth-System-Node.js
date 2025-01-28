import bcrypt from 'bcrypt'
import { User } from '../entities/User'
import { queryRunner } from '../lib/query-runner'
import jwt from 'jsonwebtoken'

export class AuthService {
    async login(data: {email: string, password: string}) {
        const { email, password } = data

        await queryRunner.startTransaction()
        try {
            const foundUser = await queryRunner.manager.findBy(User, {
                email
            })

            if(!foundUser) {
                throw new Error('User not found')
            }

            if(!bcrypt.compareSync(password, foundUser[0].password)) {
                throw new Error("Incorrect email or password")
            }

            const jwtSecret = String(process.env.JWT_PASS)
            const token = jwt.sign({id: foundUser[0].id, email: foundUser[0].email}, jwtSecret, {
                expiresIn: "8h"
            })

            const {password: _, id, ...loggedUser} = foundUser[0] 

            return {
                loggedUser,
                token
            }
        } catch(e) {
            await queryRunner.rollbackTransaction()
            throw e
        }
    }
}