import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Login = () => {
    const { login } = useContext(AuthContext)!;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        await login(email, password);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 10, p: 3, border: "1px solid gray", borderRadius: "10px", textAlign: "center" }}>
                <Typography variant="h5">Login</Typography>
                <TextField label="Email" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Senha" type="password" fullWidth margin="normal" onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
                    Entrar
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
