import express from 'express'
import { AppDataSource } from './data-source'
import { authRoutes } from './controllers/auth-controller'
import { userRoutes } from './controllers/user-controller'

const app = express()

AppDataSource.initialize()
    .then(() => {
        app.use(express.json())
        app.use('/auth', authRoutes)
        app.use('/user', userRoutes)

        app.listen(3000, () => console.log('Server running'))
    })