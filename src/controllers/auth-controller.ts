import { Router } from "express";
import { AuthService } from "../services/auth-service";
import { UserService } from "../services/user-service";

export const authRoutes = Router()

authRoutes.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400).json({message: 'Field is missing'})
        return
    }

    const userService = new UserService()
    const user = await userService.register({name, email, password})

    res.status(201).json({name: user?.name, email: user?.email, createdAt: user?.createdAt})
})

authRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        res.status(400).json({message: 'Field is missing'})
        return
    }

    const authService = new AuthService()
    const loggedUser = await authService.login({ email, password })

    res.json(loggedUser)
})

authRoutes.get('/random', (req, res) => {
    const password = UserService.generateRadomPassword()

    res.json({ password })
})
