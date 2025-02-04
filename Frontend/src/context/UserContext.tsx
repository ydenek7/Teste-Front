import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from './config.ts';


//------------------------------------------------------------------------------------------------------------\\


interface User {
    id: number;
    name: string;
    email: string;
}


interface UserContextType {
    users: User[];
    fetchUsers: () => void;
    createUser: (name: string, email: string) => void;
    updateUser: (id: number, name: string, email: string) => void;
    deleteUser: (id: number) => void;
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/users`);
            setUsers(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Erro ao buscar usuários", error);
        }
    };

    const createUser = async (name: string, email: string) => {
        try {
            const response = await axios.post(`${config.API_URL}/users`, { name, email });
            setUsers([...users, response.data]);
        } catch (error) {
            console.error("Erro ao criar usuário", error);
        }
    };

    const updateUser = async (id: number, name: string, email: string) => {
        try {
            const response = await axios.put(`${config.API_URL}/users/${id}`, { name, email });
            setUsers(users.map(user => user.id === id ? response.data : user));
        } catch (error) {
            console.error("Erro ao atualizar usuário", error);
        }
    };

    const deleteUser = async (id: number) => {
        try {
            await axios.delete(`${config.API_URL}/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error("Erro ao deletar usuário", error);
        }
    };

    return (
        <UserContext.Provider value={{ users, fetchUsers, createUser, updateUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("");
    return context;
};


