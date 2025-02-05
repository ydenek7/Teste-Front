import React, { useState } from "react";
import useUserContext from '../context/UserContext.tsx';



const UserList: React.FC = () => {
    const { users, createUser, deleteUser } = useUserContext();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const handleAddUser = () => {
        if (name && email) {
            createUser(name, email);
            setName('');
            setEmail('');
        } else {
            alert("preencha todos os campos")
        }

    }

    return (


        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>


            <input type="text"
                placeholder="nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginBottom: '10px', padding: '5px', width: '100%' }} />

            <input type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginBottom: '10px', padding: '5px', width: '100%' }} />


            <h2>Lista</h2>


            <button
                onClick={handleAddUser}
                style={{ marginBottom: '10px', padding: '5px', cursor: 'pointer' }}
            >Adicionar</button>

            <ul>
                {users.map((user) => (
                    <li key={user.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                        {user.name} {user.email}
                        <button onClick={() => deleteUser(user.id)} style={{ marginLeft: "10px", cursor: "pointer" }}>
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
        </div>


    )
}


export default UserList;
