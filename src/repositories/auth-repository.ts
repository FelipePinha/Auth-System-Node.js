import { AppDataSource } from "../data-source";
import { User } from "../entities/User";


export const authRepository = AppDataSource.getRepository(User)