import { Router } from "express";
import { AuthService } from "../services/auth-service";

export const authRoutes = Router()

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
