import { queryRunner } from "../lib/query-runner"
import { User } from '../entities/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { EmailService } from "./email-service"
import { UserModel } from "../models/user-model"

export class UserService {
    async register(data: {name: string, email: string, password: string}) {
        const { name, email, password } = data
        
        await queryRunner.startTransaction()
        try {
            const hashedPassword = bcrypt.hashSync(password, 10)

            const user = await queryRunner.manager.save(User, {name, email, password: hashedPassword})

            await queryRunner.commitTransaction()
            return user
        } catch (e) {
            await queryRunner.rollbackTransaction()
            throw e
        }
    }
    
    generateRadomPassword() {
        const length = 8
        const lowerCaseChars = 'abcdefghijklmnopqrstuvwyz'
        const upperCaseChars = lowerCaseChars.toUpperCase()
        const numbers = '0123456789'
        const symbols = '!@#$%&:*'

        const charString = lowerCaseChars + upperCaseChars + numbers + symbols
        
        let password = this.joinRequiredChars(upperCaseChars, numbers, symbols)

        for(let i = password.length; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charString.length)
            password += charString[randomIndex]
        }

        return password
    }

    private joinRequiredChars(upperCaseChars: string, numbers: string, symbols: string): string {
        const upperCaseChar = upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)]
        const number = numbers[Math.floor(Math.random() * numbers.length)]
        const symbol = symbols[Math.floor(Math.random() * symbols.length)]

        return upperCaseChar + number + symbol
    }

    async forgotPassword(email: string) {
        try {
            const user = await UserModel.findByEmail(email)

            if(!user) {
                throw new Error('User not found')
            }

            const token = jwt.sign({email}, String(process.env.JWT_PASS), { expiresIn: '1h' })

            await EmailService.sendMail(email, token)

            return {
                message: 'Email sent'
            }
        } catch (e) {
            throw e
        }
    }

    async resetPassword(password: string, token: string) {
        queryRunner.startTransaction()
        try {
            const decode = jwt.verify(token, process.env.JWT_PASS!) as { email: string }

            const user = await UserModel.findByEmail(decode.email)

            if(!user) {
                throw new Error('User not found')
            }

            const hashedPassword = bcrypt.hashSync(password, 10)

            await queryRunner.manager.update(User, user.id, { password: hashedPassword })
            queryRunner.commitTransaction()
            
            return {
                message: 'Password updated'
            }
        } catch (e) {
            queryRunner.rollbackTransaction()
            throw e
        }
    }
}