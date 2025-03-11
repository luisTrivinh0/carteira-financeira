import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Button, Typography, Box, TextField, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import { NumericFormat } from "react-number-format";

// Definir o tipo de uma transação
interface Transaction {
    id: string;
    senderId: string;
    receiverId: string;
    amount: number;
    status: string;
    createdAt: string;
    reversedTransactionId: string;
}

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext)!;
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]); // 🛠 Definir o tipo explicitamente
    const [receiverId, setReceiverId] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        fetchBalance();
        fetchTransactions();
    }, []);

    const fetchBalance = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/transactions/${user?.user.id}/balance`);
            setBalance(res.data.balance);
        } catch (error) {
            console.error("Erro ao buscar saldo", error);
        }
    };

    const fetchTransactions = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/transactions/${user?.user.id}`);
            setTransactions(res.data); // 🛠 Agora o TypeScript sabe o tipo correto
        } catch (error) {
            console.error("Erro ao buscar transações", error);
        }
    };

    const handleTransfer = async () => {
        try {
            await axios.post("http://localhost:3000/api/transactions/transfer", {
                senderId: user?.user.id,
                receiverId,
                amount: parseFloat(amount),
            });
            fetchBalance();
            fetchTransactions();
            alert("Transferência realizada com sucesso!");
        } catch (error) {
            console.error("Erro na transferência", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, p: 3, textAlign: "center", border: "1px solid gray", borderRadius: "10px" }}>
                <Typography variant="h5">Bem-vindo, {user?.user.name}</Typography>
                <Typography variant="h6">Saldo: R$ {balance.toFixed(2)}</Typography>
                <TextField label="ID do Destinatário" fullWidth margin="normal" onChange={(e) => setReceiverId(e.target.value)} />
                <NumericFormat
                    value={amount}
                    onValueChange={(values) => setAmount(values.value)}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    customInput={TextField}
                    label="Valor"
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleTransfer} sx={{ mt: 2 }}>
                    Transferir
                </Button>
                <Button variant="contained" color="secondary" fullWidth onClick={logout} sx={{ mt: 2 }}>
                    Sair
                </Button>

                <Typography variant="h6" sx={{ mt: 4 }}>Extrato</Typography>
                <List>
                    {transactions.map((transaction, index) => {
                        const isRefund = transaction.status === "REFUNDED"; // Verifica se é reembolso
                        return (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={`Valor: R$ ${transaction.amount.toFixed(2)} ${isRefund ? "(Reembolso)" : ""}`}
                                    secondary={`De: ${transaction.senderId} → Para: ${transaction.receiverId} | Status: ${transaction.status}`}
                                />
                                {!isRefund && ( // Só exibir botão de reembolso para transações normais
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        sx={{ width: "50%" }}
                                        onClick={async () => {
                                            try {
                                                await axios.post(`http://localhost:3000/api/transactions/refund/${transaction.id}`);
                                                alert("Transação reembolsada com sucesso!");
                                                fetchBalance();
                                                fetchTransactions();
                                            } catch (error) {
                                                console.error("Erro ao reembolsar transação", error);
                                            }
                                        }}
                                    >
                                        Reembolso
                                    </Button>
                                )}
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </Container>
    );
};

export default Dashboard;
