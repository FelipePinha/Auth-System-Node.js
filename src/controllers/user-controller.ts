import { Router } from "express"
import { UserService } from "../services/user-service"

export const userRoutes = Router()
const userService = new UserService()

userRoutes.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400).json({message: 'Field is missing'})
        return
    }
    
    const user = await userService.register({name, email, password})

    res.status(201).json({name: user?.name, email: user?.email, createdAt: user?.createdAt})
})

userRoutes.get('/password/random', (req, res) => {
    const password = UserService.generateRadomPassword()

    res.json({ password })
})

userRoutes.post('/password/forgot', async (req, res) => {
    const { email } = req.body

    const response = await userService.forgotPassword(email)

    res.status(response.status).json({message: response.message})
})