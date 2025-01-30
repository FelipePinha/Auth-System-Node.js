import { User } from "../entities/User";
import { queryRunner } from "../lib/query-runner";

export class UserModel {
    static async findByEmail(email: string) {
        const user = await queryRunner.manager.findOne(User, {
            where: {
                email: String(email)
            }
        })

        return user
    }
}