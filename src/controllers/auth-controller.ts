import { Router } from "express";
import { AuthService } from "../services/auth-service";

export const authRoutes = Router()

authRoutes.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400).json({message: 'Field is missing'})
        return
    }

    const authService = new AuthService()
    const user = await authService.register({name, email, password})

    res.json({name: user?.name, email: user?.email, createdAt: user?.createdAt})
})
