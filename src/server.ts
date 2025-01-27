import express from 'express'
import { AppDataSource } from './data-source'

const app = express()

AppDataSource.initialize()
    .then(() => {
        app.use(express.json())

        app.get('/', (req, res) => {
            res.json({message: 'hello world'})
        })

        app.listen(3000, () => console.log('servidor rodando meu nobre'))
    })