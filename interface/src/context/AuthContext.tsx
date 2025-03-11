import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null);
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post("http://localhost:3000/api/users/login", { email, password });
            localStorage.setItem("user", JSON.stringify(res.data));
            setUser(res.data);
            navigate("/dashboard");
        } catch (error) {
            console.error("Erro no login", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
