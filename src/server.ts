import express from 'express'
import { AppDataSource } from './data-source'
import { authRoutes } from './controllers/auth-controller'

const app = express()

AppDataSource.initialize()
    .then(() => {
        app.use(express.json())
        app.use('/auth', authRoutes)

        app.listen(3000, () => console.log('servidor rodando meu nobre'))
    })