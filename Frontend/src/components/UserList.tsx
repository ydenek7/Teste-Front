import React from "react";
import { useUserContext } from "../context/UserContext.tsx"; 


const UserList : React.FC = () => {
    const { users, createUser, deleteUser } = useUserContext();

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>Lista</h2>
            <button
                onClick={() => createUser("Novo usuário", "novo@email")}
                style={{ marginBottom: "10px", padding: "5px", cursor: "pointer" }}


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