import { Router } from "express";
import { AuthService } from "../services/auth-service";

export const authRoutes = Router()

const authService = new AuthService()

authRoutes.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400).json({message: 'Field is missing'})
        return
    }

    const user = await authService.register({name, email, password})

    res.status(201).json({name: user?.name, email: user?.email, createdAt: user?.createdAt})
})

authRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        res.status(400).json({message: 'Field is missing'})
        return
    }
    
    const loggedUser = await authService.login({ email, password })

    res.json(loggedUser)
})
