import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    name: String

    @Column({type: 'text'})
    email: string

    @Column({type: 'text'})
    password: string

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date
}