import { queryRunner } from "../lib/query-runner"
import { User } from '../entities/User'
import bcrypt from 'bcrypt'

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
    
    static generateRadomPassword() {
        const length = 8
        const lowerCaseChars = 'abcdefghijklmnopqrstuvwyz'
        const upperCaseChars = lowerCaseChars.toUpperCase()
        const numbers = '0123456789'
        const symbols = '!@#$%&:*'

        const charString = lowerCaseChars + upperCaseChars + numbers + symbols
        
        let password = ''
        
        password += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)]
        password += numbers[Math.floor(Math.random() * numbers.length)]
        password += symbols[Math.floor(Math.random() * symbols.length)]

        for(let i = password.length; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charString.length)
            password += charString[randomIndex]
        }

        return password
    }
}