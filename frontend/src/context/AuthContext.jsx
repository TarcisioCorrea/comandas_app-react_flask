import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// Criação do contexto
const AuthContext = createContext();
// Provedor do contexto
export const AuthProvider = ({ children }) => {
    // Inicializa o estado com base no valor do sessionStorage
    // sessionStorage é um armazenamento temporário que persiste enquanto a aba estiver aberta
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem("loginRealizado") === "true";
    });
    // useNavigate é um hook do React Router que permite programaticamente navegar entre rotas
    const navigate = useNavigate();
    // Função para login
    const login = (username, password) => {
        if (username === "abc" && password === "bolinhas") {
            setIsAuthenticated(true);
            sessionStorage.setItem("loginRealizado", "true");
            navigate("/home");
            // Exibe notificação de sucesso
            toast.success("Login realizado com sucesso!");
        } else {
            // Exibe notificação de erro
            toast.error("Usuário ou senha inválidos!");
        }
    };
    // Função para logout
    const logout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem("loginRealizado");
        navigate("/login");
        // Exibe notificação de informação
        toast.info("Logout realizado com sucesso!");
    };
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
// Hook para usar o contexto
export const useAuth = () => useContext(AuthContext);