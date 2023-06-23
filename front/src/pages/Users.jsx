import { useState, useEffect } from "react";
import {getAllUsers} from "../services/users";
// import userService from "../services/users";


function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        
        (async () => {
            try {
                const result = await getAllUsers();
                setUsers(result.data);
            } catch (error) {
                const {response} = error;
                console.error(error);
            }
        })();

    });

    // const getAllUsers = async () => {
    //     try {
    //         const result = await getAllUsers();
    //         setUsers(result.data);
    //     } catch (error) {
    //         const { response } = error;
    //         if (response.status == 401 || response.status == 403)
    //             navigate("/login");
    //     }
    // }

    return (
        <div>
            <p>Users List</p>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        Email: {user.email} - Role: {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;