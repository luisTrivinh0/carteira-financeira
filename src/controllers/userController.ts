import { Request, Response } from "express";
import { register, login } from "../services/userService";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const data = await register(name, email, password);
        res.status(201).json(data);
    } catch (error: any) {
        console.error("Erro ao registrar usuário:", error);
        res.status(400).json({ message: error.message || "Erro desconhecido ao registrar usuário." });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const data = await login(email, password);
        res.status(200).json(data);
    } catch (error: any) {
        console.error("Erro ao fazer login:", error);
        res.status(400).json({ message: error.message || "Erro desconhecido ao fazer login." });
    }
};
