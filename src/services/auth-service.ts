import bcrypt from 'bcrypt'
import { User } from '../entities/User'
import { queryRunner } from '../lib/query-runner'

export class AuthService {
    async register(data: {name: string, email: string, password: string}) {
        const { name, email, password } = data
        
        const hashedPassword = bcrypt.hashSync(password, 10)
        
        await queryRunner.startTransaction()

        try {
            const user = await queryRunner.manager.save(User, {name, email, password: hashedPassword})

            await queryRunner.commitTransaction()
            return user
        } catch (e) {
            await queryRunner.rollbackTransaction()
            throw e
        }
    }
}